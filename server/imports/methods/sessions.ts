import { Meteor } from 'meteor/meteor';

import { Random } from 'meteor/random';

import { Sessions } from 'imports/collections/sessions';
import { Session, SessionToken } from 'imports/models/sessions';

import { Time_To_Fix_Data } from 'imports/collections/time_to_fix_data';

import { Qualys_API_Access_Parameters } from 'imports/models/qualys_api_access_parameters';
import { isDefined } from '@angular/compiler/src/util';

const salt: string = readSaltFromShellEnvironment();

function readSaltFromShellEnvironment(): string {
  if ((isDefined(process.env.TTFSALT)) && (process.env.TTFSALT !== null)) {
    return process.env.TTFSALT;
  } else {
    console.log('WARNING: no salt defined in environment variable TTFSALT');
    return Math.random().toString(36).substring(2, 15);
  };  
};

Meteor.methods({

  generate_new_session_id(new_user_agent_id_arg: string) {

    let new_session_table_entry: Session = {
      participant_id: '',
      client_session_id: Random.id(32),
      client_ip_address: this.connection.clientAddress,
      client_user_agent_id: new_user_agent_id_arg,
      session_started: new Date(),
      last_touch: new Date(),
      status: "anonymous"
    };

    Sessions.insert(new_session_table_entry);

    return new_session_table_entry.client_session_id; 
  },

  attempt_login_on_server(access_parameters_arg: Qualys_API_Access_Parameters, session_token_arg: SessionToken) {

    // console.log("login request for ›" + access_parameters_arg.account_username + "‹ on ›" + access_parameters_arg.api_url + "‹ for session ›" + session_token_arg.client_session_id + "‹ with passowrd ›" + access_parameters_arg.account_password + "‹ with user agent id ›" + session_token_arg.client_user_agent_id + "‹");

    let all_parameters_are_valid: boolean = true;

    if (session_token_arg.client_session_id.length !== 32) {
      console.log("invalid: received client_session_id with invalid length");
      all_parameters_are_valid = false;
    };

    if (access_parameters_arg.account_username.length < 4) {
      console.log("invalid: received access_parameters_arg.account_username that is too short");
      all_parameters_are_valid = false;
    };

    if (access_parameters_arg.account_password.length < 4) {
      console.log("invalid: received access_parameters_arg.account_password that is too short");
      all_parameters_are_valid = false;
    };

    if (access_parameters_arg.api_url.length < 19) {
      console.log("invalid: received access_parameters_arg.api_url that is too short");
      all_parameters_are_valid = false;
    };

    if (session_token_arg.client_user_agent_id.length !== 64) {
      console.log("invalid: received user_agent_id_arg with invalid length");
      all_parameters_are_valid = false;
    };

    if (all_parameters_are_valid) {

      let current_session: Session;
      current_session = Sessions.findOne( { 'client_session_id': session_token_arg.client_session_id,
                                            'client_user_agent_id': session_token_arg.client_user_agent_id,
                                            'session_started': { $lt: new Date() }
                                          });

      if ( typeof current_session === 'undefined') {
        console.log("didn't find a session with these identifiers");
      } else {
        if ( current_session === null ) {
          // console.log("didn't find a session with these identifiers");
        } else {
          // console.log("found a session with these identifiers");
          let crypto = require('crypto');
          session_token_arg.participant_id = crypto.createHash('sha256')
                                                   .update(salt + access_parameters_arg.account_username + access_parameters_arg.api_url)
                                                   .digest('hex');

          Sessions.update( { 'client_session_id': session_token_arg.client_session_id,
                            'client_user_agent_id': session_token_arg.client_user_agent_id
                          },
                          {
                            $set: { participant_id: session_token_arg.participant_id,
                                    status: 'pending'
                            }
                          }
                        );
          
          var qualys_api = require('./qualys-api');
          qualys_api.authenticate_against_qualys_api(access_parameters_arg, session_token_arg, Meteor.bindEnvironment(function (result) {
            console.log(result);
          }));


        };
      };



    }

  },

  attempt_logout_on_server(session_token_arg: SessionToken) {

    // console.log("logout request for session ›" + session_token_arg.client_session_id + "‹ with user agent id ›" + session_token_arg.client_user_agent_id + "‹");

    let all_parameters_are_valid: boolean = true;

    if (session_token_arg.client_session_id.length !== 32) {
      // console.log("invalid: received client_session_id with invalid length");
      all_parameters_are_valid = false;
    };

    if (session_token_arg.client_user_agent_id.length !== 64) {
      // console.log("invalid: received user_agent_id_arg with invalid length");
      all_parameters_are_valid = false;
    };

    if (all_parameters_are_valid) {

      let current_session: Session;
      current_session = Sessions.findOne( { 'client_session_id': session_token_arg.client_session_id,
                                         'client_user_agent_id': session_token_arg.client_user_agent_id,
                                              'session_started': { $lt: new Date() }
                                          });

      if ( typeof current_session === 'undefined') {
        // console.log("didn't find a session with these identifiers");
      } else {
        if ( current_session === null ) {
          // console.log("didn't find a session with these identifiers");
        } else {
          // console.log("found a session with these identifiers");

          Sessions.update( { 'client_session_id': session_token_arg.client_session_id,
                          'client_user_agent_id': session_token_arg.client_user_agent_id
                          },
                          {
                            $set: { participant_id: '', status: 'anonymous' }
                          }
                        );

          Time_To_Fix_Data.update({ 'client_session_id': session_token_arg.client_session_id,
                                    'client_user_agent_id': session_token_arg.client_user_agent_id
                                  },
                                  {
                                    $set: { 'client_session_id': '', 'client_user_agent_id': '' } 
                                  });

        };
      };



    }

  },

  delete_participant_data(session_token_arg: SessionToken) {

    // console.log("data deletetion request for session ›" + session_token_arg.client_session_id + "‹ with user agent id ›" + session_token_arg.client_user_agent_id + "‹");

    let all_parameters_are_valid: boolean = true;

    if (session_token_arg.client_session_id.length !== 32) {
      // console.log("invalid: received client_session_id with invalid length");
      all_parameters_are_valid = false;
    };

    if (session_token_arg.client_user_agent_id.length !== 64) {
      // console.log("invalid: received user_agent_id_arg with invalid length");
      all_parameters_are_valid = false;
    };

    if (all_parameters_are_valid) {

      let current_session: Session;
      current_session = Sessions.findOne( { 'client_session_id': session_token_arg.client_session_id,
                                         'client_user_agent_id': session_token_arg.client_user_agent_id,
                                              'session_started': { $lt: new Date() }
                                          });

      if ( typeof current_session === 'undefined') {
        // console.log("didn't find a session with these identifiers");
      } else {
        if ( current_session === null ) {
          // console.log("didn't find a session with these identifiers");
        } else {
          // console.log("found a session with these identifiers");

          Time_To_Fix_Data.remove({ 'participant_id': current_session.participant_id
                                  });

        };
      };



    }

  }   

})


