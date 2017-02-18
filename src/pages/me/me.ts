import { Component, ViewChild } from '@angular/core';

import { NavController, MenuController, Slides } from 'ionic-angular';


@Component({
  selector: 'page-me',
  templateUrl: 'me.html'
})
export class MePage {
  user :any;
  constructor(public navCtrl: NavController,
              public menuCtrl: MenuController) {
    this.user = {
      nickname: "ionic2",
      avatar: 'assets/image/1pic.jpg'
    }
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad MePage');
  }

  ionViewDidEnter(){
    this.menuCtrl.swipeEnable(true);
    console.log('viewDidEnter MePage');
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave MePage');
    this.menuCtrl.swipeEnable(false);
  }




}
