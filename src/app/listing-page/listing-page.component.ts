import { LoadingRegistrationsAction } from "./../actions/registration.action";
import { AppState } from "./../models/app-state";
import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { Registration } from "../models/registration.model";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: "app-listing-page",
  templateUrl: "./listing-page.component.html",
  styleUrls: ["./listing-page.component.scss"]
})
export class ListingPageComponent implements OnInit {
  Registrations: Registration[];
  displayedColumns: string[] = [
    "firstname",
    "lastname",
    "mobile",
    "email",
    "date",
    "address"
  ];
  dataSource;
  dataSourceBK;

  toFormControl = new FormControl("", [Validators.required]);
  fromFormControl = new FormControl("", [Validators.required]);

  registrations$: Observable<Array<Registration>>;
  loading$: Observable<boolean>;
  error$: Observable<Error>;

  applyFilter() {
    if (!(this.fromFormControl.value == "" && this.toFormControl.value == "")) {
      const filterValue = this.fromFormControl.value;
      this.dataSource.filter = filterValue;
    }
  }

  constructor(private store: Store<AppState>) {
    this.registrations$ = this.store.select(
      store => store.registration.registrations
    );
    this.loading$ = this.store.select(store => store.registration.loading);
    this.error$ = this.store.select(store => store.registration.error);
    this.store.dispatch(new LoadingRegistrationsAction());
    this.registrations$.subscribe(data => {
      this.Registrations = data;
      this.dataSource = new MatTableDataSource(this.Registrations);
      this.dataSourceBK = new MatTableDataSource(this.Registrations);
    });
  }

  ngOnInit() {
    this.dataSource.filterPredicate = (data: Registration, filter: string) =>
      new Date(data.date) >= new Date(this.fromFormControl.value) &&
      new Date(data.date) <= new Date(this.toFormControl.value);
  }

  clear() {
    this.fromFormControl.setValue("");
    this.toFormControl.setValue("");
    this.dataSource = this.dataSourceBK;
  }
}
