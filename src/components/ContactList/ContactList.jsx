import { Contact } from 'components/Contact/Contact';
import { getContacts, getFilter } from 'redux/contactsSlice';
import { useSelector } from 'react-redux';
export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const getFiltered = () => {
    const standartizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(standartizedFilter)
    );
  };
  return (
    <ul>
      {getFiltered().map(contact => {
        return <Contact key={contact.id} contact={contact}></Contact>;
      })}
    </ul>
  );
};
