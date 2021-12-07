import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { deleteContact } from '../api/data/contactData';

export default function ContactCard({ contact, setContacts }) {
  const handleClick = (method) => {
    if (method === 'delete') {
      deleteContact(contact.firebaseKey).then((contactArray) => setContacts(contactArray));
    }
  };

  return (
    <div className="container">
      <div className="card-body">
        <h3 className="card-title">{contact.name} Name</h3>
        <p className="number">{contact.number}Number</p>
        <button
          type="button"
          onClick={() => handleClick('delete')}
          className="btn btn-danger"
        >
          DELETE
        </button>
        <Link
          to={`/editSingleContact/${contact.firebaseKey}`}
          className="btn btn-info"
        >
          UPDATE
        </Link>
      </div>
    </div>
  );
}

ContactCard.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string,
    number: PropTypes.number,
    firebaseKey: PropTypes.string,
  }).isRequired,
  setContacts: PropTypes.func.isRequired,
};
