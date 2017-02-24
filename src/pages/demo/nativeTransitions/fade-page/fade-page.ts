import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from 'ionic-native';
import aa from 'moment';



@Component({
  selector: 'page-fade-page',
  templateUrl: 'fade-page.html'
})
export class FadePage {
  date:any;
  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    let options: NativeTransitionOptions = {
        "duration"       :  200, // in milliseconds (ms), default 400
        "iosdelay"       :   50, // ms to wait for the iOS webview to update before animation kicks in, default 60
        "androiddelay"   :  100
      };

      NativePageTransitions.fade(options)
        .then( (msg) => console.log(msg) )
        .catch( (err) => console.log(err));


    this.date = aa().add(1, 'd').format('YYYY年MM月DD日')

    console.log(this.date)


  }

  ionViewWillLeave() {
    let options: NativeTransitionOptions = {
        "duration"       :  200, // in milliseconds (ms), default 400
        "iosdelay"       :   50, // ms to wait for the iOS webview to update before animation kicks in, default 60
        "androiddelay"   :  100
      };

      NativePageTransitions.fade(options)
        .then( (msg) => console.log(msg) )
        .catch( (err) => console.log(err));
  }

}
