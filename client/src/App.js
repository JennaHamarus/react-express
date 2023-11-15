import React, { Component } from 'react';
import './App.css';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';


class App extends Component {
state = {
    data: null
  };

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.prices }))
      .catch(err => console.log(err));
  }
    // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/get_prices');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }

    return body;
  };

  formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('fi-FI', { dateStyle: 'short', timeStyle: 'short' });
  };

  render() {
    return (
      <>
      <div>
      <Container>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Hour</th>
            <th>Prices</th>
          </tr>
        </thead>
        <tbody>
          {this.state.data && this.state.data.map((prices, index) => (
        <tr key={index}>
          <td>{this.formatDate(prices.startDate) +' - '+ this.formatDate(prices.endDate)}</td>
          <td>{prices.price}</td>
        </tr>
        ))}
        </tbody>
      </Table>
      </Container>
      </div>
      </>
    );
 }
}

export default App;
