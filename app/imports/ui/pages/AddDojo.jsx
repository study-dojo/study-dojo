import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SelectField, SubmitField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Dojos } from '../../api/dojo/Dojo';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  className: {
    type: String,
    allowedValues: ['ICS 101', 'ICS 102', 'ICS 103', 'ICS 110', 'ICS 111', 'ICS 141', 'ICS 210',
      'ICS 211', 'ICS 212', 'ICS 215', 'ICS 222', 'ICS 235', 'ICS 241', 'ICS 290', 'ICS 311', 'ICS 312',
      'ICS 313', 'ICS 314', 'ICS 321', 'ICS 331', 'ICS 332', 'ICS 351', 'ICS 355',
      'ICS 361', 'ICS 390', 'ICS 414', 'ICS 415', 'ICS 419', 'ICS 421', 'ICS 422',
      'ICS 423', 'ICS 424', 'ICS 425', 'ICS 426', 'ICS 427', 'ICS 428', 'ICS 431', 'ICS 432', 'ICS 434',
      'ICS 435', 'ICS 438', 'ICS 441', 'ICS 442', 'ICS 443', 'ICS 451', 'ICS 452', 'ICS 455',
      'ICS 461', 'ICS 462', 'ICS 464', 'ICS 465', 'ICS 466', 'ICS 469', 'ICS 471',
      'ICS 475', 'ICS 476', 'ICS 481', 'ICS 483', 'ICS 484', 'ICS 485', 'ICS 485', 'ICS 491',
      'ICS 495', 'ICS 496', 'ICS 499'],
    defaultValue: 'ICS 111',
  },
  status: {
    type: String,
    allowedValues: ['grasshopper', 'sensei'],
    defaultValue: 'grasshopper',
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddDojo extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { className, status } = data;
    const owner = Meteor.user().username;
    Dojos.collection.insert({ className, status, owner },
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
            <Header as="h2" textAlign="center" inverted>Add Dojo</Header>
            <AutoForm ref={ref => {
              fRef = ref;
            }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
              <Segment className="AddForm">
                <SelectField name='className'/>
                <SelectField name='status'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default AddDojo;
