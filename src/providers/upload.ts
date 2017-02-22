import { Injectable } from '@angular/core';
import { Camera, CameraOptions, Transfer } from 'ionic-native';
import { ActionSheetController } from 'ionic-angular';

@Injectable()
export class Uploader {
  uploadUrl:String;

  constructor(public actionSheetCtrl:ActionSheetController) {

  }

  open(onSuc){


    let actionSheet = this.actionSheetCtrl.create({
      title: '上传',
      buttons: [
        {
          text: '拍照',
          handler: () => {
            this.takePhoto().then(this.renderImg).then((imageData) => {
              this.upload(imageData).then().catch(error => console.log(error));
              onSuc(imageData);
            }).catch(error => console.log(error));
          }

        },{
          text: '从相册选取',
          handler: () => {

            this.openAlbum().then(this.renderImg).then((imageData) => {
              this.upload(imageData).then().catch(error => console.log(error));
              onSuc(imageData);
            }).catch(error => console.log(error));

          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }


  openAlbum(){
    return new Promise((resolve, reject) => {
      let options:CameraOptions={
        "sourceType":0,
        "destinationType":0,
        "quality":50
      };
      Camera.getPicture(options).then((imageData) => {
        resolve('data:image/jpeg;base64,' + imageData);
      }, (err) => {
        reject(err);
      });
    })

  }

  takePhoto(){
    return new Promise((resolve, reject) => {
      let options:CameraOptions={
        "sourceType":1,
        "destinationType":0,
        "quality":50
      };
      Camera.getPicture(options).then((imageData) => {
        resolve('data:image/jpeg;base64,' + imageData);
      }, (err) => {
        reject(err);
      });
    })
  }



  renderImg(base64){
    return new Promise((resolve, reject) => {
      var image = new Image();
      image.src = base64;
      //图片加载完毕之后进行压缩，然后上传
      if (image.complete) {
        render();
      } else {
        image.onload = render;
      }


      function render() {
        var MaximgW=1000;
        var MaximgH=1000;
        var imageWidth,imageHeight;
        var canvas=document.createElement("canvas");
        if(image.width>image.height)
        {
          imageWidth=MaximgW;
          imageHeight=MaximgH*(image.height/image.width);
        }
        else if(image.width<image.height)
        {
          imageHeight=MaximgH;
          imageWidth=MaximgW*(image.width/image.height);
        }
        else
        {
          imageWidth=MaximgW;
          imageHeight=MaximgH;
        }

        canvas.width=imageWidth;
        canvas.height=imageHeight;

        var con=canvas.getContext('2d');
        con.clearRect(0,0,canvas.width,canvas.height);
        con.drawImage(image,0,0,imageWidth,imageHeight);
        //进行最小压缩
        var ndata = canvas.toDataURL('image/jpeg', 0.5);
        resolve(ndata);
      }


    })
  }




  upload(data){
    return new Promise((resolve, reject) => {
      var fileTransfer = new Transfer();
      var options: any;
      var sign = "crAhB2KYpvBbPWVT5ijqP320hOVhPTEwMDAyNjMxJmI9eWJwaW1nJms9QUtJRFJUdUdTZUhxcUI5a0l1eVNBWVN0ancwQjdlR3ZCSmlVJmU9MTQ5MDM0NjMzNSZ0PTE0ODc3NTQzMzUmcj0xMTE2OTQ2OTMmdT0wJmY9" ;
      var uurl = 'https://web.image.myqcloud.com/photos/v2/10002631/ybpimg/0?sign='+encodeURIComponent(sign);
      options = {
        fileKey: 'filecontent',
        fileName: 'xxxxx.jpg',
        mimeType : 'multipart/form-data',
        httpMethod : 'POST',
        headers: {}
      }


      fileTransfer.upload(data,uurl,options).then((data) => {
        alert(JSON.stringify(data));
        resolve(data);
      },(err) => {
        reject(err);
      })
    })
  }










}
