import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { PropTypes } from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { DojoOwners } from '../../api/dojo/DojoOwner';
import { ReportedProfiles } from '../../api/profiles/ReportedProfiles';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  user: String,
  reportReason: String,
  reportDescription: String,
});

const reportOptions = [
  { label: 'Harassment', value: 'harassment' },
  { label: 'Cheating', value: 'cheating' },
  { label: 'Spam', value: 'spam' },
  { label: 'Offensive Content', value: 'offensive' },
  { label: 'Other', value: 'other' },
];

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class Report extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { user, reportReason, reportDescription } = data;
    const submitBy = Meteor.user().username;
    ReportedProfiles.collection.insert({ user, reportReason, reportDescription, submitBy },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Item added successfully', 'success');
            formRef.reset();
          }
        });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;

    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>Report User</Header>
            <AutoForm ref={ref => {
              fRef = ref;
            }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
              <Segment className="AddForm">
                <TextField name='user' placeholder='Who are you reporting?'/>
                <SelectField name='reportReason' options={reportOptions} />
                <LongTextField name='reportDescription' placeholder='Tell us more on what happened'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

Report.propTypes = {
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const sub = Meteor.subscribe(DojoOwners.userPublicationName);
  return {
    ready: sub.ready(),
  };
})(Report);
