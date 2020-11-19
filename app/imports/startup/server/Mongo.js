import { Meteor } from 'meteor/meteor';
import { Dojos } from '../../api/dojo/Dojo';
import { StudySessions } from '../../api/studySession/StudySessions';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addStudySession(data) {
  console.log(`  Adding: ${data.topic} (${data.owner})`);
  StudySessions.collection.insert(data);
}

/** Initialize the database with a default data dojo document. */
function addDojo(data) {
  console.log(`  Adding: ${data.className} (${data.owner})`);
  Dojos.collection.insert(data);
}

/** Initialize the collection if empty. */
if (StudySessions.collection.find().count() === 0) {
  if (Meteor.settings.defaultStudySessions) {
    console.log('Creating default Study Sessions.');
    Meteor.settings.defaultStudySessions.map(data => addStudySession(data));
  }
}

/** Initialize the dojo collection if empty. */
if (Dojos.collection.find().count() === 0) {
  if (Meteor.settings.defaultDojo) {
    console.log('Creating default dojo data.');
    Meteor.settings.defaultDojo.map(data => addDojo(data));
  }
}
