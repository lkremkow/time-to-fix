import { Meteor } from 'meteor/meteor';

import { Sessions } from 'imports/collections/sessions';
import { Session } from 'imports/models/sessions'

import { Statistics_On_Fixed } from 'imports/collections/statistics_on_fixed';

Meteor.publish('my_statistics_on_fixed', function(session_id_arg) {

  let my_session: Session;
  my_session = Sessions.findOne( { 'session_id': session_id_arg } );

  // if (typeof my_session !== 'undefined') {
  //   if (my_session !== null) {
  //     if (my_session.pseudo_user_id.length > 0) {
  //       return Statistics_On_Fixed.find( { 'origin': my_session.pseudo_user_id.length }, { limit: 1 } );
  //     };

  //   };

  // };

});

Meteor.publish('all_statistics_on_fixed', function() {
  return Statistics_On_Fixed.find( {}, { fields: { "_id": 0, "origin": 0, "added_on": 0 } });
});