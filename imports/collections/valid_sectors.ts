import { MongoObservable } from 'meteor-rxjs';

import { ValidSector } from '../models/valid_sector';

export const ValidSectors = new MongoObservable.Collection<ValidSector>('valid_sectors');