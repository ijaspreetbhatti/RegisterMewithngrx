import { Registration } from "./../models/registration.model";
import {
  RegistrationAction,
  RegistrationActionTypes
} from "./../actions/registration.action";

export interface RegistrationState {
  registrations: Registration[];
  loading: boolean;
  error: Error;
}

const initialState: RegistrationState = {
  registrations: [],
  loading: false,
  error: undefined
};

export function RegistrationReducer(
  state: RegistrationState = initialState,
  action: RegistrationAction
) {
  switch (action.type) {
    case RegistrationActionTypes.LOAD_REGISTRATIONS:
      return {
        ...state,
        loading: true
      };
    case RegistrationActionTypes.LOAD_REGISTRATIONS_SUCCESS:
      return {
        ...state,
        registrations: action.payload,
        loading: false
      };
    case RegistrationActionTypes.LOAD_REGISTRATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case RegistrationActionTypes.ADD_REGISTRATION:
      return {
        ...state,
        loading: true
      };
    case RegistrationActionTypes.ADD_REGISTRATION_SUCCESS:
      return {
        ...state,
        registrations: [...state.registrations, action.payload],
        loading: false
      };
    case RegistrationActionTypes.ADD_REGISTRATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case RegistrationActionTypes.REMOVE_REGISTRATION:
      return {
        ...state,
        loading: true
      };
    case RegistrationActionTypes.REMOVE_REGISTRATION_SUCCESS:
      return {
        ...state,
        registrations: state.registrations.filter(
          registration => registration.email !== action.payload
        ),
        loading: false
      };
    case RegistrationActionTypes.REMOVE_REGISTRATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}
