import { MongoObservable } from 'meteor-rxjs';

import { Detection_Data_Point } from '../models/detection_data_point';

export const Detection_Data = new MongoObservable.Collection<Detection_Data_Point>('detection_data');