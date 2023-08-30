import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from 'nanoid';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { contacts: [], filter: ""},
  reducers: {
    addContact: {
      reducer: (state, action) => {
        state.contacts.push(action.payload);
      },
      prepare: (name, number) => {
        const id = nanoid();
        return { payload: { id, name, number } }
      },
    },
    deleteContact: (state, action) => {
      return {...state, contacts: state.contacts.filter(contact => contact.id !== action.payload)
  }
    },
    contactsFilter: (state, action) => {
      state.filter = action.payload;
    }
    
  },
})

// Action creators are generated for each case reducer function
export const { addContact, deleteContact, contactsFilter} = contactsSlice.actions


const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['filter']
}

export const contactsReducer = persistReducer(persistConfig, contactsSlice.reducer);

export const getFilter = state => state.filter;
export const getContacts = state => state.contacts;