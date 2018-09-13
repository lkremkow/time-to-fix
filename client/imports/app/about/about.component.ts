import { Component, OnInit } from '@angular/core';

import { log_visit } from '../../../../imports/functions/logging'

import { VisitorLogMessage } from '../../../../imports/models/visitor_log_message';

@Component({
  selector: 'about',
  templateUrl: 'about.html',
  styleUrls: ['about.scss']
})

export class AboutComponent implements OnInit {

  local_session_storage: Storage;

  client_session_id: string;

  constructor() {
    // console.log("AboutComponent constructor called");
  };

  ngOnInit() {
    // console.log("AboutComponent ngOnInit called");

    this.local_session_storage = window.sessionStorage;

    if (typeof this.local_session_storage.getItem("client_session_id") === "undefined" ) {
      // console.log('AboutComponent error had no client_session_id in local_session_storage; creating value');
    } else {
      if ( this.local_session_storage.getItem("client_session_id") === null ) {
        // console.log('AboutComponent error had no client_session_id in local_session_storage; creating value');
      } else {
        this.client_session_id = this.local_session_storage.getItem("client_session_id");
        // console.log('AboutComponent info read client_session_id from local_session_storage');
      };
    };

    log_visit(this.client_session_id, "/about");

  };

};
