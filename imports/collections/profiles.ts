import { MongoObservable } from 'meteor-rxjs';

import { Profile } from '../models/profiles';

export const Profiles = new MongoObservable.Collection<Profile>('profile_table');