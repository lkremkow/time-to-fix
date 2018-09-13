import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { MeteorObservable } from 'meteor-rxjs';

import { Router } from "@angular/router";

import { Sessions } from 'imports/collections/sessions';
import { Session, SessionToken } from 'imports/models/sessions';

import { DataImportStatus } from 'imports/collections/data_import_status';
import { DataImportState } from 'imports/models/data_import_state';

import { Profiles } from 'imports/collections/profiles';
import { Profile } from 'imports/models/profiles';

import { ValidSectors } from 'imports/collections/valid_sectors';
import { ValidSector } from 'imports/models/valid_sector';

import { log_visit } from '../../../../imports/functions/logging';

@Component({
  selector: 'your-profile',
  templateUrl: 'your-profile.html',
  styleUrls: ['your-profile.scss']
})

export class YourProfile implements OnInit, OnDestroy {

  session_token: SessionToken;

  session_status_subscription: Subscription;
  current_session_status: Observable<Session[]>;

  download_progress_subscription: Subscription;
  current_download_progress: Observable<DataImportState[]>;

  profile_subscription: Subscription;
  // current_profile: Observable<Profile[]>;
  current_profile: Profile;

  valid_sector_subscription: Subscription;
  valid_sectors: Observable<ValidSector[]>;

  constructor(private router: Router) {
    // console.log("YourProfile constructor called");
  };

  ngOnInit() {
    // console.log("YourProfile ngOnInit called");

    this.session_token = {
      client_session_id: '',
      client_user_agent_id: ''
    };

    if ( typeof window.sessionStorage.getItem("client_session_id") === "undefined" ) {
      // console.log("YourProfile client_session_id in window.sessionStorage is undefined");
      this.router.navigate(['home']);
    } else {
      if ( window.sessionStorage.getItem("client_session_id") === null ) {
        // console.log("YourProfile client_session_id in window.sessionStorage is null");
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
          this.fetch_profle();
          this.fetch_valid_sectors();
        } else {
          // console.log("YourProfile client_session_id in window.sessionStorage is wrong length");
          this.router.navigate(['home']);
        };
      };
    };

    log_visit(this.session_token.client_session_id, "/profile");

  };

  ngOnDestroy() {
    // console.log("YourProfile ngOnDestroy called");

    if (this.session_status_subscription) {
      this.session_status_subscription.unsubscribe();
      // console.log("YourProfile unsubscribed from session_status_subscription");
    };

    if (this.download_progress_subscription) {
      this.download_progress_subscription.unsubscribe();
      // console.log("YourProfile unsubscribed from download_progress_subscription");
    };

    if (this.profile_subscription) {
      this.profile_subscription.unsubscribe();
      // console.log("YourProfile unsubscribed from profile_subscription");
    };

    if (this.valid_sector_subscription) {
      this.valid_sector_subscription.unsubscribe();
      // console.log("YourProfile unsubscribed from valid_sector_subscription");
    };
  };

  private fetch_session_status(): void {
    // console.log("YourProfile subscribing to session status");

    this.session_status_subscription = MeteorObservable.subscribe('active_session', this.session_token).subscribe( () => {
      // console.log("YourProfile subscribed to session status");
      this.current_session_status = Sessions.find( {} );
    });    
  };

  private fetch_download_progress(): void {
    this.download_progress_subscription = MeteorObservable.subscribe('data_import_status', this.session_token).subscribe( () => {
      this.current_download_progress = DataImportStatus.find( {} );
    });    
  };

  private fetch_profle(): void {
    this.profile_subscription = MeteorObservable.subscribe('current_profile', this.session_token).subscribe( () => {
      this.current_profile = Profiles.findOne( {} );
    });    
  };  

  private fetch_valid_sectors(): void {
    this.valid_sector_subscription = MeteorObservable.subscribe('valid_sectors').subscribe( () => {
      this.valid_sectors = ValidSectors.find( {}, {
        sort: {'sector': 1}
        } );
    });    
  };

  private logout(): void {
    Meteor.call('attempt_logout_on_server', this.session_token, function(error, result) {
      if (error) {
        console.log("YourProfile called attempt_logout_on_server but something went wrong");
        console.log(error);
        // TODO
        // send this to the visit log
      };
    });
  };  

  private updateProfile(): void {
    Meteor.call('update_profile', this.session_token, this.current_profile, function(error, result) {
      if (error) {
        console.log("YourProfile called update_profile on server but something went wrong");
        console.log(error);
        // TODO
        // send this to the visit log
      };
    });
  }; 

};
