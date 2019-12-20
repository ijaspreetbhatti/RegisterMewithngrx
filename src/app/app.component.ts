import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'RegisterMe';

  constructor() {
    let arr: Object[] = [{ firstname: 'Jaspreet', lastname: 'Bhatti', mobile: 8156938196, email: "altairximate@gmail.com", date: "2019-12-12T10:54:29.356", address: "2023 Sector 70 Mohali" }];
    localStorage.setItem('registrations', JSON.stringify(arr));
  }
}
