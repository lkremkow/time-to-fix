import { MongoObservable } from 'meteor-rxjs';

import { DataImportState } from '../models/data_import_state';

export const DataImportStatus = new MongoObservable.Collection<DataImportState>('data_import_status');