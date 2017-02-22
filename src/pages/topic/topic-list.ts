import { Component, ViewChild, NgZone } from '@angular/core';
import {Nav, LoadingController, NavParams, Content, MenuController} from 'ionic-angular';
import { CnodeAPI } from '../../providers/cnodeAPI';
import { Utils } from '../../providers/utils';
import * as Q from 'q';
import { TopicDetailPage } from './topic-detail';


interface TopicParams {
  page?: number;
  tab?: string;
  limit?: number;
  mdrender?: boolean;
}

interface FetchTopicOpts {
  refresh?: boolean;
  loadingMessage?: string;
  params?: any;
}

@Component({
  selector: 'page-topic-list',
  templateUrl: 'topic-list.html'
})
export class TopicListPage {

  @ViewChild('content') content: Content;

  title: string = this.navParams.get('title');
  topicList: any = [];
  topicParams: TopicParams = {
    limit: 20,
    page: 1,
    tab: this.navParams.get('tab')
  }
  onOff: any = {
    canLoadMore: true,
    loadMoreByUser: false
  }
  // segmentsArray = ['all','good','share','ask','job'];
  // segmentModel: string = this.segmentsArray[0];


  constructor(
    public nav: Nav,
    private loadingCtrl: LoadingController,
    private request: CnodeAPI,
    private utils: Utils,
    private ngZone: NgZone,
    private navParams: NavParams
  ) {}

  ionViewDidLoad() {
    this.fetchTopic({
      refresh: true,
      loadingMessage: '加载中...'
    });
  }


  //
  // swipeEvent(event){
  //   console.log(JSON.stringify(event));
  //
  //   //向左滑
  //   if(event.direction==2){
  //     if(this.segmentsArray.indexOf(this.segmentModel)<4){
  //       this.segmentModel = this.segmentsArray[this.segmentsArray.indexOf(this.segmentModel)+1];
  //     }
  //   }
  //   //向右滑
  //   if(event.direction==4){
  //     if(this.segmentsArray.indexOf(this.segmentModel)>0){
  //       this.segmentModel = this.segmentsArray[this.segmentsArray.indexOf(this.segmentModel)-1];
  //     }
  //   }
  //
  //   this.fetchTopic({
  //     refresh: true,
  //     loadingMessage: '加载中...',
  //     params:{
  //       limit: 20,
  //       page: 1,
  //       tab: this.segmentModel
  //     }
  //   });
  // }



  scrollToTop(): Promise<any> {
    return this.content.scrollToTop();
  }

  navToDetailPage(topic) {
    this.nav.push(TopicDetailPage, {
      topic: Object.assign({}, topic, { content: '' })
    });
  }


  fetchTopic(opts: FetchTopicOpts = {}): Q.Promise<any>  {
    let loader;
    let pageBackup = this.topicParams.page;
    if (opts.loadingMessage) {
      loader = this.loadingCtrl.create({
        content: opts.loadingMessage
      });
    }
    return Q.when(loader ? loader.present() : null)
    .then(() => {
      if (opts.refresh) { this.topicParams.page = 1; }
      return  this.request.get('/topics', opts.params || this.topicParams);
    })
    .then(res => {
      this.ngZone.run(() => {
        this.topicList = opts.refresh ? res : this.topicList.concat(res);
        this.onOff.canLoadMore = true;
      });
    })
    .catch(err => {
      if (err.status === -1 && (!this.topicList || !this.topicList.length)) {
        this.onOff.showReload = true;
      }
      if (err.status === 404) {
        this.utils.toast({ message: '没有更多主题了' });
      }
      if (opts.refresh) {
        this.topicList.page = pageBackup;
      }
      return Q.reject(err);
    })
    .finally(() => loader && loader.dismiss());
  }

  loadMore(infiniteScroll?) {
    this.topicParams.page ++;
    let fetchParams = {};
    if (!infiniteScroll) {
      fetchParams['loadingMessage'] = '加载中...';
    }
    this.fetchTopic(fetchParams)
      .then(() => {
        this.onOff.loadMoreByUser = false;
      })
      .catch(err => {
        (this.topicParams.page > 1) && this.topicParams.page --;
        if (err.status !== 404) {
          this.onOff.loadMoreByUser = true;
        }
      })
      .finally(() => {
        this.ngZone.run(() => {
          infiniteScroll && infiniteScroll.complete();
        });
      });
  }

  refresh(refresher) {
    this.fetchTopic({
      refresh: true
    })
    .finally(() => {
      this.ngZone.run(() => {
        refresher.complete();
      });
    });
  }

}
