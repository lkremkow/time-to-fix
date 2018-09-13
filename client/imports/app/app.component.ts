import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.scss' ]
})

export class AppComponent implements OnInit, OnDestroy {
  
  constructor() {
    // console.log("AppComponent constructor called");
  };

  ngOnInit() {
    // console.log("AppComponent ngOnInit called");  
  };

  ngOnDestroy() {
    // console.log("AppComponent ngOnDestroy called");
  };

};
