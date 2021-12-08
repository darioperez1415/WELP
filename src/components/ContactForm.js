import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import userObj from '../helpers.js/userObj';
import {
  createContact,
  updateContact,
} from '../api/data/contactData';

const initialState = {
  name: '',
  number: 0,
  uid: '',
};
export default function ContactForm({ contactObj = {} }) {
  const history = useHistory();
  const userInfo = userObj();
  const [formInput, setFormInput] = useState(initialState);
  useEffect(() => {
    if (contactObj.firebaseKey) {
      setFormInput({
        name: contactObj.name,
        firebaseKey: contactObj.firebaseKey,
        number: contactObj.number,
        uid: contactObj.uid,
      });
    }
  }, [contactObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormInput({ ...initialState });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contactObj.firebaseKey) {
      updateContact(formInput).then(() => {
        history.push('/emergencyContacts');
      });
    } else {
      createContact({ ...formInput, uid: userInfo }).then(() => {
        resetForm();
        history.push('/emergencyContacts');
      });
    }
  };
  return (
    <div className="container">
      <h1 className="form-label">userInfo {userInfo}</h1>
      <form onSubmit={handleSubmit}>
        <div className="row pt-5 mx-auto">
          <div className="col-8 form-group mx-auto">
            <input
              type="text"
              name="name"
              className="form-control"
              id="name"
              placeholder="Contact Name"
              value={formInput.name || ''}
              onChange={handleChange}
            />
          </div>
          <div className="col-8 form-group pt-2 mx-auto">
            <input
              type="text"
              name="number"
              className="form-control"
              id="number"
              placeholder="Eenter Emergency Contact"
              value={formInput.number || ''}
              onChange={handleChange}
            />
            <button className="btn btn-info" type="submit">
              {contactObj.firebaseKey ? 'Update' : 'Submit'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
ContactForm.propTypes = {
  contactObj: PropTypes.shape({}),
};
ContactForm.defaultProps = { contactObj: {} };
