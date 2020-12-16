import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Dojos } from '../../api/dojo/Dojo';
import { DojoOwners } from '../../api/dojo/DojoOwner';
import { StudySessions } from '../../api/studySession/StudySessions';
import { RegisteredSessions } from '../../api/studySession/RegisteredSessions';
import { Alerts } from '../../api/alert/Alerts';
import { Profiles } from '../../api/profiles/Profiles';
import { ReportedProfiles } from '../../api/profiles/ReportedProfiles';

Meteor.publish(Profiles.userPublicationName, () => Profiles.collection.find());

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Dojos.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Dojos.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Alerts.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Alerts.collection.find({ owner: username });
  }
  return this.ready();
});

// Publish to all users
Meteor.publish(DojoOwners.userPublicationName, function () {
  if (this.userId) {
    return DojoOwners.collection.find();
  }
  return this.ready();
});

Meteor.publish(StudySessions.userPublicationName, function () {
  if (this.userId) {
    return StudySessions.collection.find();
  }
  return this.ready();
});

Meteor.publish(RegisteredSessions.userPublicationName, function () {
  if (this.userId) {
    return RegisteredSessions.collection.find();
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(StudySessions.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return StudySessions.collection.find();
  }
  return this.ready();
});

Meteor.publish(ReportedProfiles.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return ReportedProfiles.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
