import { MongoObservable } from 'meteor-rxjs';

import { StatisticOfGlobal } from '../models/statistic_of_global';

export const StatisticsByBudget = new MongoObservable.Collection<StatisticOfGlobal>('statistics_by_budget');

export const StatisticsByHeadcount = new MongoObservable.Collection<StatisticOfGlobal>('statistics_by_headcount');

export const StatisticsBySector = new MongoObservable.Collection<StatisticOfGlobal>('statistics_by_sector');

export const StatisticsGlobal = new MongoObservable.Collection<StatisticOfGlobal>('statistics_global');