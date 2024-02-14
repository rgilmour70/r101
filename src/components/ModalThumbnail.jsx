import React, { Component, Fragment } from "react";
import ReactModal from "react-modal";

const modalStyles = {
  content: {
    top: "10%",
    left: "10%",
    "min-width": "60%",
  },
};

ReactModal.setAppElement("#root");

class ModalThumbnail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      imageUrl: props.imageUrl,
      alt: props.alt,
    };
  }

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    if (this.state.imageUrl) {
      const parts = this.state.imageUrl.split(/\//);
      let thumbUrl = "";
      for (let i = 0; i < parts.length - 1; i++) {
        thumbUrl += parts[i] + "/";
      }
      thumbUrl += "thumbnails/" + parts.pop();
      return (
        <Fragment>
          <div className="thumbnail-container" onClick={this.handleOpenModal}>
            <img
              src={process.env.PUBLIC_URL + "/" + thumbUrl}
              alt={this.state.alt}
            />
          </div>
          <ReactModal
            isOpen={this.state.showModal}
            shouldCloseOnOverlayClick={true}
            onRequestClose={this.handleCloseModal}
            style={modalStyles}
          >
            <div className="modal-header">
              <button
                onClick={this.handleCloseModal}
                type="button"
                className="close"
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <img
                src={process.env.PUBLIC_URL + "/" + this.state.imageUrl}
                alt={this.state.alt}
              />
            </div>
          </ReactModal>
        </Fragment>
      );
    } else {
      return null;
    }
  }
}

export default ModalThumbnail;
