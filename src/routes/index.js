import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import PostCard from '../components/PostCard';
import EContactView from '../views/ContactView';
import EContacts from '../components/EContacts';
import PostForm from '../components/PostForm';
import EditContactArray from '../views/EditContactArray';
import EditSingleContact from '../views/EditSingleContact';

export default function Routes({ user }) {
  console.warn(user);
  return (
    <div>
      <Switch>
        {/* Home */ }
        <Route exact path="/" component={PostCard} user={user} />
        <Route exact path="addPost" component={PostForm} user={user} />
        <Route
          exact
          path="/addContacts"
          component={() => <EContactView user={user} />}
        />
        <Route
          exact
          path="/emergencyContacts"
          component={EContacts}
        />
        <Route
          exact
          path="/emergencyContacts"
          component={EditContactArray}
        />
        <Route
          exact
          path="/emergencyContacts/:fbk"
          component={EditSingleContact}
        />
      </Switch>
    </div>
  );
}
Routes.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.shape({
      uid: PropTypes.string,
    }),
    PropTypes.bool,
  ]),
};

Routes.defaultProps = {
  user: {},
};
