import { MongoObservable } from 'meteor-rxjs';

import { Session } from '../models/sessions';

export const Sessions = new MongoObservable.Collection<Session>('session_table');