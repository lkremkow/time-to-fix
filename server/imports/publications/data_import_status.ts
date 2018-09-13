import { Meteor } from 'meteor/meteor';

import { DataImportStatus } from 'imports/collections/data_import_status';
import { DataImportState } from 'imports/models/data_import_state'

// import { Sessions } from 'imports/collections/sessions';
import { SessionToken } from 'imports/models/sessions';

Meteor.publish('data_import_status', function(session_token_arg: SessionToken) {

  return DataImportStatus.find( { client_session_id: session_token_arg.client_session_id,
                                  client_user_agent_id: session_token_arg.client_user_agent_id
                                }, { limit: 1,
                                     fields: { participant_id: 0 } });

});