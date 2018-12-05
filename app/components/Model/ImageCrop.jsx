
import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ReactCrop from 'react-image-crop';
import './ReactCrop.scss';
import PropTypes from 'prop-types';

class ImageCrop extends Component {
    constructor(props) {
        super(props);
        this.onUploadClick = this.onUploadClick.bind(this);
        this.state = {
            src: null,
            crop: {
                x: 10,
                y: 10,
                aspect: 1,
                height: 80
            }
        };
    }

    componentWillReceiveProps = nextProps => {
        if (nextProps.imgsrc) {
            this.setState({ src: nextProps.imgsrc.src });
        }
    }
    onImageLoaded = image => {
        this.imageRef = image;
    };

    onCropComplete = async (crop, pixelCrop) => {
        const croppedImageUrl = await this.getCroppedImg(
            this.imageRef,
            pixelCrop,
            'newFile.jpeg'
        );
        this.setState({ croppedImageUrl });
    };

    onCropChange = crop => {
        this.setState({ crop });
    };

    getCroppedImg(image, pixelCrop) {
        const canvas = document.createElement('canvas');
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          pixelCrop.width,
          pixelCrop.height
        );
        return canvas.toDataURL('image/jpeg');
    }

    onUploadClick = () => {
        const { uploadcallback } = this.props;
        const { croppedImageUrl } = this.state;
        uploadcallback(croppedImageUrl);
    }

    render() {
        const { src, crop } = this.state;
        const { imgsrc, show, onHide } = this.props;
        const valProps = {
            imgsrc,
            show,
            onHide
        };

        return (
            <Modal {...valProps} className="customPopupWrap" >
                <Modal.Header className="modal-header-styles">
                    <Modal.Title id="contained-modal-title-sm">
                        Crop and Upload
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body-styles" align="center">
                    {src ? (
                        <ReactCrop
                            src={src}
                            crop={crop}
                            onImageLoaded={this.onImageLoaded}
                            onComplete={this.onCropComplete}
                            onChange={this.onCropChange}
                        />
                    ) : null }
                </Modal.Body>
                <Modal.Footer className="modal-footer-styles">
                    <Button className="modal-button-styles" onClick={this.onUploadClick} >Confirm & Proceed</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

ImageCrop.propTypes = {
    imgsrc: PropTypes.object,
    uploadcallback: PropTypes.func
};

export default ImageCrop;
