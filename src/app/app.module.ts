import { RegistrationAction } from "./actions/registration.action";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RegistrationPageComponent } from "./registration-page/registration-page.component";
import { ListingPageComponent } from "./listing-page/listing-page.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatDividerModule,
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
  MatCardModule,
  MatTableModule
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { RegistrationReducer } from "./reducers/registration.reducer";
import { EffectsModule } from "@ngrx/effects";
import { HttpClientModule } from "@angular/common/http";
import { RegistrationEffects } from './effects/registration.effects';

@NgModule({
  declarations: [AppComponent, RegistrationPageComponent, ListingPageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatCardModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatTableModule,
    HttpClientModule,
    StoreModule.forRoot({
      registration: RegistrationReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([RegistrationEffects])
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
