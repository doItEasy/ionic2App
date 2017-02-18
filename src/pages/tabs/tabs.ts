import { Component, ViewChild } from '@angular/core';
import { Tabs } from 'ionic-angular';

import { HomePage } from '../home/home';
import { TopicTabPage } from '../topic/topic-tab';

import { NewsPage } from '../news/news';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('mainTabs') tabs:Tabs;

  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = NewsPage;
  tab2Root: any = TopicTabPage;
  tab3Root: any = HomePage;

  constructor() {

  }
}
