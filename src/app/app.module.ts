import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { ParamDetailsComponent } from './params/param-details/param-details.component';
import { ParamListComponent } from './params/param-list/param-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ParamDetailsComponent,
    ParamListComponent
  ],
  imports: [
    BrowserModule,
    UiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
