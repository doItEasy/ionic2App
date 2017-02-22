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
      "direction"        : "right", // 'left|right|up|down', default 'left' (which is like 'next')
      "duration"         :  250, // in milliseconds (ms), default 400
      "slowdownfactor"   :    -1, // overlap views (higher number is more) or no overlap (1). -1 doesn't slide at all. Default 4
      "slidePixels"      :   -1, // optional, works nice with slowdownfactor -1 to create a 'material design'-like effect. Default not set so it slides the entire page.
      "iosdelay"         :  100, // ms to wait for the iOS webview to update before animation kicks in, default 60
      "androiddelay"     :  150, // same as above but for Android, default 70
      "winphonedelay"    :  250, // same as above but for Windows Phone, default 200,
      "fixedPixelsTop"   :    0, // the number of pixels of your fixed header, default 0 (iOS and Android)
      "fixedPixelsBottom":   0  // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
    };

    NativePageTransitions.slide(options)
      .then( (msg) => console.log(msg) )
      .catch( (err) => console.log(err));
    this.menuCtrl.swipeEnable(true);
  }

  ionViewDidLoad() {
    let options: NativeTransitionOptions = {
      "direction"        : "left", // 'left|right|up|down', default 'left' (which is like 'next')
      "duration"         :  250, // in milliseconds (ms), default 400
      "slowdownfactor"   :    -1, // overlap views (higher number is more) or no overlap (1). -1 doesn't slide at all. Default 4
      "slidePixels"      :   -1, // optional, works nice with slowdownfactor -1 to create a 'material design'-like effect. Default not set so it slides the entire page.
      "iosdelay"         :  100, // ms to wait for the iOS webview to update before animation kicks in, default 60
      "androiddelay"     :  150, // same as above but for Android, default 70
      "winphonedelay"    :  250, // same as above but for Windows Phone, default 200,
      "fixedPixelsTop"   :    0, // the number of pixels of your fixed header, default 0 (iOS and Android)
      "fixedPixelsBottom":   0  // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
    };

    NativePageTransitions.slide(options)
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
