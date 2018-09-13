import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { SessionToken } from 'imports/models/sessions';

import { Qualys_API_Access_Parameters } from 'imports/models/qualys_api_access_parameters';

@Component({
  selector: 'login',
  templateUrl: 'login.html',
  styleUrls: ['login.scss']
})

export class LoginComponent implements OnInit {

  session_token: SessionToken;

  api_access_parameters: Qualys_API_Access_Parameters;

  constructor( private router: Router ) {
    // console.log("LoginComponent constructor called");
  };

  ngOnInit() {
    // console.log("LoginComponent ngOnInit called");

    this.session_token = {
      client_session_id: '',
      client_user_agent_id: ''
    };

    if ( typeof window.sessionStorage.getItem("client_session_id") === "undefined" ) {
      // console.log("LoginComponent client_session_id in window.sessionStorage is undefined");
      this.router.navigate(['home']);
    } else {
      if ( window.sessionStorage.getItem("client_session_id") === null ) {
        // console.log("LoginComponent client_session_id in window.sessionStorage is null");
        this.router.navigate(['home']);
      } else {
        if ( window.sessionStorage.getItem("client_session_id").length == 32 ) {
          let crypto = require('crypto');
          this.session_token = {
            client_session_id: window.sessionStorage.getItem("client_session_id"),
            client_user_agent_id: crypto.createHash('sha256').update(window.navigator.userAgent).digest('hex')
          };
        } else {
          // console.log("LoginComponent client_session_id in window.sessionStorage is wrong length");
          this.router.navigate(['home']);
        };
      };
    };
   
    this.reset_login();

  };

  private attempt_login() {

    Meteor.call('attempt_login_on_server', this.api_access_parameters, this.session_token, function(error, result) {
      if (error) {
        console.log("LoginComponent called attempt_login_on_server but something went wrong");
        console.log(error);
        // TODO
        // send this to the visit log
      };     
    });
  };

  private reset_login() {
    this.api_access_parameters = {
      account_username: "",
      account_password: "",
      api_url: ""
    };
  };

};
