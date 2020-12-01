import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import { PropTypes } from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { StudySessions } from '../../api/studySession/StudySessions';
import { DojoOwners } from '../../api/dojo/DojoOwner';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  topic: String,
  className: String,
  status: String,
  sessionDate: String,
  sessionTime: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

const statusOptions = [
  { label: 'Grasshopper', value: 'grasshopper' },
  { label: 'Sensei', value: 'sensei' },
];

/** Renders the Page for adding a document. */
class AddStudySession extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { topic, className, status, sessionDate, sessionTime } = data;
    const owner = Meteor.user().username;
    StudySessions.collection.insert({ topic, className, status, sessionDate, sessionTime, owner },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Item added successfully', 'success');
            formRef.reset();
            // find all users that are registered under the same class
            const sameOwners = _.without(_.pluck(DojoOwners.collection.find({ className: className }).fetch(), 'owner'), owner);
            sameOwners.map((entry) => StudySessions.collection.insert({
                  topic: data.topic,
                  className: data.className,
                  status: data.status,
                  sessionDate: data.sessionDate,
                  sessionTime: data.sessionTime,
                  owner: entry,
                }));
          }
        });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;

    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Add Study Session</Header>
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

AddStudySession.propTypes = {
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const sub = Meteor.subscribe(DojoOwners.userPublicationName);
  return {
    ready: sub.ready(),
  };
})(AddStudySession);
