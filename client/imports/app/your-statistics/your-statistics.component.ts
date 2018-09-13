import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from "@angular/router";

import { Observable, Subscription } from 'rxjs';
import { MeteorObservable } from 'meteor-rxjs';

import { SessionToken } from 'imports/models/sessions';

import { Time_To_Fix_Data } from 'imports/collections/time_to_fix_data';
import { Time_To_Fix_Record } from 'imports/models/time_to_fix_record';

import { StatisticsGlobal } from 'imports/collections/statistics_global';
import { StatisticOfGlobal } from 'imports/models/statistic_of_global';

@Component({
  selector: 'your-statistics',
  templateUrl: 'your-statistics.html',
  styleUrls: ['your-statistics.scss']
})

export class YourStatistics implements OnInit, OnDestroy {

  session_token: SessionToken;

  time_to_fix_subscription: Subscription;
  your_time_to_fix_statistics: Observable<Time_To_Fix_Record[]>;

  global_statistics_subscription: Subscription;
  // current_global_statistics: Observable<StatisticOfGlobal[]>;  
  current_global_statistics: StatisticOfGlobal;

  constructor( private router: Router ) {
    // console.log("YourStatistics constructor called");
  };

  ngOnInit() {
    // console.log("YourStatistics ngOnInit called");

    this.session_token = {
      client_session_id: '',
      client_user_agent_id: ''
    };

    let crypto = require('crypto');
    this.session_token.client_user_agent_id = crypto.createHash('sha256')
                                                    .update(window.navigator.userAgent)
                                                    .digest('hex');

    if ( typeof window.sessionStorage.getItem("client_session_id") === "undefined" ) {
      // console.log("YourStatistics client_session_id in window.sessionStorage is undefined");
      this.router.navigate(['home']);
    } else {
      if ( window.sessionStorage.getItem("client_session_id") === null ) {
        // console.log("YourStatistics client_session_id in window.sessionStorage is null");
        this.router.navigate(['home']);
      } else {
        if ( window.sessionStorage.getItem("client_session_id").length == 32 ) {
          // console.log("YourStatistics client_session_id read from window.sessionStorage");
          this.session_token.client_session_id = window.sessionStorage.getItem("client_session_id");
          this.fetch_global_statistics();
          this.fetch_your_statistics();
        } else {
          // console.log("YourStatistics client_session_id in window.sessionStorage is wrong length");
          this.router.navigate(['home']);
        };
      };
    };
  };

  ngOnDestroy() {
    // console.log("YourStatistics ngOnDestroy called");
    if (this.time_to_fix_subscription) {
      this.time_to_fix_subscription.unsubscribe();
      // console.log("YourStatistics unsubscribed from global statistics");
    };
    if (this.global_statistics_subscription) {
      this.global_statistics_subscription.unsubscribe();
      // console.log("YourStatistics unsubscribed from global statistics");
    };    
  };

  private fetch_your_statistics(): void {
    // console.log("YourStatistics subscribing to your_time_to_fix_record");

    this.time_to_fix_subscription = MeteorObservable.subscribe('your_time_to_fix_record', this.session_token).subscribe( () => {
      // console.log("YourStatistics subscribed to your_time_to_fix_record");
      this.your_time_to_fix_statistics = Time_To_Fix_Data.find( {} );
    });    
  };

  private fetch_global_statistics(): void {
    this.global_statistics_subscription = MeteorObservable.subscribe('statistics_global').subscribe( () => {
      this.current_global_statistics = StatisticsGlobal.findOne( {} );
    });
  };  

};
