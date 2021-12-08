import React, { useState, useEffect } from 'react';
import { getContacts } from '../api/data/contactData';
import ContactCard from './ContactCard';

export default function EContacts() {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    let isMounted = true;
    getContacts().then((cardsArray) => {
      if (isMounted) setCards(cardsArray);
      console.warn(cardsArray);
    });
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <div className="container">
      {cards ? (
        <>
          <h1 className="text-center">All Cards</h1>
          <div className="d-flex flex-wrap">
            {cards.map((card) => (
              <ContactCard key={card.firebaseKey} card={card} setCards={setCards} />
            ))}
          </div>
        </>
      ) : (
        'Add a card'
      )}
    </div>
  );
}
