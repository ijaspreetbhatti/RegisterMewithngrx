import { Registration } from "./../models/registration.model";
import { Action } from "@ngrx/store";

export enum RegistrationActionTypes {
  LOAD_REGISTRATIONS = "[Registration] Load Registrations",
  LOAD_REGISTRATIONS_SUCCESS = "[Registration] Load Registrations Success",
  LOAD_REGISTRATIONS_FAILURE = "[Registration] Load Registrations Failure",
  ADD_REGISTRATION = "[Registration] Add Registration",
  ADD_REGISTRATION_SUCCESS = "[Registration] Add Registration Success",
  ADD_REGISTRATION_FAILURE = "[Registration] Add Registration Failure",
  REMOVE_REGISTRATION = "[Registration] Remove Registration",
  REMOVE_REGISTRATION_SUCCESS = "[Registration] Remove Registration Success",
  REMOVE_REGISTRATION_FAILURE = "[Registration] Remove Registration Failure"
}

export class LoadingRegistrationsAction implements Action {
  readonly type = RegistrationActionTypes.LOAD_REGISTRATIONS;
}

export class LoadingRegistrationsSuccessAction implements Action {
  readonly type = RegistrationActionTypes.LOAD_REGISTRATIONS_SUCCESS;

  constructor(public payload: Array<Registration>) {}
}

export class LoadingRegistrationsFailureAction implements Action {
  readonly type = RegistrationActionTypes.LOAD_REGISTRATIONS_FAILURE;

  constructor(public payload: Error) {}
}

export class AddRegistrationAction implements Action {
  readonly type = RegistrationActionTypes.ADD_REGISTRATION;

  constructor(public payload: Registration) {}
}

export class AddRegistrationSuccessAction implements Action {
  readonly type = RegistrationActionTypes.ADD_REGISTRATION_SUCCESS;

  constructor(public payload: Registration) {}
}

export class AddRegistrationFailureAction implements Action {
  readonly type = RegistrationActionTypes.ADD_REGISTRATION_FAILURE;

  constructor(public payload: Error) {}
}

export class RemoveRegistrationAction implements Action {
  readonly type = RegistrationActionTypes.REMOVE_REGISTRATION;

  constructor(public payload: string) {}
}

export class RemoveRegistrationSuccessAction implements Action {
  readonly type = RegistrationActionTypes.REMOVE_REGISTRATION_SUCCESS;

  constructor(public payload: string) {}
}

export class RemoveRegistrationFailureAction implements Action {
  readonly type = RegistrationActionTypes.REMOVE_REGISTRATION_FAILURE;

  constructor(public payload: string) {}
}

export type RegistrationAction =
  | LoadingRegistrationsAction
  | LoadingRegistrationsSuccessAction
  | LoadingRegistrationsFailureAction
  | AddRegistrationAction
  | AddRegistrationSuccessAction
  | AddRegistrationFailureAction
  | RemoveRegistrationAction
  | RemoveRegistrationSuccessAction
  | RemoveRegistrationFailureAction;
