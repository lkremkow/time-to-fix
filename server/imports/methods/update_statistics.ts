import { Meteor } from 'meteor/meteor';

import { Detection_Data } from 'imports/collections/detection_data_points';
// import { Detection_Data_Point } from '../../../imports/models/detection_data_point';

import { Time_To_Fix_Data } from 'imports/collections/time_to_fix_data';
import { Time_To_Fix_Record } from 'imports/models/time_to_fix_record';

import { Sessions } from 'imports/collections/sessions';
import { Session, SessionToken } from 'imports/models/sessions';

Meteor.methods({

  x_update_participant_time_to_fix(session_token_arg: SessionToken) { }

  });

export function update_participant_time_to_fix(session_token_arg: SessionToken) {
  // console.log("call to update stastics for session_id " + session_id_arg);

  // let session_details: Session;
  // session_details = Sessions.findOne( { 'session_id': { $eq: session_id_arg } } );

  // console.log(session_details);

  // if (typeof session_details !== 'undefined') {

    // if (session_details.pseudo_user_id.length > 0) {
      // console.log("trying to count detection data");
      // console.log("session_details is ", session_details);
    
      let total_number_of_detections: number;
      total_number_of_detections = Detection_Data.find({ 'origin': session_token_arg.participant_id }).cursor.count();

      console.log("participant " + session_token_arg.participant_id + " has " + total_number_of_detections + " detections");

      let total_number_of_active_detections: number;
      total_number_of_active_detections = Detection_Data.find( { $and: [
        { 'origin': { $eq: session_token_arg.participant_id } },
        { 'fixed': { $eq: false } }
        ] }
        ).cursor.count();

      let total_number_of_fixed_detections: number;
      total_number_of_fixed_detections = Detection_Data.find( { $and: [
        { 'origin': { $eq: session_token_arg.participant_id } },
        { 'fixed': { $eq: true } }
        ] }
        ).cursor.count();
        
      let fixed_detection_data = Detection_Data.find( { $and: [
        { 'origin': { $eq: session_token_arg.participant_id } },
        { 'fixed': { $eq: true } }
        ] },
        // { fields: { "_id": 0, "origin": 0, "added_on": 0, "qid": 0, "severity": 0, "port": 0, "ssl": 0, "present": 0, "fixed": 0, "ignored": 0, "times_detected": 0, "last_found": 0 } }
        { fields: { "_id": 0, "origin": 0, "added_on": 0, "qid": 0, "port": 0, "ssl": 0, "present": 0, "fixed": 0, "ignored": 0, "times_detected": 0, "last_found": 0 } }
        ).fetch();

      // console.log("array fixed_detection_data length: " + fixed_detection_data.length);
      // console.log("item 0:", fixed_detection_data[0]['first_found']);
      // console.log("item 0:", fixed_detection_data[0]['fixed_as_of']);

      let cumulative_age_all: number = 0;
      let cumulative_age_red_5: number = 0;
      let cumulative_age_red_4: number = 0;
      let cumulative_age_red_3: number = 0;
      let number_of_detections_red_5: number = 0;
      let number_of_detections_red_4: number = 0;
      let number_of_detections_red_3: number = 0;
      for (let array_counter: number = 0; array_counter < fixed_detection_data.length; array_counter++) {
        let first_found: Date = new Date(fixed_detection_data[array_counter]['first_found']);
        let  last_found: Date = new Date(fixed_detection_data[array_counter]['fixed_as_of']);
        let calculated_age: number = last_found.valueOf() - first_found.valueOf();
        cumulative_age_all += calculated_age;

        let detection_severity: string = fixed_detection_data[array_counter]['severity'].toString();
        if ( detection_severity === "5" ) {
          cumulative_age_red_5 += calculated_age;
          number_of_detections_red_5++;
        } else if ( detection_severity === "4" ) {
          cumulative_age_red_4 += calculated_age;
          number_of_detections_red_4++;
        } else if ( detection_severity === "3" ) {
          cumulative_age_red_3 += calculated_age;
          number_of_detections_red_3++;
        };

      };

      let average_age_all: number = 0;
      if ( total_number_of_fixed_detections > 0 ) {
        average_age_all = convert_milliseconds_to_days(cumulative_age_all / total_number_of_fixed_detections);
      };
      average_age_all = Math.trunc(average_age_all);
      
      let average_age_red_5: number = 0;
      if ( number_of_detections_red_5 > 0 ) {
        average_age_red_5 = convert_milliseconds_to_days(cumulative_age_red_5 / number_of_detections_red_5);
      };
      average_age_red_5 = Math.trunc(average_age_red_5);

      let average_age_red_4: number = 0;
      if ( number_of_detections_red_4 > 0) {
        average_age_red_4 = convert_milliseconds_to_days(cumulative_age_red_4 / number_of_detections_red_4);
      };
      average_age_red_4 = Math.trunc(average_age_red_4);
      
      let average_age_red_3: number = 0;
      if ( number_of_detections_red_3 > 0 ) {
        average_age_red_3 = convert_milliseconds_to_days(cumulative_age_red_3 / number_of_detections_red_3);
      };
      average_age_red_3 = Math.trunc(average_age_red_3);

      let percentage_of_vulns_fixed: number = 0;
      if ( total_number_of_detections > 0 ) {
        percentage_of_vulns_fixed = total_number_of_fixed_detections / total_number_of_detections;
        percentage_of_vulns_fixed = percentage_of_vulns_fixed * 1000; // times 1000 so we leave one digit after trunc
        percentage_of_vulns_fixed = Math.trunc(percentage_of_vulns_fixed);
        percentage_of_vulns_fixed = percentage_of_vulns_fixed / 10; // bring it back to the real percentage
      };

      Time_To_Fix_Data.update( { 'participant_id': session_token_arg.participant_id }, { $set: {
        'percent_fixed': percentage_of_vulns_fixed,
        'avg_fix_time_all': average_age_all,
        'avg_fix_time_red_5': average_age_red_5,
        'avg_fix_time_red_4': average_age_red_4,
        'avg_fix_time_red_3': average_age_red_3
        }} );

      // Statistics_On_Fixed.update({ 'origin': participant_id_arg }, new_statistic, { upsert: true});

      // console.log(`there are a total of ${total_number_of_fixed_detections} vulnerabilities that are fixed, which are fixed on average in ${average_age}`)
      // console.log("for pseudo_user_id there are [" + total_number_of_detections + "] total detections, of which [" + total_number_of_active_detections + "] are active and [" + total_number_of_fixed_detections + "] are fixed");
    // };

  // };

    
}

function convert_milliseconds_to_days(milliseconds_arg: number): number {
  let age: number = milliseconds_arg;
  age = age / 1000;      // convert milliseonds to seconds
  age = age / 60;        // convert seconds to minutes
  age = age / 60;        // convert minutes to hours
  age = age / 24;        // convert hours to days
  age = Math.trunc(age); // round down to whole days only
  return age;
};
