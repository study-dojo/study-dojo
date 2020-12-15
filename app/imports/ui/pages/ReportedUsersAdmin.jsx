import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import ReportItemAdmin from '../components/ReportItemAdmin';
import { ReportedProfiles } from '../../api/profiles/ReportedProfiles';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ReportedUsersAdmin extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center" inverted>Reported Users (Admin)</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Reported User</Table.HeaderCell>
                <Table.HeaderCell>Report Reason</Table.HeaderCell>
                <Table.HeaderCell>Report Description</Table.HeaderCell>
                <Table.HeaderCell>Reported by</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.reportedProfiles.map((reportedProfiles) => <ReportItemAdmin key={reportedProfiles._id} reportedProfiles={reportedProfiles} />)}
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ReportedUsersAdmin.propTypes = {
  reportedProfiles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(ReportedProfiles.adminPublicationName);
  return {
    reportedProfiles: ReportedProfiles.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ReportedUsersAdmin);
