import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import { updateSingleContact } from '../api/data/contactData';

export default function EditContact() {
  const [updateContact, setEditContact] = useState({});
  const { fbk } = useParams();

  useEffect(() => {
    updateSingleContact(fbk).then(setEditContact);
  }, []);
  return (
    <div>
      <ContactForm contactObj={updateContact} />
    </div>
  );
}
