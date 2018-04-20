import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  getClassActive(route): string {
    if (String(window.location.href).indexOf(route) >= 0) {
      return "active"
    }
  }
  

}
