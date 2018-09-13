import { Meteor } from 'meteor/meteor';

import { ValidSectors } from 'imports/collections/valid_sectors';

Meteor.publish('valid_sectors', function() {
  return ValidSectors.find( {} );
});