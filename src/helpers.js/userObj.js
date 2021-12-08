import firebase from 'firebase/app';

const userObj = () => firebase.auth().currentUser?.uid;

export default userObj;
