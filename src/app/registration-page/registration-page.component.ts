import { AddRegistrationAction } from "./../actions/registration.action";
import { Store } from "@ngrx/store";
import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material";
import { Router } from "@angular/router";
import { AppState } from "../models/app-state";
import { Observable } from "rxjs";
import { Registration } from "../models/registration.model";
import { v4 as uuid } from "uuid";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "app-registration-page",
  templateUrl: "./registration-page.component.html",
  styleUrls: ["./registration-page.component.scss"]
})
export class RegistrationPageComponent implements OnInit {
  registrations$: Observable<Array<Registration>>;
  loading$: Observable<boolean>;
  error$: Observable<Error>;

  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);
  firstNameFormControl = new FormControl("", [
    Validators.required,
    Validators.pattern("[a-zA-Z. ]*")
  ]);
  lastNameFormControl = new FormControl("", [
    Validators.required,
    Validators.pattern("[a-zA-Z. ]*")
  ]);
  telFormControl = new FormControl("", [
    Validators.required,
    Validators.pattern("[0-9]*"),
    Validators.minLength(10),
    Validators.maxLength(11)
  ]);
  addressFormControl = new FormControl("", [Validators.required]);
  dateTimeFormControl = new FormControl(new Date().toISOString(), [
    Validators.required
    //Validators.pattern("[0-1][0-9]\\/[0-3][0-9]\\/[0-9]{4}, [0-1][0-9]:[0-5][0-9] [paPA][Mm]"),
  ]);

  matcher = new MyErrorStateMatcher();

  isSubmittable = false;

  register() {
    if (
      !(
        this.firstNameFormControl.value == "" &&
        this.lastNameFormControl.value == "" &&
        this.telFormControl.value == "" &&
        this.emailFormControl.value == "" &&
        this.addressFormControl.value == "" &&
        this.dateTimeFormControl.value == ""
      )
    ) {
      var registration: Registration;
      registration = {
        id: uuid(),
        firstname: this.firstNameFormControl.value,
        lastname: this.lastNameFormControl.value,
        mobile: this.telFormControl.value,
        email: this.emailFormControl.value,
        address: this.addressFormControl.value,
        date: this.dateTimeFormControl.value
      };
      this.store.dispatch(new AddRegistrationAction(registration));
      console.log("SAVED");
      this.router.navigate(["/list"]);
    }
  }

  constructor(private router: Router, private store: Store<AppState>) {
    this.registrations$ = this.store.select(
      store => store.registration.registrations
    );
    this.loading$ = this.store.select(store => store.registration.loading);
    this.error$ = this.store.select(store => store.registration.error);
  }

  ngOnInit() {}
}
