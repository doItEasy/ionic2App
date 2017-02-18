import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TopicListPage } from '../pages/topic/topic-list';
import { TopicDetailPage } from '../pages/topic/topic-detail';
import { TopicTabPage } from '../pages/topic/topic-tab';
import { NewsPage } from '../pages/news/news';
import { NewsContentPage } from '../pages/news/news-content/news-content';
import { MePage } from '../pages/me/me';
import { TabsPage } from '../pages/tabs/tabs';
import { ZhiHuAPI } from '../providers/zhihuAPI';
import { CnodeAPI } from '../providers/cnodeAPI';
import { Utils } from '../providers/utils';

@NgModule({
  declarations: [
    MyApp,
    TopicListPage,
    TopicDetailPage,
    TopicTabPage,
    NewsPage,
    NewsContentPage,
    MePage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: true,
      swipeBackEnabled: false,
      platforms: {
        ios: {
          backButtonText: "返回"
        }
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TopicListPage,
    TopicDetailPage,
    TopicTabPage,
    NewsPage,
    NewsContentPage,
    MePage,
    TabsPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ZhiHuAPI,
    CnodeAPI,
    Utils
  ]
})
export class AppModule {}
