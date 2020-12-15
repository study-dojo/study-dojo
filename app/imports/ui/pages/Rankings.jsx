import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Leaderboard } from '../../api/leaderboard/Leaderboard';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Rankings extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center" inverted>Rankings</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Profile</Table.HeaderCell>
                <Table.HeaderCell>Points</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.leaderboard.map((leaderboard) => <Leaderboard key={leaderboard._id} leaderboard={leaderboard} />)}
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Rankings.propTypes = {
  leaderboard: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Leaderboard.adminPublicationName);
  return {
    leaderboard: Leaderboard.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Rankings);
