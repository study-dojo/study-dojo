import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Stuffs } from '../../api/stuff/Stuff';
import StudySession from '../components/StudySession';

/** Renders cards from components/StudySession.jsx. */
class ListStudySessions extends React.Component {
  studySessions = [{
    topic: 'Help with HW', class: 'ICS 111', status: 'sensei', date: '11/15/2020', time: 'Right Now!',
  },
    {
      topic: 'Exam Study', class: 'ICS 311', status: 'grasshopper', date: '11/17/2020', time: '5:00 pm',
    },
  ];

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center" inverted>List Study Sessions</Header>
          <Card.Group>
            {this.studySessions.map((studySession, index) => <StudySession key={index} studySession={studySession} />)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListStudySessions.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Stuffs.userPublicationName);
  return {
    stuffs: Stuffs.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListStudySessions);
