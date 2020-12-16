import React from 'react';
import { Progress, Card, Container, Header, Loader, Image, Grid, Segment, Form, Divider } from 'semantic-ui-react';
import { AutoForm, SubmitField, TextField, LongTextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Profiles } from '../../api/profiles/Profiles';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  firstName: { type: String, label: 'First', optional: true },
  lastName: { type: String, label: 'Last', optional: true },
  bio: { type: String, label: 'Bio', optional: true },
  picture: { type: String, label: 'Profile Picture', optional: true },
});

/** Renders the Profile page */
class MyProfile extends React.Component {

  /** On submit, insert the data. */
  submit(data) {
    const { _id, firstName, lastName, bio, picture } = data;
    Profiles.collection.update(_id, { $set: { firstName, lastName, bio, picture } }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Profile updated successfully. Refresh to view changes.', 'success');
      }
    });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const email = Meteor.user().username;
    const bridge = new SimpleSchema2Bridge(formSchema);
    const profile = Profiles.collection.findOne({ email });
    return (
        <Container>
          <Header as="h2" textAlign="center" inverted>My Profile</Header>
          <Grid divided='vertically'>
            <Grid.Row>
              <Grid.Column width={4}>
                <Card>
                  <Image src={profile.picture} wrapped ui={false} />
                  <Card.Content>
                    <Card.Header>{profile.firstName} {profile.lastName}</Card.Header>
                    <Card.Meta>
                      <span>{email}</span>
                    </Card.Meta>
                    <Card.Description>
                      {profile.bio}
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column width={12}>
                <Grid.Row>
                  <Card fluid>
                    <Card.Content>
                      <Card.Header>Rank Progress</Card.Header>
                      <Divider hidden/>
                      <Progress value='3' total='5' progress='ratio'/>
                    </Card.Content>
                  </Card>
                  <Divider hidden/>
                </Grid.Row>
                <Grid.Row>
                  <AutoForm model={profile} schema={bridge} onSubmit={data => this.submit(data)}>
                    <Segment className='AddForm'>
                      <Form.Group widths={'equal'}>
                        <TextField id='firstName' name='firstName' showInlineError={true} placeholder={'First Name'}/>
                        <TextField id='lastName' name='lastName' showInlineError={true} placeholder={'Last Name'}/>
                      </Form.Group>
                      <TextField id='picture' name='picture' showInlineError={true} placeholder={'Image URL'}/>
                      <LongTextField id='bio' name='bio' placeholder='Write a little bit about yourself.'/>
                      <SubmitField id='profile-update' value='Update Profile'/>
                    </Segment>
                  </AutoForm>
                </Grid.Row>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
MyProfile.propTypes = {
  profile: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Profiles.userPublicationName);
  return {
    ready: subscription.ready(),
  };
})(MyProfile);
