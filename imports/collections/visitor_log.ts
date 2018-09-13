import { MongoObservable } from 'meteor-rxjs';

import { VisitorLogMessage } from '../models/visitor_log_message';

export const VisitorLog = new MongoObservable.Collection<VisitorLogMessage>('visitor_log');