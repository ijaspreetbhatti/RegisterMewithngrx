import {
  RegistrationActionTypes,
  LoadingRegistrationsSuccessAction,
  LoadingRegistrationsFailureAction,
  LoadingRegistrationsAction,
  AddRegistrationAction,
  AddRegistrationSuccessAction,
  AddRegistrationFailureAction,
  RemoveRegistrationAction,
  RemoveRegistrationSuccessAction,
  RemoveRegistrationFailureAction
} from "./../actions/registration.action";
import { RegistrationService } from "./../registration.service";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";

import { mergeMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class RegistrationEffects {
  @Effect() loadRegistration$ = this.actions$.pipe(
    ofType<LoadingRegistrationsAction>(
      RegistrationActionTypes.LOAD_REGISTRATIONS
    ),
    mergeMap(() =>
      this.registrationService.getAllRegistrations().pipe(
        map(data => {
          return new LoadingRegistrationsSuccessAction(data);
        }),
        catchError(error => of(new LoadingRegistrationsFailureAction(error)))
      )
    )
  );

  @Effect() addRegistration$ = this.actions$.pipe(
    ofType<AddRegistrationAction>(RegistrationActionTypes.ADD_REGISTRATION),
    mergeMap(data =>
      this.registrationService.addRegistration(data.payload).pipe(
        map(() => {
          return new AddRegistrationSuccessAction(data.payload);
        }),
        catchError(error => of(new AddRegistrationFailureAction(error)))
      )
    )
  );

  @Effect() removeRegistration$ = this.actions$.pipe(
    ofType<RemoveRegistrationAction>(
      RegistrationActionTypes.REMOVE_REGISTRATION
    ),
    mergeMap(data =>
      this.registrationService.removeRegistration(data.payload).pipe(
        map(() => {
          return new RemoveRegistrationSuccessAction(data.payload);
        }),
        catchError(error => of(new RemoveRegistrationFailureAction(error)))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private registrationService: RegistrationService
  ) {}
}
