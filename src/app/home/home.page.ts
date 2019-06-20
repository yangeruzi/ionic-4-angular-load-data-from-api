import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data: string;

  constructor(private http: HttpClient) {
    this.data = '';
  }

  ionViewWillEnter() {
    // Load the data
    this.prepareDataRequest()
        .subscribe(
            data => {
              // Set the data to display in the template
              this.data = JSON.stringify(data);
            }
        );
  }

  private prepareDataRequest(): Observable<object> {
    // Define the data URL
    const dataUrl = 'https://api.nigelbpeck.com/';
    // Prepare the request
    return this.http.get(dataUrl);
  }

}
