import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import StudySession from '../components/StudySession';
import { StudySessions } from '../../api/studySession/StudySessions';

/** Renders cards from components/StudySession.jsx. */
class ListStudySessions extends React.Component {
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
            {this.props.studySessions.map((studySession, index) => <StudySession key={index}
                                                                                 studySession={studySession}/>)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListStudySessions.propTypes = {
  studySessions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(StudySessions.userPublicationName);
  return {
    studySessions: StudySessions.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListStudySessions);
