import { Meteor } from 'meteor/meteor';
import { Dojos } from '../../api/dojo/Dojo';
import { DojoOwners } from '../../api/dojo/DojoOwner';
import { Profiles } from '../../api/profiles/Profiles';
import { StudySessions } from '../../api/studySession/StudySessions';
import { RegisteredSessions } from '../../api/studySession/RegisteredSessions';
import { ReportedProfiles } from '../../api/profiles/ReportedProfiles';

/* eslint-disable no-console */

/** Initialize the database with a default study session document. */
function addStudySession(data) {
  console.log(`  Adding: ${data.topic} (${data.owner})`);
  const docId = StudySessions.collection.insert(data);
  RegisteredSessions.collection.insert({ session: docId, owner: data.owner });
}

/** Initialize the database with a default data dojo document. */
function addDojo(data) {
  console.log(`  Adding: ${data.className} (${data.owner})`);
  Dojos.collection.insert(data);
  DojoOwners.collection.insert({ owner: data.owner, className: data.className });
}

/** Initialize the database with a default profile document. */
function addProfile({ email, firstName, lastName, bio, picture }) {
  console.log(`  Defining profile ${email}`);
  Profiles.collection.insert({ email, firstName, lastName, bio, picture });
}

/** Initialize the database with a default profile document. */
function addReport(data) {
  console.log(`  Adding Report: ${data.user}`);
  ReportedProfiles.collection.insert(data);
}
/** Initialize the collection if empty. */
if (ReportedProfiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultReports) {
    console.log('Creating default Reports.');
    Meteor.settings.defaultReports.map(data => addReport(data));
  }
}
/** Initialize the collection if empty. */
if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating default Profiles.');
    Meteor.settings.defaultProfiles.map(data => addProfile(data));
  }
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

/** Initialize the peoples collection with 50 people. */
if ((Meteor.settings.loadAssetsFile) && (Profiles.collection.find().count() === 0)) {
  const assetsFileName = 'data.json';
  console.log(`Loading data from private/${assetsFileName}`);
  const jsonData = JSON.parse(Assets.getText(assetsFileName));
  jsonData.profiles.map(profile => addProfile(profile));
}
