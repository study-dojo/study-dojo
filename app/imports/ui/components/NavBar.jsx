import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Button, Image } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '10px' };
    return (
        <Menu style={menuStyle} pointing secondary attached="top" borderless inverted color='black' className='NavBar'>
          <Menu.Item as={NavLink} activeClassName="" exact to="/">
            <Image src="/images/logo.png" className="logo"/>
          </Menu.Item>
          {this.props.currentUser ? (
            [<Menu.Item id="navbar-my-dojo" as={NavLink} activeClassName="active" exact to="/mydojo" key='mydojo'>My Dojo</Menu.Item>,
            <Menu.Item id="navbar-add-session" as={NavLink} activeClassName="active" exact to="/add" key='add'>Add Session</Menu.Item>,
            <Menu.Item id="navbar-session-list" as={NavLink} activeClassName="active" exact to="/list" key='list'>Session List</Menu.Item>,
            <Menu.Item id="navbar-calender" as={NavLink} activeClassName="active" exact to="/calendar" key='calendar'>Calendar</Menu.Item>]
            ) : ''}
          {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
              <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>
          ) : ''}
          <Menu.Item position="right">
            {this.props.currentUser === '' ? (
                <Button color="green" as={NavLink} exact to="/signin" id="sign-in-button">Sign In</Button>
            ) : (
                <>
                  <Image as={NavLink} activeClassName="active" exact to="/myprofile" key='myprofile' src="/images/avatar.png" avatar />
                  <Dropdown floating button id="navbar-current-user" text={this.props.currentUser} pointing="top right" >
                    <Dropdown.Menu>
                      <Dropdown.Item icon="sign-out alternate" text="Sign Out" id="navbar-sign-out" as={NavLink} exact to="/signout"/>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
            )}
          </Menu.Item>
        </Menu>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
