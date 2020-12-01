import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Dojos } from '../../api/dojo/Dojo';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  className: String,
  status: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

const statusOptions = [
  { label: 'Grasshopper', value: 'grasshopper' },
  { label: 'Sensei', value: 'sensei' },
];

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
                <TextField name='className'/>
                <SelectField name='status' options={statusOptions} />
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
