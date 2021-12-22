import {
  GET_CONTACTS,
  SET_LOADING,
  GET_CONTACT,
  EDIT_CONTACT,
  DELETE_CONTACT,
  CLEAR_CONTACTS,
} from "../types";

export const ContactReducers = (state, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false,
      };
    case GET_CONTACT:
      return {
        ...state,
        contact: action.payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case EDIT_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact._id === action.payload._id ? action.payload : contact
        ),
        loading: false,
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact._id !== action.payload
        ),
      };
    case CLEAR_CONTACTS:
      return {
        ...state,
        contacts: null,
        error: null,
      };
    default:
      return state;
  }
};
