import { Meteor } from 'meteor/meteor';

import { Time_To_Fix_Data } from 'imports/collections/time_to_fix_data';
// import { Time_To_Fix_Record } from 'imports/models/time_to_fix_record'

// import { Sessions } from 'imports/collections/sessions';
import { SessionToken } from 'imports/models/sessions';

Meteor.publish('your_time_to_fix_record', function(session_token_arg: SessionToken) {

  // console.log('there was a subscription request to your_time_to_fix_record in time_to_fix_data.ts');

  // let my_session: Session;
  // my_session = Sessions.findOne( { 'client_session_id': session_token_arg.client_session_id,
  //                               'client_user_agent_id': session_token_arg.client_user_agent_id,
  //                               'session_started': { $lt: new Date() },
  //                                'status': 'authenticated' } );

  // if (( typeof my_session === 'undefined' ) || ( my_session === null )) {
  //   // found nothing, do nothing
  //   return null;
  // } else {
  //   // console.log("your_time_to_fix_record found data for participant_id " + my_session.participant_id);
  //   return Time_To_Fix_Data.find( { participant_id: my_session.participant_id }, { limit: 1 });
  // };

  return Time_To_Fix_Data.find( { 'client_session_id': session_token_arg.client_session_id,
                                  'client_user_agent_id': session_token_arg.client_user_agent_id
                                }, { limit: 1, fields: { 'participant_id': 0 } });


  // if (typeof my_session !== 'undefined') {
  //   if (my_session !== null) {
  //     if (my_session.pseudo_user_id.length > 0) {
  //       return Statistics_On_Fixed.find( { 'origin': my_session.pseudo_user_id.length }, { limit: 1 } );
  //     };

  //   };

  // };

});

Meteor.publish('comparison_time_to_fix_records', function() {

  return Time_To_Fix_Data.find( {}, { fields: { 'participant_id': 0, 'client_session_id': 0, 'client_user_agent_id': 0, 'hosts_in_scope': 0, 'total_vuln_count': 0 } });

});