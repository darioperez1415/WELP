import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { deletePost, updatePost } from '../api/data/postData';
import '../styles/globals/postCard.scss';
export default function PostCard({ item, setItems }) {
  const [checked, setChecked] = useState();
  const handleChange = () => {
    setChecked(!checked);
    const favcard = {
      title: item.title,
      description: item.description,
      itemImg: item.itemImg,
      serialNumber: item.serialNumber,
      cost: item.cost,
      favorite: !item.favorite,
      firebaseKey: item.firebaseKey,
      uid: item.uid,
    };
    updatePost(favcard).then(setItems);
  };
  const handleClick = (method) => {
    if (method === 'delete') {
      deletePost(item).then(setItems);
    }
  };
  return (
    <>
      <div className="card" style={{ width: '17rem' }}>
        <img
          src={item.itemImg}
          alt="postimage"
          className="card-img-top"
          style={{ width: '100%' }}
        />
        <div className="card-body">
          <h5 className="card-title">Title: {item.title}</h5>
          <p className="card-text">Description: {item.description}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            Serial Number: {item.serialNumber}
          </li>
          <li className="list-group-item">Cost ${item.cost}</li>
          <label className="visually-hidden">
            <input
              type="checkbox"
              checked={item.favorite ? 'checked' : ''}
              onChange={handleChange}
            />
            Favorite
          </label>
        </ul>
        <div className="card-body">
          <Link
            to={`/editPost/${item.firebaseKey}`}
            className="btn btn-warning"
          >
            Edit
          </Link>
          <button
            onClick={() => handleClick('delete')}
            className="btn btn-danger"
            type="button"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
PostCard.propTypes = {
  item: PropTypes.shape(PropTypes.obj).isRequired,
  setItems: PropTypes.func.isRequired,
};
