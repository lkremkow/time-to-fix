import { Meteor } from 'meteor/meteor';

import { VisitorLog } from '../../../imports/collections/visitor_log';
import { VisitorLogMessage } from '../../../imports/models/visitor_log_message';

Meteor.methods({

  log_visit(passed_message: VisitorLogMessage) {
    passed_message.timestamp = new Date();
    passed_message.client_ip_address = this.connection.clientAddress;    
    VisitorLog.insert(passed_message);
  }

})
