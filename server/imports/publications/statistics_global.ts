import { Meteor } from 'meteor/meteor';

import { StatisticsByBudget, StatisticsByHeadcount, StatisticsBySector, StatisticsGlobal } from 'imports/collections/statistics_global';

Meteor.publish('statistics_by_budget', function() {
  return StatisticsByBudget.find( {}, {
    // limit: 1,
    sort: {'budget_tranche': -1}
    });
});

Meteor.publish('statistics_by_headcount', function() {
  return StatisticsByHeadcount.find( {}, {
    // limit: 1,
    sort: {'headcount_tranche': -1}
    });
});

Meteor.publish('statistics_by_sector', function() {
  return StatisticsBySector.find( {}, {
    // limit: 1,
    sort: {'sector': -1}
    });
});

Meteor.publish('statistics_global', function() {
  return StatisticsGlobal.find( {}, {
    limit: 1,
    sort: {'last_updated': -1}
    });
});