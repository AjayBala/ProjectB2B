import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import './Documents.scss';
import {
    Modal
} from 'react-bootstrap';


export class Documents extends Component {
  state = {
    numberOfPages: null,
    pageNumber: 1,
    isLoaded: false,
    docArr: []
  }

  onDocumentLoadSuccess = ({ numPages }) => {
      const pagesArr = [];
    for (let i = 1; i <= numPages; i += 1) {
        pagesArr.push({ pageNO: i });
    }
    this.setState({
        numberOfPages: numPages,
        isLoaded: true,
        docArr: pagesArr
    });
  }

  renderAllPages = () => {
    const { docArr } = this.state;

    return docArr.map((page, key) => {
        return (<Page pageNumber={page.pageNO} key={key} />);
    });
  }

  render() {
    const { pageNumber, numberOfPages, isLoaded } = this.state;
    const { onHide } = this.props;

    return (
        <div>
            <Modal {...this.props} id="newUserPopUp">
                <Modal.Body className="popUpBodyStyles ">
                    <button onClick={onHide} type="button" className="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <Document
                        file="../../../../../samplepdf.pdf"
                        onLoadSuccess={this.onDocumentLoadSuccess}
            >
                        { isLoaded ? this.renderAllPages() : null }
                    </Document>

                    <p>
                        Page
                        {pageNumber}
                        of
                        {numberOfPages}
                    </p>
                </Modal.Body>
            </Modal>
        </div>
    );
  }
}

export default Documents;
