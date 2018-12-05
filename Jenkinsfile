#!/usr/bin/env groovy
@Library('ostk-pipeline')
import com.overstock.dx.Pipeline
import groovy.json.*
def areDeploying = env.BRANCH_NAME == 'master'
new Pipeline(this).execute {
    installWebhooks(scm)
    node {
        // Checkout code, cleaning the tree first if necessary
        ostkCheckout()
        //Code should be here for static file publish on non-prod
        stage("Static:  Deploy test") {
            echo "Branch is ${env.BRANCH_NAME}..."
            newVersion = ostkSetVersions()
            // Important!  staticfiles.publish() must come after call to ostkSetVersions()
            // Replace '$appName' with the lower-cased version of your app's official name
            // If your app's name is "SomeSpecial-Service", replace '$appName' with "somespecial-service"
            def image = docker.build('b2bprofessional')
            image.inside() {
                sh 'cp -R /dist/dist ${WORKSPACE}/dist'
                // Publish static files
                echo "Publishing static files to nexus..."
                staticPublish = staticFiles.publish()
                if (!staticPublish) {
                    error "ERROR: Unable to publish static files to Nexus ${staticPublish.message}"
                } else {
                    echo 'SUCCESS: Static files were published to Nexus'
                    echo JsonOutput.prettyPrint(staticPublish.jsonStr)
                }
                //Push to test
                echo "Deploying static files to test..."
                staticDeployTest = staticFiles.deploy('test')
                if (!staticDeployTest) {
                    error "ERROR: Unable to deploy static files to test ${staticDeployTest.message}"
                } else {
                    echo 'SUCCESS: Static files were deployed to test'
                    echo JsonOutput.prettyPrint(staticDeployTest.jsonStr)
                }
            }//end of image inside
            // Verify files are accessible by public URI with matching sha256
            staticDeployTest.jsonObj.files.each { key, value ->
                sleep time: 30, unit: 'SECONDS' // This step should prevent intermittent errors where file is not yet available
                expectedSha256 = sh(returnStdout: true, script: "curl -s ${value.publicUri} | sha256sum | tr -d ' -'").trim()
                actualSha256 = value.hash.hex
                echo "Sha256 - actual:${actualSha256}, expected:${expectedSha256}"
                if (actualSha256 != expectedSha256) {
                    error "ERROR: Verification that ${key} was deployed as ${value.publicUri} failed"
                } else {
                    echo "SUCCESS:  The file ${key} was verified deployed as ${value.publicUri}"
                }
            }
        }
        if (!areDeploying) {
            return;
        }
        //Push to prod
        //clmScan()
        echo "Deploying static files to prod..."
        staticDeployProd = staticFiles.deploy('prod')
        if (!staticDeployProd) {
            error "ERROR: Unable to deploy static files to prod ${staticDeployProd.message}"
        } else {
            echo 'SUCCESS: Static files were deployed to prod'
            echo JsonOutput.prettyPrint(staticDeployProd.jsonStr)
        }
        // Verify files are accessible by public URI with matching sha256
        staticDeployProd.jsonObj.files.each { key, value ->
            sleep time: 30, unit: 'SECONDS' // This step should prevent intermittent errors where file is not yet available
            expectedSha256 = sh(returnStdout: true, script: "curl -s ${value.publicUri} | sha256sum | tr -d ' -'").trim()
            actualSha256 = value.hash.hex
            echo "Sha256 - actual:${actualSha256}, expected:${expectedSha256}"
            if (actualSha256 != expectedSha256) {
                error "ERROR: Verification that ${key} was deployed as ${value.publicUri} failed"
            } else {
                echo "SUCCESS:  The file ${key} was verified deployed as ${value.publicUri}"
            }
        }
      } //node ending  
    }
