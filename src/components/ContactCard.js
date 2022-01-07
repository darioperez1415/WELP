import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { deleteContact, updateContact } from '../api/data/contactData';
import '../styles/globals/contactCardStyle.scss';
export default function ContactCard({ card, setCards }) {
  const [checked, setChecked] = useState();
  const handleChange = () => {
    setChecked(!checked);
    const favcard = {
      firebaseKey: card.firebaseKey,
      description: card.description,
      uid: card.uid,
      favorite: !card.favorite,
    };
    updateContact(favcard).then(setCards);
  };
  const handleClick = (method) => {
    if (method === 'delete') {
      deleteContact(card).then(setCards);
    }
  };
  return (
    <div>
      <div className="card" style={{ width: '18rem', margin: '3px' }}>
        <div className="card-body">
          <h5 className="card-title">Name: {card.name}</h5>
          <p className="card-title">Phone: {card.number}</p>
          <label>
            <input
              type="checkbox"
              checked={card.favorite ? 'checked' : ''}
              onChange={handleChange}
            />
            Favorite
          </label>
        </div>
        <div className="cardButton">
          <Link to={`/edit/${card.firebaseKey}`} className="btn btn-warning">
            Edit
          </Link>
          <button
            onClick={() => handleClick('delete')}
            className="btn btn-danger"
            type="button"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
ContactCard.propTypes = {
  card: PropTypes.shape(PropTypes.obj).isRequired,
  setCards: PropTypes.func.isRequired,
};
