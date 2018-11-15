import 'zone.js';
import 'core-js/es7/reflect';

import { Meteor } from 'meteor/meteor';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './imports/app/app.module';

Meteor.startup(() => {

  enableProdMode();

  platformBrowserDynamic().bootstrapModule(AppModule);

});
