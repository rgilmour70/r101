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

class ModalThumbnail extends Component {

	constructor(props) {
		super(props);
		console.log(props);
		this.state = {
			showModal: false,
			imageUrl: props.imageUrl,
			alt: props.alt
		}
	}
	
	handleOpenModal = () => {
		this.setState({ showModal: true });
	};
	  
	handleCloseModal = () => {
		this.setState({ showModal: false });
	};

	render() {

		const parts = this.state.imageUrl.split(/\//);

		let thumbUrl = '';
		for (let i=0; i<parts.length - 1; i++) {
		    thumbUrl += parts[i] + '/';
		}
		thumbUrl += 'thumbnails/' + parts.pop();

		if (this.state.imageUrl) {
			return (
				<Fragment>
					<img
						src={thumbUrl}
						alt={this.state.alt}
						onClick={this.handleOpenModal}
						className="thumbnail"
					/>
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
						<div className="modal-body" style={modalTextStyles}><img src={this.state.imageUrl} alt={this.state.alt} /></div>
					</ReactModal>
				</Fragment>
			)
		} else {
			return null;
		}
	}
}

export default ModalThumbnail;