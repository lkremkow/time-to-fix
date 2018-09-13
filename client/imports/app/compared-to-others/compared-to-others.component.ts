import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'compared-to-others',
  templateUrl: 'compared-to-others.html',
  styleUrls: ['compared-to-others.scss']
})

export class ComparedToOthers implements OnInit {

  @Input("comparedTo") compared_to: string = null;

  constructor() {
    // console.log("ComparedToOthers constructor called");
  };

  ngOnInit() {
    // console.log("ComparedToOthers ngOnInit called");
  };

};
