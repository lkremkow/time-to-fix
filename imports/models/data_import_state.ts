export interface DataImportState {
  _id?: string,
  participant_id: string,
  client_session_id: string,
  client_user_agent_id: string,
  started: Date,
  last_update: Date,
  status: string
};