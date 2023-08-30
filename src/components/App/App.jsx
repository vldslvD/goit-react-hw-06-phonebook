
import { Form } from 'components/Form/Form';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';
import { Container } from 'components/App/App.styled';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact, contactsFilter, getContacts, getFilter } from 'redux/contactsSlice'

export const App = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  const changeFilter = e => {
    dispatch(contactsFilter(e.currentTarget.value));
  };

  const getFiltered = () => {
    const standartizedFilter = filter.toLowerCase();
    return contacts.filter((contact) => {
      return contact.name.toLowerCase().includes(standartizedFilter);
    });
  };
  const removeContact = id => {
    dispatch(deleteContact(id));
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <Form></Form>
      <Filter value={filter} onChange={changeFilter} />
      <h2>Contacts</h2>
      <ContactList
        onDeleteContact={removeContact}
        filteredContacts={getFiltered()}
      />
    </Container>
  );
};
