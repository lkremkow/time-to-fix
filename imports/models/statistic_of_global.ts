export interface StatisticOfGlobal {
  _id? : string,
  grouped_by?: string,
  avg_fix_time_all : number,
  avg_fix_time_red_5 : number,
  avg_fix_time_red_4 : number,
  avg_fix_time_red_3 : number,
  percent_fixed : number,
  avg_vulns_per_host : number,
  number_of_participants : number,
  number_of_visitors : number,
  last_updated : Date
};
