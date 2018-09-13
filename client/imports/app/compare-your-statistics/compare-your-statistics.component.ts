import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, Subject } from 'rxjs';

import { MeteorObservable } from 'meteor-rxjs';
import 'rxjs/add/operator/combineLatest';

import { Time_To_Fix_Data } from 'imports/collections/time_to_fix_data';
import { Time_To_Fix_Record } from 'imports/models/time_to_fix_record';

import { ValidSectors } from 'imports/collections/valid_sectors';
import { ValidSector } from 'imports/models/valid_sector';

@Component({
  selector: 'compare-your-statistics',
  templateUrl: 'compare-your-statistics.html',
  styleUrls: ['compare-your-statistics.scss']
})

export class CompareYourStatistics implements OnInit, OnDestroy {

  @Input("comparison_selector") comparison_selector: string = null;

  comparison_statistics_subscription: Subscription;
  current_comparison_statistics: Observable<Time_To_Fix_Record[]>; 

  valid_sector_subscription: Subscription;
  valid_sectors: Observable<ValidSector[]>;

  selected_sector: string;
  selected_budget_range: string;
  selected_headcount_range: string;

  constructor() {
    // console.log("CompareYourStatistics constructor called");
  };

  ngOnInit() {
    // console.log("CompareYourStatistics ngOnInit called");
    this.selected_sector = "";
    this.selected_budget_range = "";
    this.selected_headcount_range = "";
    this.fetch_valid_sectors();
    this.fetch_comparison_statistics();
  };

  ngOnDestroy() {
    // console.log("CompareYourStatistics ngOnDestroy called");
    if (this.comparison_statistics_subscription) {
      this.comparison_statistics_subscription.unsubscribe();
      // console.log("CompareYourStatistics unsubscribed from comparison statistics feed");
    };

    if (this.valid_sector_subscription) {
      this.valid_sector_subscription.unsubscribe();
      // console.log("CompareYourStatistics unsubscribed from valid_sector_subscription");
    };

  };

  private fetch_comparison_statistics(): void {

    this.comparison_statistics_subscription = MeteorObservable.subscribe('comparison_time_to_fix_records').subscribe( () => {
      this.current_comparison_statistics = Time_To_Fix_Data.find( {}, {
        sort: {'avg_fix_time_all': 1}
        } );
    });

    // if (arg_comparison_selector == "budget") {
    //   this.comparison_statistics_subscription = MeteorObservable.subscribe('statistics_by_budget').subscribe( () => {
    //     console.log("CompareYourStatistics subscribed to comparison statistics feed: " + arg_comparison_selector);
    //     this.current_comparison_statistics = StatisticsByBudget.find( {} );
    //   });
    // } else if (arg_comparison_selector == "headcount") {
    //   this.comparison_statistics_subscription = MeteorObservable.subscribe('statistics_by_headcount').subscribe( () => {
    //     console.log("CompareYourStatistics subscribed to comparison statistics feed: " + arg_comparison_selector);
    //     this.current_comparison_statistics = StatisticsByHeadcount.find( {} );
    //   });      
    // } else if (arg_comparison_selector == "sector") {
    //   this.comparison_statistics_subscription = MeteorObservable.subscribe('statistics_by_sector').subscribe( () => {
    //     console.log("CompareYourStatistics subscribed to comparison statistics feed: " + arg_comparison_selector);
    //     this.current_comparison_statistics = StatisticsBySector.find( {} );
    //   });

    // };
  
  };

  private filterCriteriaChanged(event_arg: string) {
    // console.log("filter criteria changed");

    //unsubscribe to remove existing query
    if (this.comparison_statistics_subscription) {
      // console.log("unsubscribing from comparison_statistics_subscription");
      this.comparison_statistics_subscription.unsubscribe();
    };

    if ((this.selected_sector === "") && 
        (this.selected_budget_range === "") && 
        (this.selected_headcount_range === "")) {
        // default - show everything
        this.comparison_statistics_subscription = MeteorObservable.subscribe('comparison_time_to_fix_records').subscribe( () => {
          this.current_comparison_statistics = Time_To_Fix_Data.find( {}, {
            sort: {'avg_fix_time_all': 1}
            } );
        });
    } else {

      let filter_criteria: any = new Object();

      if (this.selected_sector !== "") {
        filter_criteria.sector = this.selected_sector;
      };

      if (this.selected_budget_range === "1") {
        filter_criteria.budget = { $lte: 999999 };
      } else if (this.selected_budget_range === "2") {
        filter_criteria.budget = { $gt: 999999, $lte: 10000000 };
      } else if (this.selected_budget_range === "3") {
        filter_criteria.budget = { $gt: 10000000, $lte: 100000000 };
      } else if (this.selected_budget_range === "4") {
        filter_criteria.budget = { $gt: 100000000 };
      };      

      if (this.selected_headcount_range === "1") {
        filter_criteria.headcount = { $lte: 999 };
      } else if (this.selected_headcount_range === "2") {
        filter_criteria.headcount = { $gt: 999, $lte: 9999 };
      } else if (this.selected_headcount_range === "3") {
        filter_criteria.headcount = { $gt: 9999, $lte: 99999 };
      } else if (this.selected_headcount_range === "4") {
        filter_criteria.headcount = { $gt: 99999 };
      };  

      this.comparison_statistics_subscription = MeteorObservable.subscribe('comparison_time_to_fix_records').subscribe( () => {
        this.current_comparison_statistics = Time_To_Fix_Data.find( filter_criteria, {
          sort: {'avg_fix_time_all': 1}
          } );
      });

    };

  }

  private fetch_valid_sectors(): void {
    this.valid_sector_subscription = MeteorObservable.subscribe('valid_sectors').subscribe( () => {
      this.valid_sectors = ValidSectors.find( {}, {
        sort: {'sector': 1}
        } );
    });

  };

};
