import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createContact, updateContact } from '../api/data/contactData';
const initialState = {
  name: '',
  number: 0,
  uid: '',
  favortie: false,
};
export default function ContactForm({ obj, userId }) {
  const [formInput, setFormInput] = useState(initialState);
  const history = useHistory();
  useEffect(() => {
    if (obj.firebaseKey) {
      setFormInput({
        name: obj.name,
        firebaseKey: obj.firebaseKey,
        number: obj.number,
        uid: obj.uid,
        favorite: obj.favorite,
      });
    }
  }, [obj]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const resetForm = () => {
    setFormInput(initialState);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      // update the item
      updateContact(formInput).then(() => {
        resetForm();
        history.push('/econtacts');
      });
    } else {
      createContact({ ...formInput, uid: userId }).then(() => {
        resetForm();
        history.push('/econtacts');
      });
    }
  };
  return (
    <div className="container">
      <h1 className="text-center">Add Emergency Contatcts</h1>
      <form onSubmit={handleSubmit}>
        <div className="row pt-5 mx-auto">
          <div className="col-8 form-group mx-auto">
            <input
              type="text"
              name="name"
              className="form-control"
              id="name"
              placeholder="Enter Contact Name"
              value={formInput.name}
              onChange={handleChange}
            />
          </div>
          <div className="col-8 form-group pt-2 mx-auto">
            <input
              type="number"
              name="number"
              className="form-control"
              id="number"
              placeholder="Eenter Emergency Contact"
              value={formInput.number}
              onChange={handleChange}
            />
            <button className="btn btn-info" type="submit">
              {obj.firebaseKey ? 'Update' : 'Submit'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
ContactForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
    number: PropTypes.number,
    favorite: PropTypes.bool,
  }),
  userId: PropTypes.string.isRequired,
};
ContactForm.defaultProps = {
  obj: {},
};
