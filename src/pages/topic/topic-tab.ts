import { Component, ViewChild } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { TopicListPage } from '../topic/topic-list';



@Component({
  selector: 'page-topic-tab',
  templateUrl: 'topic-tab.html'
})
export class TopicTabPage {
  tab1Root: any = TopicListPage;

  constructor(public menuCtrl: MenuController) {}
  ionViewDidEnter(){
    this.menuCtrl.swipeEnable(true);
    console.log('viewDidEnter HomePage');
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave HomePage');
    this.menuCtrl.swipeEnable(false);
  }
}
