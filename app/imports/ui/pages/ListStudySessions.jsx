import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import StudySession from '../components/StudySession';
import { StudySessions } from '../../api/studySession/StudySessions';
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
    const { owner, topic, className, sessionDate, sessionTime } = data;
    swal({
      title: `Do you want to attend a study session about ${topic} for ${className} on ${sessionDate} at ${sessionTime}`,
      buttons: true,
    })
        .then((willDelete) => {
          if (willDelete) {
            StudySessions.collection.insert({
              topic: topic,
              className: className,
              sessionDate: sessionDate,
              sessionTime: sessionTime,
              owner: owner,
            });
            Alerts.collection.remove(documentId);
          }
        });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <div>
          <Container id="session-list">
            <Header as="h2" textAlign="center" inverted>List Study Sessions</Header>
            <Card.Content floated='right'>
              <Button onClick={e => this.handleClick(e)}>
                Notification
              </Button>
            </Card.Content>

            <Card.Group>
              {this.props.studySessions.map((studySession, index) => <StudySession key={index}
                                                                                   studySession={studySession}/>)}
            </Card.Group>
          </Container>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListStudySessions.propTypes = {
  studySessions: PropTypes.array.isRequired,
  alert: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const sub1 = Meteor.subscribe(StudySessions.userPublicationName);
  const sub2 = Meteor.subscribe(Alerts.userPublicationName);
  return {
    studySessions: StudySessions.collection.find({}).fetch(),
    alert: Alerts.collection.find({}).fetch(),
    ready: sub1.ready() && sub2.ready(),
  };
})(ListStudySessions);
