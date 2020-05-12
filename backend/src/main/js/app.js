import React, { Component } from 'react';
// import client from './client';
import { Text, TextInput, View } from 'react-native';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {questions: []};
	}

// 	componentDidMount() {
// 		client({method: 'GET', path: '/api/employees'}).done(response => {
// 			this.setState({employees: response.entity._embedded.employees});
// 		});
// 	}

	render() {
		return (
			<EmployeeList employees={this.state.employees}/>
		)
	}
}