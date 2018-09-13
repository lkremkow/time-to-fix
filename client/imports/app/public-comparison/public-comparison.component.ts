import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { MeteorObservable } from 'meteor-rxjs';

import { StatisticsByBudget, StatisticsByHeadcount, StatisticsBySector } from 'imports/collections/statistics_global';
import { StatisticOfGlobal } from 'imports/models/statistic_of_global';


@Component({
  selector: 'public-comparison',
  templateUrl: 'public-comparison.html',
  styleUrls: ['public-comparison.scss']
})

export class PublicComparison implements OnInit, OnDestroy {

  @Input("comparison_selector") comparison_selector: string = null;

  comparison_statistics_subscription: Subscription;
  current_comparison_statistics: Observable<StatisticOfGlobal[]>; 

  constructor() {
    // console.log("PublicComparison constructor called");
  };

  ngOnInit() {
    // console.log("PublicComparison ngOnInit called");
    this.fetch_comparison_statistics(this.comparison_selector);
  };

  ngOnDestroy() {
    // console.log("PublicComparison ngOnDestroy called");
    if (this.comparison_statistics_subscription) {
      this.comparison_statistics_subscription.unsubscribe();
      // console.log("PublicComparison unsubscribed from comparison statistics feed");
    };     
  };

  private fetch_comparison_statistics(arg_comparison_selector: string): void {
    // console.log("PublicComparison subscribing to comparison statistics feed: " + arg_comparison_selector);

    if (arg_comparison_selector == "budget") {
      this.comparison_statistics_subscription = MeteorObservable.subscribe('statistics_by_budget').subscribe( () => {
        // console.log("PublicComparison subscribed to comparison statistics feed: " + arg_comparison_selector);
        this.current_comparison_statistics = StatisticsByBudget.find( {} );
      });
    } else if (arg_comparison_selector == "headcount") {
      this.comparison_statistics_subscription = MeteorObservable.subscribe('statistics_by_headcount').subscribe( () => {
        // console.log("PublicComparison subscribed to comparison statistics feed: " + arg_comparison_selector);
        this.current_comparison_statistics = StatisticsByHeadcount.find( {} );
      });      
    } else if (arg_comparison_selector == "sector") {
      this.comparison_statistics_subscription = MeteorObservable.subscribe('statistics_by_sector').subscribe( () => {
        // console.log("PublicComparison subscribed to comparison statistics feed: " + arg_comparison_selector);
        this.current_comparison_statistics = StatisticsBySector.find( {} );
      });

    };
  
  };  

};
