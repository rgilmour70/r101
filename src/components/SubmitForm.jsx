import React, { Component, Fragment } from 'react';
import Thanks from './Thanks';
import axios from 'axios';

const API_PATH = './process.php';

class SubmitForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			fromName: '',
			fromEmail: '',
			toName: '',
			toEmail: '',
			year: '1st year',
			check: '',
			whichTutorial: this.props.slug,
			record: this.props.record,
			mailSent: false,
			error: null,
			text: this.props.content.text,
			problem: this.props.content.problem,
			solution: this.props.content.solution
		}
		this.form = React.createRef();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.record !== this.props.record) {
			this.setState({ record : nextProps.record});
		}
	}

	handleFormSubmit = e => {
		e.preventDefault();
		this.validate();
		// console.log(this.state);
		axios({
			method: 'post',
			url: `${API_PATH}`,
			headers: { 'content-type': 'application/json' },
			data: this.state
		})
		.then(response => {
			// console.log(response.status);
			// this.setState({ mailSent: true });
			this.setState({ mailSent: response.data.sent });
		})
		.catch(error => this.setState({ error: error.message }));
	};

	validate = () => {
		return this.form.current.reportValidity();
	}

	render() {
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
							<label htmlFor="toName">Your instructor's name </label>
							<input 
								type="text" 
								className="form-control" 
								id="toName" 
								name="toName" 
								value={this.state.toName}
								onChange={e => this.setState({ toName: e.target.value })}
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
			return <Thanks />;
		}

	}

}

export default SubmitForm;
