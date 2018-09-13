import { Meteor } from 'meteor/meteor';

import { Profiles } from 'imports/collections/profiles';
// import { Profile } from 'imports/models/profiles';

import { SessionToken } from 'imports/models/sessions';

Meteor.publish('current_profile', function(session_token_arg: SessionToken) {
  return Profiles.find( { 'client_session_id': session_token_arg.client_session_id,
                          'client_user_agent_id': session_token_arg.client_user_agent_id
                        },
                        { limit: 1,
                          fields: { 'participant_id': 0 }
                         } );
});