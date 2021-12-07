import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { createContact, updateContact } from '../api/data/contactData';

const initialState = {
  name: '',
  number: 0,
  uid: '',
};
export default function ContactForm({ contactObj = {} }) {
  const [formInput, setFormInput] = useState(initialState);
  const history = useHistory();
  useEffect(() => {
    if (contactObj.firebaseKey) {
      setFormInput({
        name: contactObj.name,
        firebaseKey: contactObj.firebaseKey,
        number: contactObj.number,
      });
    }
  }, [contactObj]);

  const handleChange = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setFormInput({ ...initialState });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contactObj.firebaseKey) {
      updateContact(formInput).then(() => {
        history.push('/editContactArray');
      });
    } else {
      createContact({ ...formInput }).then(() => {
        resetForm();
        history.push('/editContactArray');
      });
    }
  };
  return (
    <div className="container">
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
              type="number"
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
