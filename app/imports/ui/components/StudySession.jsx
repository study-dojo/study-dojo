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
              console.log(id);
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
    const topic = _.pluck(this.props.studySession, 'topic');
    const className = _.pluck(this.props.studySession, 'className');
    const sessionDate = _.pluck(this.props.studySession, 'sessionDate');
    const sessionTime = _.pluck(this.props.studySession, 'sessionTime');
    return (
        <Card centered>
          <Card.Content>
            <Card.Header>{topic}</Card.Header>
            <Card.Header>{className}</Card.Header>
            <Card.Header>{sessionDate} - {sessionTime}</Card.Header>
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
