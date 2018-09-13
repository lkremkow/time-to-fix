import { MongoObservable } from 'meteor-rxjs';

import { Statistic_On_Fixed } from '../models/statistic_on_fixed';

export const Statistics_On_Fixed = new MongoObservable.Collection<Statistic_On_Fixed>('statistics_on_fixed_detections');