import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  loading: any;
  data: string;
  error: string;

  constructor(private http: HttpClient, public loadingController: LoadingController) {
    this.data = '';
    this.error = '';
  }

  async ionViewWillEnter() {
    // Present a loading controller until the data is loaded
    await this.presentLoading();
    // Load the data
    this.prepareDataRequest()
        .subscribe(
            data => {
              // Set the data to display in the template
              this.data = JSON.stringify(data);
            },
            err => {
              // Set the error information to display in the template
              this.error = `An error occurred, the data could not be retrieved: Status: ${err.status}, Message: ${err.statusText}`;
            }
        );
  }

  async presentLoading() {
    // Prepare a loading controller
    this.loading = await this.loadingController.create({
      message: 'Loading...'
    });
    // Present the loading controller
    await this.loading.present();
  }

  private prepareDataRequest(): Observable<object> {
    // Define the data URL
    const dataUrl = 'https://api.nigelbpeck.com/';
    // Prepare the request
    return this.http.get(dataUrl);
  }

}
