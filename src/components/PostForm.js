import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import PropTypes from 'prop-types';
import { createPost, getAllPosts, updatePost } from '../api/data/postData';
import '../styles/globals/photoForm.scss';
const uploadFile = (file, locationPath = '/') => new Promise((resolve, reject) => {
  const storageRef = firebase.storage().ref();
  const uploadTask = storageRef.child(`${locationPath}`).put(file);
  uploadTask.on('state_changed', {
    error: reject,
    complete: () => {
      uploadTask.snapshot.ref.getDownloadURL().then(resolve);
    },
  });
});
const initialState = {
  title: '',
  description: '',
  itemImg: '',
  uid: '',
  serialNumber: '',
  cost: '',
  favortie: false,
};
export default function PostForm({ item, userId }) {
  const [allImages, setAllImages] = useState([]);
  const [imageState, setImageState] = useState(null);
  const [formInput, setFormInput] = useState(initialState);
  const history = useHistory();
  const updateImages = () => {
    getAllPosts().then((images) => {
      setAllImages(images);
    });
  };
  useEffect(() => {
    if (item.firebaseKey) {
      setFormInput({
        title: item.title,
        description: item.description,
        itemImg: item.itemImg,
        serialNumber: item.serialNumber,
        cost: item.cost,
        firebaseKey: item.firebaseKey,
        uid: item.uid,
        favorite: item.favorite,
      });
    }
  }, [item]);
  const handleImage = (e) => {
    setImageState(e.target.files[0]);
  };
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
    if (item.firebaseKey) {
      // update the item
      updatePost(formInput).then(() => {
        resetForm();
        history.push('/postsView');
      });
    } else {
      uploadFile(imageState, `${userId}/posts/${new Date().getTime()}`).then(
        (imageUrl) => {
          createPost({ ...formInput, uid: userId, itemImg: imageUrl })
            .then(() => {
              updateImages(allImages);
            })
            .then(() => {
              resetForm();
              history.push('/postsView');
            });
        },
      );
    }
  };
  return (
    <>
      <h1>Add Photo ID</h1>
      <div className="photo-container">
        <img
          className="image"
          src={
            imageState
              ? URL.createObjectURL(imageState)
              : formInput.itemImg
              || 'https://www.pacifictrellisfruit.com/wp-content/uploads/2016/04/default-placeholder-300x300.png'
          }
          onChange={handleImage}
          alt="new"
        />
        <form onSubmit={handleSubmit}>
          <div className="form">
            <div className="col-5 form-group mx-auto">
              <input
                type="text"
                name="title"
                className="form-control"
                id="title"
                placeholder="Enter Title"
                value={formInput.title}
                onChange={handleChange}
              />
            </div>
            <div className="col-5 form-group pt-2 mx-auto">
              <textarea
                className="form-control"
                id="description"
                cols="30"
                row="6"
                name="description"
                placeholder="Description"
                value={formInput.description}
                onChange={handleChange}
              />
            </div>
            <div className="col-5 form-group pt-2 mx-auto">
              <input
                type="number"
                name="serialNumber"
                className="form-control"
                id="serialNumber"
                placeholder="Enter Serial Number"
                value={formInput.serialNumber}
                onChange={handleChange}
              />
            </div>
            <div className="col-5 form-group pt-2 mx-auto">
              <input
                type="text"
                name="cost"
                className="form-control"
                id="cost"
                placeholder="Enter Cost"
                value={formInput.cost}
                onChange={handleChange}
              />
            </div>
            <button className="btn-primary" type="submit">
              {item.firebaseKey ? 'Update' : 'Submit'}
            </button>
            <input
              accept="image/*"
              type="file"
              value={userId.itemImg}
              onChange={handleImage}
            />
          </div>
        </form>
      </div>
    </>
  );
}
PostForm.propTypes = {
  item: PropTypes.shape({
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
    title: PropTypes.string,
    itemImg: PropTypes.string,
    description: PropTypes.string,
    serialNumber: PropTypes.number,
    cost: PropTypes.number,
    favorite: PropTypes.bool,
  }),
  userId: PropTypes.string.isRequired,
};
PostForm.defaultProps = {
  item: {},
};
