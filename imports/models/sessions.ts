export interface Session {
  _id?: string,
  participant_id: string,
  client_session_id: string,
  client_ip_address: string,
  client_user_agent_id: string,
  session_started: Date,
  last_touch: Date,
  status: string
};

export interface SessionToken {
  participant_id?: string,
  client_session_id: string,
  client_user_agent_id: string,
};