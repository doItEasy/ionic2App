import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from 'ionic-native';
declare var echarts;

/*
  Generated class for the FlipPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-flip-page',
  templateUrl: 'flip-page.html'
})
export class FlipPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    let options: NativeTransitionOptions = {
        "direction"      : "up", // 'left|right|up|down', default 'right' (Android currently only supports left and right)
        "duration"       :  800, // in milliseconds (ms), default 400
        "iosdelay"       :   50, // ms to wait for the iOS webview to update before animation kicks in, default 60
        "androiddelay"   :  100,  // same as above but for Android, default 70
        "winphonedelay"  :  150 // same as above but for Windows Phone, default 200
      };

    NativePageTransitions.flip(options)
        .then( (msg) => console.log(msg) )
        .catch( (err) => console.log(err));



    let myChart = echarts.init(document.getElementById('main'));

    let option = {
      title: {
        text: ''
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '邮件营销',
          type: 'line',
          stack: '总量',
          areaStyle: { normal: {} },
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '联盟广告',
          type: 'line',
          stack: '总量',
          areaStyle: { normal: {} },
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '视频广告',
          type: 'line',
          stack: '总量',
          areaStyle: { normal: {} },
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: '直接访问',
          type: 'line',
          stack: '总量',
          areaStyle: { normal: {} },
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: '搜索引擎',
          type: 'line',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          areaStyle: { normal: {} },
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    };


    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

  }

  ionViewWillLeave() {
    let options: NativeTransitionOptions = {
        "direction"      : "down", // 'left|right|up|down', default 'right' (Android currently only supports left and right)
        "duration"       :  800, // in milliseconds (ms), default 400
        "iosdelay"       :   50, // ms to wait for the iOS webview to update before animation kicks in, default 60
        "androiddelay"   :  100,  // same as above but for Android, default 70
        "winphonedelay"  :  150 // same as above but for Windows Phone, default 200
      };

    NativePageTransitions.flip(options)
        .then( (msg) => console.log(msg) )
        .catch( (err) => console.log(err));
  }

}
