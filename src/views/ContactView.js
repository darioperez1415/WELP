import React from 'react';
import PropTypes from 'prop-types';
import ContactForm from '../components/ContactForm';

export default function EContactView({ user }) {
  return (
    <>
      <h1 className="text-center">New Stuff</h1>
      <ContactForm user={user} />
    </>
  );
}

EContactView.propTypes = {
  user: PropTypes.string,
};

EContactView.defaultProps = { user: {} };
