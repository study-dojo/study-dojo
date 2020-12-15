import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Card, Icon } from 'semantic-ui-react';
import { _ } from 'meteor/underscore';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert';
import { StudySessions } from '../../api/studySession/StudySessions';
import { RegisteredSessions } from '../../api/studySession/RegisteredSessions';

/** Renders cards with the info in pages/ListStudySessions.jsx. */
class StudySession extends React.Component {
  handleClick(e, documentId) {
    const owner = Meteor.user().username;
    // if creator of session, delete for everyone
    if (StudySessions.collection.find({ $and: [{ _id: documentId, owner: owner }] }).count() !== 0) {
      e.preventDefault();
      swal({
        title: 'Do you want to delete study session?',
        buttons: true,
        dangerMode: true,
      })
          .then((willDelete) => {
            if (willDelete) {
              StudySessions.collection.remove(documentId);
              // find registered session with the same docId
              const session = RegisteredSessions.collection.find({ session: documentId }).fetch();
              // converts array to string
              const id = _.pluck(session, '_id');
              id.map(data => RegisteredSessions.collection.remove(data));
              swal('Study session deleted');
            }
          });
    } else {
      e.preventDefault();
      swal({
        title: 'Do you want to unregister from this study session?',
        buttons: true,
        dangerMode: true,
      })
          .then((willDelete) => {
            if (willDelete) {
              // find registered session with the same docId
              const session = RegisteredSessions.collection.find({ $and: [{ session: documentId, owner: owner }] }).fetch();
              // converts array to string
              const id = _.pluck(session, '_id');
              id.map(data => RegisteredSessions.collection.remove(data));
              swal('Unregistered study session');
            }
          });
    }
  }

  render() {
    const title = _.pluck(this.props.studySession, 'title');
    const className = _.pluck(this.props.studySession, 'className');
    const date = _.pluck(this.props.studySession, 'date');
    const day = date[0].slice(8, 10);
    const month = date[0].slice(5, 7);
    const year = date[0].slice(0, 4);
    let time = date[0].slice(11, 16);
    // converts time to am/pm form
    switch (time.slice(0, 2)) {
      case '12':
        time = `${time} pm`;
        break;
      case '13':
        time = `1${time.slice(2)} pm`;
        break;
      case '14':
        time = `2${time.slice(2)} pm`;
        break;
      case '15':
        time = `3${time.slice(2)} pm`;
        break;
      case '16':
        time = `4${time.slice(2)} pm`;
        break;
      case '17':
        time = `5${time.slice(2)} pm`;
        break;
      case '18':
        time = `6${time.slice(2)} pm`;
        break;
      case '19':
        time = `7${time.slice(2)} pm`;
        break;
      case '20':
        time = `8${time.slice(2)} pm`;
        break;
      case '21':
        time = `9${time.slice(2)} pm`;
        break;
      case '22':
        time = `10${time.slice(2)} pm`;
        break;
      case '23':
        time = `11${time.slice(2)} pm`;
        break;
      default:
        time = `${time} am`;
        break;
    }
    return (
        <Card centered>
          <Card.Content>
            <Card.Header>{title}</Card.Header>
            <Card.Header>{className}</Card.Header>
            <Card.Header>{month}/{day}/{year} - {time}</Card.Header>
          </Card.Content>

          <Card.Content extra>
            <Button icon floated='right' onClick={ e => this.handleClick(e, _.pluck(this.props.studySession, '_id')[0])}>
              <Icon name='trash'/>
            </Button>
          </Card.Content>
        </Card>
    );
  }
}

/** Takes in an array. */
StudySession.propTypes = {
  studySession: PropTypes.array.isRequired,
  registeredSessions: PropTypes.array.isRequired,

};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(withTracker(() => {
  const sub = Meteor.subscribe(RegisteredSessions.userPublicationName);
  return {
    registeredSessions: RegisteredSessions.collection.find({}).fetch(),
    ready: sub.ready(),
  };
})(StudySession));
