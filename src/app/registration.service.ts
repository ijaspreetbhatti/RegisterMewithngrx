import { Registration } from "./models/registration.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class RegistrationService {
  private URL = "http://localhost:3000/registrations";

  constructor(private http: HttpClient) {}

  getAllRegistrations() {
    return this.http.get<Array<Registration>>(this.URL);
  }

  addRegistration(registration: Registration) {
    return this.http.post(this.URL, registration);
  }

  removeRegistration(email: string) {
    return this.http.delete(this.URL + `?email=${email}`);
  }
}
