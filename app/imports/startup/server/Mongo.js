import { Meteor } from 'meteor/meteor';
import { StudySessions } from '../../api/studySession/StudySessions';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addStudySession(data) {
  console.log(`  Adding: ${data.topic} (${data.owner})`);
  StudySessions.collection.insert(data);
}

/** Initialize the collection if empty. */
if (StudySessions.collection.find().count() === 0) {
  if (Meteor.settings.defaultStudySessions) {
    console.log('Creating default Study Sessions.');
    Meteor.settings.defaultStudySessions.map(data => addStudySession(data));
  }
}
