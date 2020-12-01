import React from 'react';
import { Progress, Card, Container, Header, Loader, Image, Grid, Segment, Form } from 'semantic-ui-react';
import { AutoForm, SubmitField, TextField, LongTextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Profiles } from '../../api/profiles/Profiles';
import { updateProfileMethod } from '../../startup/both/Methods';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  email: { type: String, label: 'Email', optional: true },
  firstName: { type: String, label: 'First', optional: true },
  lastName: { type: String, label: 'Last', optional: true },
  bio: { type: String, label: 'Bio', optional: true },
  picture: { type: String, label: 'Profile Picture', optional: true },
});

/** Renders the Profile page */
class MyProfile extends React.Component {

  /** On submit, insert the data. */
  submit(data) {
    Meteor.call(updateProfileMethod, data, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Profile updated successfully', 'success');
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
                  <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false}/>
                  <Card.Content>
                    <Card.Header>My Name</Card.Header>
                    <Card.Meta>
                      <span>{email}</span>
                    </Card.Meta>
                    <Card.Description>
                      My Bio...
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column width={12}>
                <Grid.Row>
                  <Card fluid>
                    <Card.Content>
                      <Card.Header>Rank Progress</Card.Header>
                    </Card.Content>
                    <Progress value='3' total='5' progress='ratio' size='large'/>
                  </Card>
                </Grid.Row>
                <Grid.Row>
                  <AutoForm model={profile} schema={bridge} onSubmit={data => this.submit(data)}>
                    <Segment className='AddForm'>
                      <Form.Group widths={'equal'}>
                        <TextField id='firstName' name='firstName' showInlineError={true} placeholder={'First Name'}/>
                        <TextField id='lastName' name='lastName' showInlineError={true} placeholder={'Last Name'}/>
                        <Form.Input fluid label='Email' placeholder={email} readOnly/>
                      </Form.Group>
                      <TextField name='picture' showInlineError={true} placeholder={'Image URL'}/>
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
