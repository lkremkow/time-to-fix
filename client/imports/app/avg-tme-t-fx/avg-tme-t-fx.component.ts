import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'avg-tme-t-fx',
  templateUrl: 'avg-tme-t-fx.html',
  styleUrls: ['avg-tme-t-fx.scss']
})

export class AvgTmeTFxComponent implements OnInit {

  session_id: string;
  pseudo_user_id: string;

  local_session_storage: Storage;

  constructor() {
    console.log("AvgTmeTFxComponent constructor called");
  };

  ngOnInit() {
    console.log("AvgTmeTFxComponent ngOnInit called");

    this.local_session_storage = window.sessionStorage;

    if (typeof this.local_session_storage.getItem("session_id") === "undefined" ) {
      this.session_id = "";
      console.log('AvgTmeTFxComponent has no session_id in local_session_storage; setting empty value');
    } else {
      if ( this.local_session_storage.getItem("session_id") === null ) {
        this.session_id = "";
        console.log('AvgTmeTFxComponent has no session_id in local_session_storage; setting empty value');
      } else {
        this.session_id = this.local_session_storage.getItem("session_id");
        console.log('AvgTmeTFxComponent read session_id from local_session_storage');
      };
    };

    if (typeof this.local_session_storage.getItem("pseudo_user_id") === "undefined" ) {
        this.pseudo_user_id = "";
        console.log('AvgTmeTFxComponent has no pseudo_user_id in local_session_storage; setting empty value');
      } else {
      if ( this.local_session_storage.getItem("pseudo_user_id") === null ) {
        this.pseudo_user_id = "";
        console.log('AvgTmeTFxComponent has no pseudo_user_id in local_session_storage; setting empty value');
      } else {
        this.pseudo_user_id = this.local_session_storage.getItem("pseudo_user_id");
        console.log('AvgTmeTFxComponent read pseudo_user_id from local_session_storage');

      };

    };

    this.fetch_avg_tme__fx_data();

  };

  ngOnDestroy() {
    console.log("AvgTmeTFxComponent ngOnDestroy called");

  };

  private fetch_avg_tme__fx_data(): void {

  };


};
