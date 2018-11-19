import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { MeteorObservable } from 'meteor-rxjs';

import { Router } from "@angular/router";

import { Sessions } from 'imports/collections/sessions';
import { Session, SessionToken } from 'imports/models/sessions';

import { DataImportStatus } from 'imports/collections/data_import_status';
import { DataImportState } from 'imports/models/data_import_state';

import { log_visit } from '../../../../imports/functions/logging';

@Component({
  selector: 'your-perimeter',
  templateUrl: 'your-perimeter.html',
  styleUrls: ['your-perimeter.scss']
})

export class YourPerimeter implements OnInit, OnDestroy {

  session_token: SessionToken;

  session_status_subscription: Subscription;
  current_session_status: Observable<Session[]>;

  download_progress_subscription: Subscription;
  current_download_progress: Observable<DataImportState[]>;

  constructor(private router: Router) {
    // console.log("YourPerimeter constructor called");
  };

  ngOnInit() {
    // console.log("YourPerimeter ngOnInit called");

    this.session_token = {
      client_session_id: '',
      client_user_agent_id: ''
    };

    if ( typeof window.sessionStorage.getItem("client_session_id") === "undefined" ) {
      // console.log("YourPerimeter client_session_id in window.sessionStorage is undefined");
      this.router.navigate(['home']);
    } else {
      if ( window.sessionStorage.getItem("client_session_id") === null ) {
        // console.log("YourPerimeter client_session_id in window.sessionStorage is null");
        this.router.navigate(['home']);
      } else {
        if ( window.sessionStorage.getItem("client_session_id").length == 32 ) {
          let crypto = require('crypto');
          this.session_token = {
            client_session_id: window.sessionStorage.getItem("client_session_id"),
            client_user_agent_id: crypto.createHash('sha256').update(window.navigator.userAgent).digest('hex')
          };
          this.fetch_session_status();
          this.fetch_download_progress();
        } else {
          // console.log("YourPerimeter client_session_id in window.sessionStorage is wrong length");
          this.router.navigate(['home']);
        };
      };
    };

    log_visit(this.session_token.client_session_id, "/yp");

  };

  ngOnDestroy() {
    // console.log("YourPerimeter ngOnDestroy called");

    if (this.session_status_subscription) {
      this.session_status_subscription.unsubscribe();
      // console.log("YourPerimeter unsubscribed from session_status_subscription");
    };
    if (this.download_progress_subscription) {
      this.download_progress_subscription.unsubscribe();
      console.log("YourPerimeter unsubscribed from download_progress_subscription");
    };      
  };

  private fetch_session_status(): void {
    // console.log("YourPerimeter subscribing to session status");

    this.session_status_subscription = MeteorObservable.subscribe('active_session', this.session_token).subscribe( () => {
      // console.log("YourPerimeter subscribed to session status");
      this.current_session_status = Sessions.find( {} );
    });    
  };

  private fetch_download_progress(): void {
    this.download_progress_subscription = MeteorObservable.subscribe('data_import_status', this.session_token).subscribe( () => {
      this.current_download_progress = DataImportStatus.find( {} );
      console.log("YourPerimeter subscribed to download_progress_subscription");
    });    
  };

  private logout(): void {
    Meteor.call('attempt_logout_on_server', this.session_token, function(error, result) {
      if (error) {
        console.log("YourPerimeter called attempt_logout_on_server but something went wrong");
        console.log(error);
        // TODO
        // send this to the visit log
      };
    });
  };

};
