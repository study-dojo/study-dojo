import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';

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
    return (
        <Container>
          <Header as="h2" textAlign="center" inverted>Calendar</Header>
          <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events= {[
                { title: 'Exam Study 4pm', date: '2020-12-07' },
                { title: 'Programming Practice 5pm', date: '2020-12-08' },
                { title: 'Coding Camp 3pm', date: '2020-12-09' },
                { title: 'Exam Study 2pm', date: '2020-12-10' },
                { title: 'HW Help 2pm', date: '2020-12-11' },
                { title: 'HW Help 1pm', date: '2020-12-14' },
                { title: 'Tutoring 2pm', date: '2020-12-15' },
                { title: 'Exam Study 8pm', date: '2020-12-16' },
                { title: 'Exam Study 6pm', date: '2020-12-17' },
                { title: 'Group Project 2pm', date: '2020-12-18' },
                { title: 'HW Help 1pm', date: '2020-12-21' },
                { title: 'Tutoring 2pm', date: '2020-12-22' },
                { title: 'Exam Study 8pm', date: '2020-12-23' },
                { title: 'Exam Study 6pm', date: '2020-12-24' },
                { title: 'Group Project 2pm', date: '2020-12-25' },
              ]}
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
