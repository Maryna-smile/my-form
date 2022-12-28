import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './App.module.css';


export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contactList = localStorage.getItem('contacts');
    const parsedContactList = JSON.parse(contactList);
    if (parsedContactList) {
      this.setState({ contacts: parsedContactList });
    }
  };

  componentDidUpdate(_,prevState) {
if (this.state.contacts !== prevState.contacts) {
  localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
}
  };

  makeNewUser = obj => {
    if (
      this.state.contacts.some(
        user => user.name.toLowerCase() === obj.name.toLowerCase()
      )
    ) {
      return alert(`${obj.name} is already in contact list`);
    }

    this.setState(prevState => {
      return { contacts: [...prevState.contacts, obj] };
    });
  };

  deleteUser = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  handleFilter = e => {
    this.setState({
      filter: e.target.value,
    });
  };

  getUser = () => {
    const filteredUser = this.state.filter.toLowerCase().trim();
    const { contacts } = this.state;
    return contacts.filter(user =>
      user.name.toLowerCase().trim().includes(filteredUser)
    );
  };

  render() {
    const findUser = this.getUser();
    return (
      <div className={css.section}>
        <h1>Phonebook</h1>
        <ContactForm makeNewUser={this.makeNewUser} />

        <h2>Contacts</h2>
        <Filter handleFilter={this.handleFilter} value={this.state.filter} />
        <ContactList contacts={findUser} onDeleteUser={this.deleteUser} />
      </div>
    );
  }
}
