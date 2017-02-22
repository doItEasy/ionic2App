import { Component } from '@angular/core';
import { Uploader} from '../../../providers/upload';

/*
  Generated class for the Camera page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})
export class CameraPage {

  base64data: String;

  constructor(public uploader: Uploader) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');
  }

  toUpload(){
    var that =this;
    this.uploader.open( (imageData) => {
       that.base64data = imageData;
    });
  }

}
