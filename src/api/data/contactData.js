import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getContacts = (user) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/eContacts.json?orderBy="uid"&equalTo="${user}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});

const createContact = (obj) => new Promise((resolve, reject) => {
  axios
    .post(`${dbUrl}/eContacts.json`, obj)
    .then((response) => {
      const firebaseKey = response.data.name;
      axios
        .patch(`${dbUrl}/eContacts/${firebaseKey}.json`, { firebaseKey })
        .then(() => {
          getContacts(obj.uid).then(resolve);
        });
    })
    .catch(reject);
});

const updateContact = (obj) => new Promise((resolve, reject) => {
  axios
    .patch(`${dbUrl}/eContacts/${obj.firebaseKey}.json`, obj)
    .then(() => getContacts(obj.uid).then(resolve))
    .catch(reject);
});

const deleteContact = (obj) => new Promise((resolve, reject) => {
  axios
    .delete(`${dbUrl}/eContacts/${obj.firebaseKey}.json`)
    .then(() => {
      getContacts(obj.uid).then(resolve);
    })
    .catch(reject);
});

const updateSingleContact = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/eContacts/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});
export {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
  updateSingleContact,
};
