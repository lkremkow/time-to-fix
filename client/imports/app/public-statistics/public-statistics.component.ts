import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { MeteorObservable } from 'meteor-rxjs';

import { StatisticsGlobal } from 'imports/collections/statistics_global';
import { StatisticOfGlobal } from 'imports/models/statistic_of_global';

import { log_visit } from '../../../../imports/functions/logging';

@Component({
  selector: 'public-statistics',
  templateUrl: 'public-statistics.html',
  styleUrls: ['public-statistics.scss']
})

export class PublicStatistics implements OnInit, OnDestroy {

  local_session_storage: Storage;

  client_session_id: string;

  global_statistics_subscription: Subscription;
  current_global_statistics: Observable<StatisticOfGlobal[]>;

  constructor() {
    // console.log("PublicStatistics constructor called");
  };

  ngOnInit() {
    // console.log("PublicStatistics ngOnInit called");

    this.local_session_storage = window.sessionStorage;

    if (typeof this.local_session_storage.getItem("client_session_id") === "undefined" ) {
      // console.log('PublicStatistics error had no client_session_id in local_session_storage; creating value');
    } else {
      if ( this.local_session_storage.getItem("client_session_id") === null ) {
        // console.log('PublicStatistics error had no client_session_id in local_session_storage; creating value');
      } else {
        this.client_session_id = this.local_session_storage.getItem("client_session_id");
        // console.log('PublicStatistics info read client_session_id from local_session_storage');
      };
    };

    this.fetch_global_statistics();

    log_visit(this.client_session_id, "/ps");    
  };

  ngOnDestroy() {
    // console.log("PublicStatistics ngOnDestroy called");

    if (this.global_statistics_subscription) {
      this.global_statistics_subscription.unsubscribe();
      // console.log("PublicStatistics unsubscribed from global statistics");
    };    
  };

  private fetch_global_statistics(): void {
    // console.log("PublicStatistics subscribing to global statistics");

    this.global_statistics_subscription = MeteorObservable.subscribe('statistics_global').subscribe( () => {
      // console.log("PublicStatistics subscribed to global statistics");
      this.current_global_statistics = StatisticsGlobal.find( {} );
    });    
  };

};
