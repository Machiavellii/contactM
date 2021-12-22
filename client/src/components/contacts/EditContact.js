import React, { useContext, useEffect, useState } from "react";

import ContactContext from "../../context/contacts/contactContext";

import TextInputGroup from "../layout/TextInputGroup";
import { useParams } from "react-router-dom";

import Spinner from "../layout/Spinner";

import { useHistory } from "react-router-dom";

const EditContact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const { id } = useParams();

  const history = useHistory();

  const contactContext = useContext(ContactContext);

  const { loading, contact, getContact, editContact } = contactContext;

  // const { name, email, phone } = contactEdit;

  useEffect(() => {
    getContact(id);
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    setName(contact.name);
    setEmail(contact.email);
    setPhone(contact.phone);
    setSuccess(true);
  }, [contact]);

  if (loading) return <Spinner />;

  const onSubmit = (e) => {
    e.preventDefault();

    // Check For Errors
    if (name === "") {
      setError("Name is required");
      return;
    }

    if (email === "") {
      setError("Email is required");
      return;
    }

    if (phone === "") {
      setError("Phone is required");
      return;
    }

    editContact({ name, email, phone }, id, history);
  };

  return (
    <div className="card mb-3">
      <div className="card-header">Edit Contact</div>
      <div className="card-body">
        <form onSubmit={onSubmit}>
          <TextInputGroup
            label="Name"
            name="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            // error={errors.name}
          />
          <TextInputGroup
            label="Email"
            name="email"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // error={errors.email}
          />
          <TextInputGroup
            label="Phone"
            name="phone"
            placeholder="Enter Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            // error={errors.phone}
          />
          <input
            type="submit"
            value="Add Contact"
            className="btn btn-light btn-block"
          />
        </form>
      </div>
    </div>
  );
};

export default EditContact;
