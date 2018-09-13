import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'page-not-found',
  templateUrl: 'page-not-found.html',
  styleUrls: ['page-not-found.scss']
})

export class PageNotFoundComponent implements OnInit {

  constructor(private router: Router) {
    // console.log("PageNotFoundComponent constructor called for page " + this.router.url);
  };

  ngOnInit() {
    // console.log("PageNotFoundComponent ngOnInit called");
  };

};
