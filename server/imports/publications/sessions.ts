import { Meteor } from 'meteor/meteor';

import { Sessions } from 'imports/collections/sessions';
import { SessionToken } from 'imports/models/sessions';

Meteor.publish('active_session', function(session_token_arg: SessionToken) {
  return Sessions.find( { 'client_session_id': session_token_arg.client_session_id,
                          'client_user_agent_id': session_token_arg.client_user_agent_id,
                          'session_started': { $lt: new Date() }
                        },
                        { limit: 1,
                          fields: { 'participant_id': 0, 'client_ip_address': 0, 'session_started': 0, 'last_touch': 0}
                         } );
});