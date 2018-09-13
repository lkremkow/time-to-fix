import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { MeteorObservable } from 'meteor-rxjs';

import { StatisticsGlobal } from 'imports/collections/statistics_global';
import { StatisticOfGlobal } from 'imports/models/statistic_of_global';

import { SessionToken } from 'imports/models/sessions';

import { log_visit } from '../../../../imports/functions/logging';

@Component({
  selector: 'home',
  templateUrl: 'home.html',
  styleUrls: ['home.scss']
})

export class Home implements OnInit, OnDestroy {

  session_token: SessionToken;

  global_statistics_subscription: Subscription;
  current_global_statistics: Observable<StatisticOfGlobal[]>;

  constructor() {
    // console.log("Home constructor called");
  };
  
  ngOnInit() {
    // console.log("Home ngOnInit called");

    this.session_token = {
      client_session_id: '',
      client_user_agent_id: ''
    };

    let crypto = require('crypto');
    this.session_token.client_user_agent_id = crypto.createHash('sha256')
                                                    .update(window.navigator.userAgent)
                                                    .digest('hex');    

    if ( typeof window.sessionStorage.getItem("client_session_id") === "undefined" ) {
      // console.log('Home found no client_session_id in window.sessionStorage; establishing one');
      this.establish_client_session_id();      
    } else {
      if ( window.sessionStorage.getItem("client_session_id") === null ) {
        // console.log('Home client_session_id in window.sessionStorage is null; establishing one');
        this.establish_client_session_id();
      } else {
        if ( window.sessionStorage.getItem("client_session_id").length == 32 ) {
          this.session_token.client_session_id = window.sessionStorage.getItem("client_session_id");
        } else {
          // console.log("Home client_session_id in window.sessionStorage is wrong length");
          this.establish_client_session_id();
        };
      };
    };

    this.fetch_global_statistics();

    log_visit(this.session_token.client_session_id, "/");

  };

  ngOnDestroy() {
    // console.log("Home ngOnDestroy called");

    if (this.global_statistics_subscription) {
      this.global_statistics_subscription.unsubscribe();
      // console.log("Home unsubscribed from global statistics");
    };

  };

  private establish_client_session_id(): void {
    Meteor.call('generate_new_session_id', this.session_token.client_user_agent_id, (error, new_client_session_id: string) => {
      if (error) {
        console.log("Home called generate_new_session_id but something went wrong");
        console.log(error);
        // TODO
        // send this to the visit log
      } else {
        this.session_token.client_session_id = new_client_session_id;
        window.sessionStorage.setItem("client_session_id", this.session_token.client_session_id);
        // console.log("Home generate_new_session_id gave us id: " + new_client_session_id);
      };
    });    
  };


  private fetch_global_statistics(): void {
    // console.log("Home subscribing to global statistics");

    this.global_statistics_subscription = MeteorObservable.subscribe('statistics_global').subscribe( () => {
      // console.log("Home subscribed to global statistics");
      this.current_global_statistics = StatisticsGlobal.find( {} );
    });    
  };

};
