export interface VisitorLogMessage {
  id_? : string,
  timestamp?: Date,
  client_session_id: string,
  client_ip_address?: string,
  user_agent: string,
  screen_size: string,
  page_visited: string  
};