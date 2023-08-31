import { Button } from './Contact.styled';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contactsSlice';
export const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  return (
    <li>
      {contact.name}: {contact.number}
      <Button onClick={() => dispatch(deleteContact(contact.id))}>
        Delete
      </Button>
    </li>
  );
};
