import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, ToastController } from 'ionic-angular';
import { ZhiHuAPI } from '../../../providers/zhihuAPI';
import {NativePageTransitions, NativeTransitionOptions} from 'ionic-native';

declare var YCQQ, Wechat;

@Component({
  selector: 'page-news-content',
  templateUrl: 'news-content.html'
})
export class NewsContentPage {
  id: String;
  content: any;
  hasErr: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public zhiHuAPI: ZhiHuAPI,
    public menuCtrl: MenuController, public toastCtrl: ToastController) {
    this.id = this.navParams.get('id');
    this.menuCtrl.swipeEnable(false);
  }
  ionViewWillLeave() {
    let options: NativeTransitionOptions = {
      "duration"       :  300, // in milliseconds (ms), default 400
      "iosdelay"       :   50, // ms to wait for the iOS webview to update before animation kicks in, default 60
      "androiddelay"   :  100
    };

    NativePageTransitions.fade(options)
      .then( (msg) => console.log(msg) )
      .catch( (err) => console.log(err));
    this.menuCtrl.swipeEnable(true);
  }

  ionViewDidLoad() {
    let options: NativeTransitionOptions = {
      "duration"       :  300, // in milliseconds (ms), default 400
      "iosdelay"       :   50, // ms to wait for the iOS webview to update before animation kicks in, default 60
      "androiddelay"   :  100
    };

    NativePageTransitions.fade(options)
      .then( (msg) => console.log(msg) )
      .catch( (err) => console.log(err));
    this.initData();
  }
  initData() {
    this.hasErr = null;
    this.zhiHuAPI.getZhihuContent(this.id).then(res => {
      this.content = res;
    }, err => {
      this.hasErr = err;
    })
  }
  shareContent(type, content) {
    let that = this;
    switch (type) {
      case 'QQ':
        let QQ = {
          url: content.share_url,
          title: content.title,
          description: "来自Ion2--基于Ionic2的资讯类APP",
          imageUrl: content.images[0],
          appName: "Ion2"
        };
        YCQQ.shareToQQ(function () {
          that.showToast('分享成功');
        }, function (failReason) {
          that.showToast('分享失败');
        }, QQ);
        break;
      case 'Qzone':
        let Qzone = {
          url: content.share_url,
          title: content.title,
          description: "来自Ion2--基于Ionic2的资讯类APP",
          imageUrl: content.images,
          appName: "Ion2"
        };
        YCQQ.shareToQzone(function () {
          that.showToast('分享成功');
        }, function (failReason) {
          that.showToast('分享失败');
        }, Qzone);
        break;
      case 'weixin':
        Wechat.share({
          message: {
            title: content.title,
            description: "来自Ion2--基于Ionic2的资讯类APP",
            thumb: content.images[0],
            mediaTagName: "TEST-TAG-001",
            messageExt: "来自Ion2--基于Ionic2的资讯类APP",
            messageAction: "<action>dotalist</action>",
            media: {
              type: Wechat.Type.WEBPAGE,
              webpageUrl: content.share_url
            }
          },
          scene: Wechat.Scene.SESSION
        }, function () {
          that.showToast('分享成功');
        }, function (failReason) {
          that.showToast('分享失败');
        });
        break;
      case 'friends':
        Wechat.share({
          message: {
            title: content.title,
            description: "来自Ion2--基于Ionic2的资讯类APP",
            thumb: content.images[0],
            mediaTagName: "TEST-TAG-001",
            messageExt: "来自Ion2--基于Ionic2的资讯类APP",
            messageAction: "<action>dotalist</action>",
            media: {
              type: Wechat.Type.WEBPAGE,
              webpageUrl: content.share_url
            }
          },
          scene: Wechat.Scene.TIMELINE
        }, function () {
          that.showToast('分享成功');
        }, function (failReason) {
          that.showToast('分享失败');
        });
        break;
    }
  }
  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
