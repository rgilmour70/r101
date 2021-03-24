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
						className="hint"
						type="button"
						onClick={this.handleOpenModal}
					>
						<svg height="100" viewBox="0 0 450 450" width="100" xmlns="http://www.w3.org/2000/svg"><circle cx="225" cy="133.5" r="31.25"/><path d="m251 219.12v103a26 26 0 0 1 -52 0v-103a26 26 0 0 1 52 0z"/><path d="m225 0c-124.26 0-225 100.74-225 225s100.74 225 225 225 225-100.74 225-225-100.74-225-225-225zm130.81 355.81a185 185 0 1 1 -261.62-261.62 185 185 0 1 1 261.62 261.62z"/><path d="m225 0c-124.26 0-225 100.74-225 225s100.74 225 225 225 225-100.74 225-225-100.74-225-225-225zm130.81 355.81a185 185 0 1 1 -261.62-261.62 185 185 0 1 1 261.62 261.62z"/></svg>
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