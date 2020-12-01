import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profiles/Profiles';

const updateProfileMethod = 'Profiles.update';

Meteor.methods({
  'Profiles.update'({ email, firstName, lastName, bio, picture }) {
    Profiles.collection.update({ email }, { $set: { email, firstName, lastName, bio, picture } });
  },
});

export { updateProfileMethod };
