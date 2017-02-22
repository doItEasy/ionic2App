import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CustomIconsModule } from 'ionic2-custom-icons';
import { MyApp } from './app.component';


//component
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';
import { AlphaScroll } from '../components/alpha-scroll/alpha-scroll';

//service
import { TabsPage } from '../pages/tabs/tabs';
import { ZhiHuAPI } from '../providers/zhihuAPI';
import { CnodeAPI } from '../providers/cnodeAPI';
import { Utils } from '../providers/utils';
import { ListData } from '../providers/list-data';
import { OrderBy } from '../providers/order-by';
import { Uploader } from '../providers/upload';

//page
import { TopicListPage } from '../pages/topic/topic-list';
import { TopicDetailPage } from '../pages/topic/topic-detail';
import { TopicTabPage } from '../pages/topic/topic-tab';
import { NewsPage } from '../pages/news/news';
import { NewsContentPage } from '../pages/news/news-content/news-content';
import { MePage } from '../pages/me/me';
import { ListPage } from '../pages/demo/nativeTransitions/list';
import { CurlPage } from '../pages/demo/nativeTransitions/curl-page/curl-page';
import { DrawerPage } from '../pages/demo/nativeTransitions/drawer-page/drawer-page';
import { SlidePage } from '../pages/demo/nativeTransitions/slide-page/slide-page'
import { FadePage } from '../pages/demo/nativeTransitions/fade-page/fade-page';
import { FlipPage } from '../pages/demo/nativeTransitions/flip-page/flip-page';
import { FilterBarPage } from '../pages/demo/filter-bar/filter-bar';
import { AlphaScrollPage } from '../pages/demo/alpha-scroll/alpha-scroll';
import { CameraPage } from '../pages/demo/camera/camera';






@NgModule({
  declarations: [
    MyApp,
    TopicListPage,
    TopicDetailPage,
    TopicTabPage,
    NewsPage,
    NewsContentPage,
    MePage,
    ListPage,
    CurlPage,
    DrawerPage,
    SlidePage,
    FlipPage,
    FadePage,
    FilterBarPage,
    AlphaScrollPage,
    ProgressBarComponent,
    AlphaScroll,
    CameraPage,
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
    }),
    CustomIconsModule
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
    ListPage,
    CurlPage,
    DrawerPage,
    SlidePage,
    FlipPage,
    FadePage,
    FilterBarPage,
    AlphaScrollPage,
    CameraPage,
    TabsPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ZhiHuAPI,
    CnodeAPI,
    Utils,
    OrderBy,
    ListData,
    Uploader
  ]
})
export class AppModule {}
