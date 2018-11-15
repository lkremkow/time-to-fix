import { StatisticsGlobal } from 'imports/collections/statistics_global';
import { StatisticOfGlobal } from 'imports/models/statistic_of_global';
import { Time_To_Fix_Data } from 'imports/collections/time_to_fix_data';
import { Time_To_Fix_Record } from 'imports/models/time_to_fix_record';

create_empty_record();

// every 15 minutes we check if we need to update the global statistics
setInterval(Meteor.bindEnvironment(update_statistics_global), 900000);

// Meteor.bindEnvironment(function(error, response, webBodyData)

function update_statistics_global(): void {
  console.log("updating global statistics");
  let time_to_fix_data: Time_To_Fix_Record[] = [];
  time_to_fix_data = Time_To_Fix_Data.find( { } ).fetch();
  console.log("we have items in Time_To_Fix_Data " + time_to_fix_data.length);

  let sum_fix_times_all: number = 0;
  let sum_fix_time_red_5: number = 0;
  let sum_fix_time_red_4: number = 0;
  let sum_fix_time_red_3: number = 0;
  let sum_percent_fixed: number = 0;
  let sum_vulns_per_host: number = 0;

  let number_time_to_fix_records: number = time_to_fix_data.length;
  for (let array_counter: number = 0; array_counter < number_time_to_fix_records; array_counter++) {
    sum_fix_times_all += time_to_fix_data[array_counter]['avg_fix_time_all'];
    sum_fix_time_red_5 += time_to_fix_data[array_counter]['avg_fix_time_red_5'];
    sum_fix_time_red_4 += time_to_fix_data[array_counter]['avg_fix_time_red_4'];
    sum_fix_time_red_3 += time_to_fix_data[array_counter]['avg_fix_time_red_3'];
    sum_percent_fixed += time_to_fix_data[array_counter]['percent_fixed'];
    sum_vulns_per_host += time_to_fix_data[array_counter]['avg_vulns_per_host'];
  };

  let new_global_stat: StatisticOfGlobal = {
    avg_fix_time_all: Math.trunc(sum_fix_times_all / number_time_to_fix_records),
    avg_fix_time_red_5 : Math.trunc(sum_fix_time_red_5 / number_time_to_fix_records),
    avg_fix_time_red_4 : Math.trunc(sum_fix_time_red_4 / number_time_to_fix_records),
    avg_fix_time_red_3 : Math.trunc(sum_fix_time_red_3 / number_time_to_fix_records),
    percent_fixed : Math.trunc(sum_percent_fixed / number_time_to_fix_records),
    avg_vulns_per_host : Math.trunc(sum_vulns_per_host / number_time_to_fix_records),
    number_of_participants : number_time_to_fix_records,
    number_of_visitors : 0,
    last_updated : new Date()
  };

  StatisticsGlobal.insert(new_global_stat);

};

function create_empty_record(): void {
  const number_of_global_statistics = StatisticsGlobal.findOne();

  if ((number_of_global_statistics === undefined) || (number_of_global_statistics !== null))
  {
    const new_global_stat: StatisticOfGlobal = {
      avg_fix_time_all: 0,
      avg_fix_time_red_5 : 0,
      avg_fix_time_red_4 : 0,
      avg_fix_time_red_3 : 0,
      percent_fixed : 0,
      avg_vulns_per_host : 0,
      number_of_participants : 0,
      number_of_visitors : 0,
      last_updated : new Date()
    };
  
    StatisticsGlobal.insert(new_global_stat);
  }
};