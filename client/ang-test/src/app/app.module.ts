import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCdtGPc2gg0Wh8UWRWDGDy8ChwLNyB5DnI'
    })
  ],
  providers: [],
  declarations: [
    AppComponent,
  ],
    bootstrap: [ AppComponent ]
})
export class AppModule {} 