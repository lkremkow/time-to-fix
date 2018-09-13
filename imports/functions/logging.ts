import { VisitorLogMessage } from '../models/visitor_log_message';

export function log_visit(arg_client_session_id: string, arg_page_visited: string): void {

  let new_log_entry: VisitorLogMessage  = {
    user_agent: window.navigator.userAgent,
    screen_size: screen.width + 'X' + screen.height,
    page_visited: arg_page_visited,
    client_session_id: arg_client_session_id      
  };

  Meteor.call('log_visit', new_log_entry);

};