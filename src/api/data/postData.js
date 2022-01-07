import axios from 'axios';
import firebaseConfig from '../apiKeys';
const dbUrl = firebaseConfig.databaseURL;
const getAllPosts = (userId) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/posts.json?orderBy="uid"&equalTo="${userId}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch(reject);
});
const getSinglePost = (fbKey) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/posts/${fbKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});
const createPost = (item) => new Promise((resolve, reject) => {
  axios
    .post(`${dbUrl}/posts.json`, item)
    .then((response) => {
      const firebaseKey = response.data.name;
      axios
        .patch(`${dbUrl}/posts/${firebaseKey}.json`, { firebaseKey })
        .then(() => {
          getAllPosts(item.uid).then(resolve);
        });
    })
    .catch(reject);
});
const updatePost = (item) => new Promise((resolve, reject) => {
  axios
    .patch(`${dbUrl}/posts/${item.firebaseKey}.json`, item)
    .then(() => getAllPosts(item.uid).then(resolve))
    .catch(reject);
});
const deletePost = (item) => new Promise((resolve, reject) => {
  axios
    .delete(`${dbUrl}/posts/${item.firebaseKey}.json`)
    .then(() => {
      getAllPosts(item.uid).then(resolve);
    })
    .catch(reject);
});
export {
  getAllPosts,
  createPost,
  getSinglePost,
  deletePost,
  updatePost,
};
