import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contacts/contactContext";
import TextInputGroup from "../layout/TextInputGroup";

import { useHistory } from "react-router-dom";

const AddContact = () => {
  const contactContext = useContext(ContactContext);
  const { addContact } = contactContext;

  const history = useHistory();

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    errors: {},
  });

  // useEffect(() => {
  //   if (current !== null) {
  //     setContact(current);
  //   } else {
  //     setContact({
  //       name: "",
  //       email: "",
  //       phone: "",
  //     });
  //   }
  // }, [contactContext, current]);

  const { name, email, phone } = contact;

  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    // Check For Errors
    if (name === "") {
      setContact({ errors: { name: "Name is required" } });
      return;
    }

    if (email === "") {
      setContact({ errors: { email: "Email is required" } });
      return;
    }

    if (phone === "") {
      setContact({ errors: { phone: "Phone is required" } });
      return;
    }

    const newContact = {
      name,
      email,
      phone,
    };

    addContact(newContact, history);

    // Clear State
    setContact({
      name: "",
      email: "",
      phone: "",
    });
  };

  return (
    <div className="card mb-3">
      <div className="card-header">Add Contact</div>
      <div className="card-body">
        <form onSubmit={onSubmit}>
          <TextInputGroup
            label="Name"
            name="name"
            placeholder="Enter Name"
            value={name}
            onChange={onChange}
            // error={errors.name}
          />
          <TextInputGroup
            label="Email"
            name="email"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={onChange}
            // error={errors.email}
          />
          <TextInputGroup
            label="Phone"
            name="phone"
            placeholder="Enter Phone"
            value={phone}
            onChange={onChange}
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

export default AddContact;
