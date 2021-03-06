import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card, Button } from 'semantic-ui-react';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import StudySession from '../components/StudySession';
import { StudySessions } from '../../api/studySession/StudySessions';
import { RegisteredSessions } from '../../api/studySession/RegisteredSessions';
import { Alerts } from '../../api/alert/Alerts';

/** Renders cards from components/StudySession.jsx. */
class ListStudySessions extends React.Component {

  // Handles when user clicks "Notification" button
  handleClick(e) {
    e.preventDefault();
    /* Checks if there are any alerts for the user, create alert message if there is */
    if (Alerts.collection.find({}).fetch().length !== 0) {
      Alerts.collection.find({}).fetch().map(data => this.createAlertMessage(data, data._id));
    }
  }

  /* Creates message asking if user wants to attend study session
   * Clicking ok, adds study session for user */
  createAlertMessage(data, documentId) {
    const { owner, title, className, date, sessionId } = data;
    const day = date.slice(8, 10);
    const month = date.slice(5, 7);
    const year = date.slice(0, 4);
    let time = date.slice(11, 16);
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
    swal({
      title: 'Do you want to attend a study session?',
      text: `${title} for ${className} on ${month}/${day}/${year} at ${time}`,
      buttons: {
        cancel: 'cancel',
        No: {
          text: 'No',
          attend: 'False',
        },
        Yes: {
          text: 'Yes',
          attend: 'True',
        },
      },
    })
        .then((attend) => {
          if (attend) {
            RegisteredSessions.collection.insert({ session: sessionId, owner: owner });
            Alerts.collection.remove(documentId);
          } else {
            Alerts.constructor.remove(documentId);
          }
        });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    // pulls _id from all registered study sessions belonging to the user
    const owner = Meteor.user().username;
    const filteredSessions = _.filter(RegisteredSessions.collection.find({}).fetch(), function (data) {
      return data.owner === owner;
    });
    const sessionId = _.pluck(filteredSessions, 'session');

    // finds all study sessions that matches sessionId
    const regStudySessions = sessionId.map(e => StudySessions.collection.find({ _id: e }).fetch());

    return (
        <div>
          <Container id="session-list">
            <Header as="h2" textAlign="center" inverted>List Study Sessions</Header>
            <Card.Content floated='right'>
              <Button color='red' floated='left' onClick={e => this.handleClick(e)}>
                Notification
              </Button>
            </Card.Content>

            <Card.Group>
              {regStudySessions.map((data, index) => <StudySession key={index}
                                                                   studySession={data}/>)}
            </Card.Group>
          </Container>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListStudySessions.propTypes = {
  studySessions: PropTypes.array.isRequired,
  registeredSessions: PropTypes.array.isRequired,
  alert: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const sub1 = Meteor.subscribe(StudySessions.userPublicationName);
  const sub2 = Meteor.subscribe(RegisteredSessions.userPublicationName);
  const sub3 = Meteor.subscribe(Alerts.userPublicationName);
  return {
    studySessions: StudySessions.collection.find({}).fetch(),
    registeredSessions: RegisteredSessions.collection.find({}).fetch(),
    alert: Alerts.collection.find({}).fetch(),
    ready: sub1.ready() && sub2.ready() && sub3.ready(),
  };
})(ListStudySessions);
