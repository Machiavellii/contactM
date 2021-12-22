import React, { useContext, useEffect, useState } from "react";

import ContactContext from "../../context/contacts/contactContext";
import AuthContext from "../../context/auth/authContext";

import Spinner from "../layout/Spinner";
import Contact from "./Contact";

const Contacts = () => {
  const contactsContext = useContext(ContactContext);
  const authContext = useContext(AuthContext);

  const { loading, contacts, getContacts } = contactsContext;

  const { user } = authContext;

  useEffect(() => {
    getContacts();
    //eslint-disable-next-line
  }, []);

  if (loading) return <Spinner />;

  return (
    <>
      <h1 className="display-4 mb-2">
        <span className="text-danger">Contact</span> List
      </h1>
      {contacts &&
        contacts.map(
          (contact) =>
            contact.user._id === user && (
              <Contact key={contact.id} contact={contact} />
            )
        )}
    </>
  );
};

export default Contacts;
