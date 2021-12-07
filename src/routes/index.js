import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import PostCard from '../components/PostCard';
import ContactForm from '../components/ContactForm';
import PostForm from '../components/PostForm';
import EditContactArray from '../views/EditContactArray';
import EditSingleContact from '../views/EditSingleContact';
import ContactView from '../views/ContactView';

export default function Routes({ user }) {
  return (
    <div>
      <Switch>
        {/* Home */ }
        <Route exact path="/" component={PostCard} user={user} />
        <Route exact path="addPost" component={PostForm} user={user} />
        <Route
          exact
          path="/addContacts"
          component={() => <ContactForm user={user} />}
        />
        <Route
          exact
          path="/emergencyContacts"
          component={ContactView}
        />
        <Route
          exact
          path="/editContactArray"
          component={EditContactArray}
        />
        <Route
          exact
          path="/editSingleContact/:fbk"
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
