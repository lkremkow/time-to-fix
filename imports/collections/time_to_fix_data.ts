import { MongoObservable } from 'meteor-rxjs';

import { Time_To_Fix_Record, Comparison_Time_To_Fix_Record } from '../models/time_to_fix_record';

export const Time_To_Fix_Data = new MongoObservable.Collection<Time_To_Fix_Record>('time_to_fix_data');

// export const Comparison_Time_To_Fix_Data = new MongoObservable.Collection<Comparison_Time_To_Fix_Record>('time_to_fix_data');