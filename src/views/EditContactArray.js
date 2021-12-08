import React, { useState, useEffect } from 'react';
import { getContacts } from '../api/data/contactData';
import ContactCard from '../components/ContactCard';
// import { useParams } from 'react-router-dom';

export default function EditContactArray() {
  const [contacts, setContacts] = useState([]);
  // const { firebaseKey } = useParams();
  useEffect(() => {
    let isMounted = true;
    getContacts().then((contactArray) => {
      if (isMounted) setContacts(contactArray);
    });
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <div>
      <>
        {contacts.map((contact) => (
          <ContactCard
            key={contact.firebaseKey}
            econtacts={contact}
            setContacts={setContacts}
          />
        ))}
      </>
    </div>
  );
}
