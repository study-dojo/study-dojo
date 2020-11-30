import React from 'react';
import { Grid, Loader, Header, Segment, Button, Icon } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { StudySessions } from '../../api/studySession/StudySessions';

const bridge = new SimpleSchema2Bridge(StudySessions.schema);

const statusOptions = [
  { label: 'Grasshopper', value: 'grasshopper' },
  { label: 'Sensei', value: 'sensei' },
];

/** Renders the Page for editing a single document. */
class EditStudySession extends React.Component {

  handleClick() {
    swal({
      title: 'Do you want to delete study session?',
      buttons: true,
      dangerMode: true,
    })
        .then((willDelete) => {
          if (willDelete) {
            swal('Study session deleted');
          }
        });
  }

  /** On successful submit, insert the data. */
  submit(data) {
    const { name, quantity, condition, _id } = data;
    StudySessions.collection.update(_id, { $set: { name, quantity, condition } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    let fRef = null;

    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>Edit Study Session</Header>
            <Button icon onClick={this.handleClick} >
              <Icon name='trash' />
              Delete Study Session
            </Button>
            <AutoForm ref={ref => {
              fRef = ref;
            }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
              <Segment>
                <TextField name='topic'/>
                <TextField name='className'/>
                <SelectField name='status' options={statusOptions}/>
                <TextField name='sessionDate'/>
                <TextField name='sessionTime'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditStudySession.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(StudySessions.userPublicationName);
  return {
    doc: StudySessions.collection.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditStudySession);
