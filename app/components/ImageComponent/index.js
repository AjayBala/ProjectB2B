
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import CropModal from '../Model/ImageCrop';

class ImageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadImgSrc: '',
            isImageSelected: false,
            selectedImage: ''
        };
    }

    onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                this.setState({ selectedImage: reader.result });
            });
            reader.readAsDataURL(e.target.files[0]);
            this.setState({
                isImageSelected: true
            });
        } else {
            this.setState({
                isImageSelected: false
            });
        }
    }

    closeCropPopup = () => {
        this.setState({
            isImageSelected: false,
        });
    }

    onUploadClick = props => {
        const { cropSuccess } = this.props;

        const file = new File([props], 'imageFile', { type: 'image/jpeg', lastModified: Date.now() });
        this.setState({
            uploadImgSrc: props,
            isImageSelected: false
        });
        cropSuccess(file);
    }

    handleUploadClick = () => {
        document.getElementById('imageUploadBtn').click();
    }

    render() {
        const { imageSrc, height, width, containerStyles, isUploadActive, isNoImage, placeholder } = this.props;
        const { uploadImgSrc, isImageSelected, selectedImage } = this.state;

        return (
            <div className="profPicContainer" style={containerStyles}>
                {isImageSelected
                        ? (
                            <CropModal
                                uploadcallback={this.onUploadClick}
                                imgsrc={{ src: selectedImage }}
                                show={isImageSelected}
                                onHide={this.closeCropPopup}
                            />
                        ) : null }
                { !isNoImage
                    ? (
                        <div>
                            { uploadImgSrc === ''
                                ? <img className="profImage" alt="profile" src={imageSrc} height={height} width={width} />
                                : <img className="profImage" alt="profile" src={uploadImgSrc} height={height} width={width} /> }
                        </div>
                    )
                    : (
                        <div>
                            { uploadImgSrc === ''
                                ? (
                                    <div className="profileAvatar" style={{ height, width }}>
                                        {placeholder}
                                    </div>
                                  )
                                : <img className="profImage" alt="profile" src={uploadImgSrc} height={height} width={width} /> }
                        </div>
                ) }
                { isUploadActive ? (
                    <div id="fileUploadClick" onClick={this.handleUploadClick.bind(this)}>
                        Edit
                        <input id="imageUploadBtn" onChange={this.onSelectFile} accept="image/jpeg" type="file" style={{ visibility: 'hidden' }} />
                    </div>
                ) : null }
            </div>
        );
    }
}

ImageComponent.propTypes = {
    imageSrc: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
    containerStyles: PropTypes.object,
    isUploadActive: PropTypes.bool,
    isNoImage: PropTypes.bool,
    placeholder: PropTypes.string,
    cropSuccess: PropTypes.func
};

export default ImageComponent;
