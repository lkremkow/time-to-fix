import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";

import { Observable, Subscription } from 'rxjs';
import { MeteorObservable } from 'meteor-rxjs';

import { Sessions } from 'imports/collections/sessions';
import { Session, SessionToken } from 'imports/models/sessions';

@Component({
  selector: 'logout',
  templateUrl: 'logout.html',
  styleUrls: ['logout.scss']
})

export class LogoutComponent implements OnInit {

  client_session_id: string;
  user_agent_id: string;

  session_token: SessionToken;
  
  session_status_subscription: Subscription;
  current_session_status: Observable<Session[]>;   

  constructor(private router: Router) {
    // console.log("LogoutComponent constructor called");
  };

  ngOnInit() {
    // console.log("LogoutComponent ngOnInit called");

    this.session_token = {
      client_session_id: '',
      client_user_agent_id: ''
    };

    if ( typeof window.sessionStorage.getItem("client_session_id") === "undefined" ) {
      console.log("LogoutComponent client_session_id in window.sessionStorage is undefined");
      this.router.navigate(['home']);
    } else {
      if ( window.sessionStorage.getItem("client_session_id") === null ) {
        console.log("LogoutComponent client_session_id in window.sessionStorage is null");
        this.router.navigate(['home']);
      } else {
        if ( window.sessionStorage.getItem("client_session_id").length == 32 ) {
          this.client_session_id = window.sessionStorage.getItem("client_session_id");
          let crypto = require('crypto');
          this.session_token = {
            client_session_id: window.sessionStorage.getItem("client_session_id"),
            client_user_agent_id: crypto.createHash('sha256').update(window.navigator.userAgent).digest('hex')
          };
          this.fetch_session_status();
        } else {
          // console.log("LogoutComponent client_session_id in window.sessionStorage is wrong length");
          this.router.navigate(['home']);
        };
      };
    };    
  };

  private fetch_session_status(): void {
    // console.log("LogoutComponent subscribing to session status");

    this.session_status_subscription = MeteorObservable.subscribe('active_session', this.session_token).subscribe( () => {
      // console.log("LogoutComponent subscribed to session status");
      this.current_session_status = Sessions.find( {} );
    });    
  };  

  private logout(): void {
    Meteor.call('attempt_logout_on_server', this.session_token, function(error, result) {
      if (error) {
        console.log("LogoutComponent called attempt_logout_on_server but something went wrong");
        console.log(error);
        // TODO
        // send this to the visit log
      };
    });
  };

  private delete_participant_data(): void {
    Meteor.call('delete_participant_data', this.session_token, function(error, result) {
      if (error) {
        console.log("LogoutComponent called delete_participant_data but something went wrong");
        console.log(error);
        // TODO
        // send this to the visit log
      };
    });
  };

};
