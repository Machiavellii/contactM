import React, { useReducer } from "react";
import axios from "axios";
import ContactContext from "./contactContext";
import { ContactReducers } from "./contactReducer";
import {
  GET_CONTACTS,
  SET_LOADING,
  GET_CONTACT,
  ADD_CONTACT,
  CONTACT_ERROR,
  EDIT_CONTACT,
  DELETE_CONTACT,
  CLEAR_CONTACTS,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [],
    contact: {},
    loading: false,
  };

  const [state, dispatch] = useReducer(ContactReducers, initialState);

  // Get Contact
  const getContacts = async () => {
    setLoading();

    const { data } = await axios.get(`api/v1/contacts`);

    dispatch({
      type: GET_CONTACTS,
      payload: data,
    });
  };

  // Get Contact
  const getContact = async (id) => {
    setLoading();

    const { data } = await axios.get(`api/v1/contacts/${id}`);

    dispatch({
      type: GET_CONTACT,
      payload: data,
    });
  };

  // Add Contact
  const addContact = async (contact, history) => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await axios.post("api/v1/contacts/add", contact, config);

      dispatch({ type: ADD_CONTACT, payload: res.data });

      history.push("/");
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  // Edit Contact
  const editContact = async (contact, id, history) => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const res = await axios.put(`api/v1/contacts/${id}`, contact, config);

      dispatch({ type: EDIT_CONTACT, payload: res.data });

      history.push("/");
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  // Delete Contact
  const deleteContact = async (id) => {
    try {
      await axios.delete(`api/v1/contacts/${id}`);

      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  // Clear Contacts
  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        contact: state.contact,
        loading: state.loading,
        getContacts,
        addContact,
        editContact,
        getContact,
        deleteContact,
        clearContacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
