import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, DateField, ErrorsField, SubmitField, TextField, SelectField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { withTracker } from 'meteor/react-meteor-data';
import { PropTypes } from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { StudySessions } from '../../api/studySession/StudySessions';
import { RegisteredSessions } from '../../api/studySession/RegisteredSessions';
import { DojoOwners } from '../../api/dojo/DojoOwner';
import { Alerts } from '../../api/alert/Alerts';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  title: String,
  className: {
    type: String,
    allowedValues: ['ICS 101', 'ICS 102', 'ICS 103', 'ICS 110', 'ICS 111', 'ICS 141', 'ICS 210',
      'ICS 211', 'ICS 212', 'ICS 215', 'ICS 222', 'ICS 235', 'ICS 241', 'ICS 290', 'ICS 311', 'ICS 312',
      'ICS 313', 'ICS 314', 'ICS 321', 'ICS 331', 'ICS 332', 'ICS 351', 'ICS 355',
      'ICS 361', 'ICS 390', 'ICS 414', 'ICS 415', 'ICS 419', 'ICS 421', 'ICS 422',
      'ICS 423', 'ICS 424', 'ICS 425', 'ICS 426', 'ICS 427', 'ICS 428', 'ICS 431', 'ICS 432', 'ICS 434',
      'ICS 435', 'ICS 438', 'ICS 441', 'ICS 442', 'ICS 443', 'ICS 451', 'ICS 452', 'ICS 455',
      'ICS 461', 'ICS 462', 'ICS 464', 'ICS 465', 'ICS 466', 'ICS 469', 'ICS 471',
      'ICS 475', 'ICS 476', 'ICS 481', 'ICS 483', 'ICS 484', 'ICS 485', 'ICS 491',
      'ICS 495', 'ICS 496', 'ICS 499'],
    defaultValue: 'ICS 111',
  },
  date: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddStudySession extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { title, className } = data;
    let { date } = data;
    date = date.toISOString();
    const owner = Meteor.user().username;
    const sessionId = StudySessions.collection.insert({ title, className, date, owner },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Item added successfully', 'success');
            formRef.reset();
            // Register study session for owner
            RegisteredSessions.collection.insert({ session: sessionId, owner: owner });
            // find all other users that are registered under the same class
            const sameOwners = _.without(_.pluck(DojoOwners.collection.find({ className: className })
                .fetch(), 'owner'), owner);

            // Insert an alert for all other users
            sameOwners.map((entry) => Alerts.collection.insert({
              owner: entry,
              title: title,
              className: className,
              date: date,
              sessionId: sessionId,
            }));
          }
        });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;

    return (
        <Grid container centered id="add-study-session">
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>Add Study Session</Header>
            <AutoForm ref={ref => {
              fRef = ref;
            }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
              <Segment className='AddForm'>
                <TextField id="title-field" name='title'/>
                <SelectField id="classNameList" name='className'/>
                <DateField id="date-field" name='date'/>
                <SubmitField id="add-submit" value='Submit'/>
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
