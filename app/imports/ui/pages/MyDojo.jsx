import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader, Button, Icon } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MyDojoStuff from '../components/MyDojoStuff';
import { Dojos } from '../../api/dojo/Dojo';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class MyDojo extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container id="my-dojo-page">
          <Header as="h2" textAlign="center" inverted>My Dojo</Header>
          <Table celled striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Dojo</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.stuffs.map((stuff) => <MyDojoStuff key={stuff._id} stuff={stuff}/>)}
            </Table.Body>

            <Table.Footer fullWidth>
              <Table.Row>
                <Table.HeaderCell colSpan='2'>
                  <Button
                      floated='right'
                      icon
                      labelPosition='left'
                      primary
                      size='small'
                      as={Link} to='/adddojo'
                  >
                    <Icon name='plus square' /> Add Dojo
                  </Button>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>

          </Table>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
MyDojo.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Dojos.userPublicationName);
  return {
    stuffs: Dojos.collection.find({}).fetch(),
    ready: subscription.ready(),
  };
})(MyDojo);
