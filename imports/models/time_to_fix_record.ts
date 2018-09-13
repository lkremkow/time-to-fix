export interface Time_To_Fix_Record {
  _id?: string,
  participant_id: string,
  client_session_id: string,
  client_user_agent_id: string,
  sector: string,
  budget: number,
  headcount: number,
  avg_fix_time_all: number,
  avg_fix_time_red_5: number,
  avg_fix_time_red_4: number,
  avg_fix_time_red_3: number,
  percent_fixed: number,
  avg_vulns_per_host: number,
  hosts_in_scope: number,
  total_vuln_count: number,
  data_as_of : Date
};

export interface Comparison_Time_To_Fix_Record {
  _id: string,
  sector: string,
  budget: number,
  headcount: number,
  avg_fix_time_all: number,
  avg_fix_time_red_5: number,
  avg_fix_time_red_4: number,
  avg_fix_time_red_3: number,
  percent_fixed: number,
  avg_vulns_per_host: number,
  data_as_of : Date 
};