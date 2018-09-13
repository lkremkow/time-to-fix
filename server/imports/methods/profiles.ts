import { Meteor } from 'meteor/meteor';

import { Sessions } from 'imports/collections/sessions';
import { Session, SessionToken } from 'imports/models/sessions';

import { Profiles } from 'imports/collections/profiles';
import { Profile } from 'imports/models/profiles';

import { ValidSectors } from 'imports/collections/valid_sectors';
import { ValidSector } from 'imports/models/valid_sector';

import { Time_To_Fix_Data } from 'imports/collections/time_to_fix_data';
import { Time_To_Fix_Record } from 'imports/models/time_to_fix_record';

Meteor.methods({

  update_profile(session_token_arg: SessionToken, profile_arg: Profile) {
    // console.log("client wanted to update profile", profile_arg);

    if (isNaN(profile_arg.budget)) {
      profile_arg.budget = 0;
    };
    if (isNaN(profile_arg.headcount)) {
      profile_arg.headcount = 0;
    };

    profile_arg.budget = Number(profile_arg.budget);
    profile_arg.headcount = Number(profile_arg.headcount);

    Profiles.update( { 'client_session_id': session_token_arg.client_session_id,
                       'client_user_agent_id': session_token_arg.client_user_agent_id
                     },
                     {
                        $set: { sector: profile_arg.sector,
                                budget: profile_arg.budget,
                                headcount: profile_arg.headcount
                              }
                     }
                   );

    ValidSectors.upsert(
      // selector
      { 'sector': profile_arg.sector },
      // modifier
      { $set: { 'sector': profile_arg.sector }
      }
    );

    Time_To_Fix_Data.update(
      // selector
      { 'client_session_id': session_token_arg.client_session_id,
        'client_user_agent_id': session_token_arg.client_user_agent_id
      },
      // modifier
      { $set: { 'sector': profile_arg.sector,
                'budget': profile_arg.budget,
                'headcount': profile_arg.headcount
              }
      },
      {
        multi: true
      }
    );

  }

})


