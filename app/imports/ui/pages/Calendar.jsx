import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader } from 'semantic-ui-react';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { StudySessions } from '../../api/studySession/StudySessions';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Calendar extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const title = _.pluck(this.props.studySessions, 'title');
    const className = _.pluck(this.props.studySessions, 'className');
    const date = _.pluck(this.props.studySessions, 'date');
    const events = _.map(title, function (v, i) {
      return { title: `${v} - ${className[i]}`, date: `${date[i]}` };
    });
    return (
        <Container id="my-calender-page">
          <Header as="h2" textAlign="center" inverted>Calendar</Header>
          <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              timeZone={'UTC'}
              events={
                events
              }
          />
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Calendar.propTypes = {
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
})(Calendar);
