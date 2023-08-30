
import { useState } from 'react';
import { Field } from './Form.styled';
import { useDispatch, useSelector } from 'react-redux';
import {addContact, getContacts} from 'redux/contactsSlice'

export const Form = () => {
    const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
       console.log("type is not supported");
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    // onSubmit({name, number});
    let flag = false;
    contacts.forEach(contact => {
      if (name.toLowerCase() === contact.name.toLowerCase()) {
        flag = true;
      }
    });
    if (flag) {
      return alert(`${name} is already in contacts`);
    }
    dispatch(addContact(name, number));
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };
    return (
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="NameInput">Name</label>
        <Field
          id="nameInput"
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([\\' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
        />
        <label htmlFor="telInput">Tel</label>
        <Field
          id="telInput"
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[.\-\s]?\d{1,4}[.\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChange}
        />
        <button type="submit">Add contact</button>
      </form>
    );
}
