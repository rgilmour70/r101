import React, { Component, Fragment } from 'react';
import Spinner from './Spinner';
import Thanks from './Thanks';
import axios from 'axios';

const API_PATH = './process.php';

class SubmitForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			fromName: '',
			fromEmail: '',
			toEmail: '',
			year: '1st year',
			check: '',
			whichTutorial: this.props.slug,
			record: this.props.record,
			mailSent: false,
			error: null,
			text: this.props.content.text,
			problem: this.props.content.problem,
			solution: Number(this.props.content.solution),
			sending: false,
			title: this.props.title
		}
		this.form = React.createRef();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.record !== this.props.record) {
			this.setState({ record : nextProps.record});
		}
	}

	returnToForm = () => {
		this.setState({ 'mailSent': false, 'sending': false });
	}

	handleFormSubmit = e => {
		e.preventDefault();
		if ( this.validate() && (this.state.solution === Number(this.state.check)) ) {
			this.setState({ sending: true });
			axios({
				method: 'post',
				url: `${API_PATH}`,
				headers: { 'content-type': 'application/json' },
				data: this.state
			})
			.then(response => {
				this.setState({ mailSent: response.data.sent, sending: false });
			})
			.catch(error => this.setState({ error: error.message }));
		} else {
			alert('Math is hard!');
		}
	};

	validate = () => {
		return this.form.current.reportValidity();
	}

	render() {
		if (this.state.sending) {
			return <Spinner/>;
		}
		if (!this.state.mailSent) {
			return (
				<Fragment>
					<div className="text">{this.state.text}</div>
					<form action="#" ref={this.form} id="submitForm">
						
						<div className="form-group">
							<label htmlFor="fromName">Your name </label>
							<input 
								type="text" 
								className="form-control" 
								id="fromName" 
								name="fromName" 
								value={this.state.fromName}
								onChange={e => this.setState({ fromName: e.target.value })}
								required 
							/>
						</div>

						<div className="form-group">
							<label htmlFor="fromEmail">Your email </label>
							<input 
								type="email" 
								className="form-control" 
								id="fromEmail" 
								name="fromEmail" 
								value={this.state.fromEmail}
								onChange={e => this.setState({ fromEmail: e.target.value })}
								required 
							/>
						</div>

						<div className="form-group">
							<label htmlFor="toEmail">Your instructor's email </label>
							<input 
								type="email" 
								className="form-control" 
								id="toEmail" 
								name="toEmail" 
								value={this.state.toEmail}
								onChange={e => this.setState({ toEmail: e.target.value })}
								required 
							/>
						</div>

						<div className="form-group">
							<label htmlFor="year">Year of study </label>
							<select 
								className="form-control" 
								name="year"
								value={this.state.year}
								onChange={e => this.setState({ year: e.target.value })}
							>
								<option>1st year</option>
								<option>2nd year</option>
								<option>3rd year</option>
								<option>4th year</option>
								<option>Grad</option>
								<option>Not IC / other</option>
							</select>
						</div>

						<div type="form-group">
							<label htmlFor="check">{this.state.problem}<small> (This lets us know you're human.)</small></label>
							<input 
								type="number" 
								name="check" 
								className="form-control" 
								pattern="18" 
								value={this.state.check}
								onChange={e => this.setState({ check: e.target.value })}
								required 
							/>
						</div>

						<input 
							type="hidden" 
							name="whichTutorial" 
							value={this.state.whichTutorial} 
						/>

						<br /><br />
						<input 
							type="submit" 
							onClick={e => this.handleFormSubmit(e)}
							name="submit" 
							value="Submit" 
							className="btn btn-primary" 
						/>
					</form>
				</Fragment>
			);
		} else {
			return (
				<Thanks 
					resetForm={this.returnToForm} 
					fromName={this.state.fromName} 
					fromEmail={this.state.fromEmail}
					toEmail={this.state.toEmail}
					title={this.state.title}
				/>
			);
		}

	}

}

export default SubmitForm;
