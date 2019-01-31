import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Link } from 'react-router-dom'

const ContactEdit = ({ match }) => (
  <div>Editing {match.params.username} ...</div>
)
const ContactDelete = ({ match }) => (
  <div>Deleting {match.params.username} ...done!</div>  //--> Nested Route param consume
)
const ContactProfile = ({ match }) => (
  <div>
    <br></br>
    <span>Contact Profile of {match.params.username}</span><br></br>
    <Link to={`${match.url}/edit`}>Edit Contact</Link><br></br>
    <Link to={`${match.url}/delete`}>Delete Contact</Link>
    <Route path={`${match.path}/edit`} component={ContactEdit} />
    <Route path={`${match.path}/delete`} component={ContactDelete} />
  </div>
)
class ListContacts extends Component {
  render() {
    return (
      <div>
        <ol>
        {this.props.contacts.map((contact,index) => (
          <li key={`i${index}`}>
            <Link key={`l${index}`} 
                  to={`${this.props.match.url}/${contact.username}`}>{contact.name}</Link>  {/*--> Neste Link declaration */}
          </li>
        ))}
        </ol>
        <Route path={`${this.props.match.path}/:username`} component={ContactProfile} />  {/*--> (2) Nested Route declaration */}
      </div>
    )
  }
}
class App extends Component {
  state = {
    contacts: [{ username: 'JHDOE', name: 'Jonh Doe' },
    { username: 'JNDOE', name: 'Jane Doe' },
    { username: 'NBDY', name: 'Nobody' }]
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <br></br>
          <Link to="/list">List Contacts</Link>
          <Route path="/list"
            render={(props) => 
                      (<ListContacts {...props} contacts={this.state.contacts} />) /*--> (1) Pass props to a component rendered by Route */
                   }
          >
          </Route>
        </header>
      </div>
    );
  }
}

export default App;