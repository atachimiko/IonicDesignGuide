import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, NgZone } from '@angular/core';
import { Logger, Options as LoggerOptions, Level as LoggerLevel } from "angular2-logger/core";
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MenuPage } from '../pages/menu/menu';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: LoggerOptions, useValue: { level: LoggerLevel.DEBUG } },
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Logger,
  ]
})
export class AppModule {
  constructor(private _logger: Logger
    ,private _ngZone: NgZone)
  {
    _logger.info("アプリケーションの初期化");

    window['angularComponentRef'] = {
      component: this,
      zone: this._ngZone
    };
  }
}
