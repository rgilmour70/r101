import React, { Component, Fragment } from 'react';
import ReactModal from 'react-modal';
import ReactHtmlParser from 'react-html-parser';

const modalStyles = {
	content : {
		top: '10%',
		left: '20%'
	}
};

const modalTextStyles = {
	fontWeight: 'bold',
	fontSize: '1.2em',
};

ReactModal.setAppElement('#root');

class ModalLink extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
			additionalInfo: props.info,
			infoLabel: props.infoLabel
		}
	}
	
	handleOpenModal = () => {
		this.setState({ showModal: true });
	};
	  
	handleCloseModal = () => {
		this.setState({ showModal: false });
	};

	render() {
		if (this.state.additionalInfo) {
			return (
				<Fragment>
					<button 
						className="btn btn-outline-dark btn-sm btn-hint"
						type="button"
						onClick={this.handleOpenModal}
					>
						<img src="images/info.svg" height="16" width="16" alt="info" />
					</button>
					<ReactModal 
						isOpen={this.state.showModal}
						shouldCloseOnOverlayClick={true}
						onRequestClose={this.handleCloseModal}
						style={modalStyles}
					>
						<div className="modal-header">
							<span>{this.state.infoLabel}</span>
							<button onClick={this.handleCloseModal} type="button" className="close">&times;</button>
						</div>
						<div className="modal-body" style={modalTextStyles}>{ReactHtmlParser(this.state.additionalInfo)}</div>
					</ReactModal>
				</Fragment>
			)
		} else {
			return null;
		}
	}
}

export default ModalLink;