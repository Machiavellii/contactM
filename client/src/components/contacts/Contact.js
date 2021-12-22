import React, { useState, useContext } from "react";

import { Link } from "react-router-dom";

import ContactContext from "../../context/contacts/contactContext";

const Contact = ({ contact }) => {
  const [showContactInfo, setShowContactInfo] = useState(false);
  const contactsContext = useContext(ContactContext);

  const { _id, name, email, phone } = contact;

  const { deleteContact } = contactsContext;

  const onDelete = (id) => {
    deleteContact(id);
  };

  return (
    <div className="card card-body mb-3">
      <h4>
        {name}{" "}
        <i
          onClick={() => setShowContactInfo(!showContactInfo)}
          className="fas fa-sort-down"
          style={{ cursor: "pointer" }}
        />
        <i
          className="fas fa-times"
          style={{ cursor: "pointer", float: "right", color: "red" }}
          onClick={() => onDelete(_id)}
        />
        <Link to={`edit/${_id}`}>
          <i
            className="fas fa-pencil-alt"
            style={{
              cursor: "pointer",
              float: "right",
              color: "black",
              marginRight: "1rem",
            }}
          />
        </Link>
      </h4>
      {showContactInfo ? (
        <ul className="list-group">
          <li className="list-group-item">Email: {email}</li>
          <li className="list-group-item">Phone: {phone}</li>
        </ul>
      ) : null}
    </div>
  );
};

export default Contact;
