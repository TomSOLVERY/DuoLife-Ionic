import { Component, OnInit } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsMapTypeId,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';
import { ActionSheetController, Platform, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {

  map: GoogleMap;
  constructor(
    public alertController: AlertController,
    public actionCtrl: ActionSheetController,
    private platform: Platform 
  ) { 
    if(this.platform.is('cordova')){
      this.loadMap();
    }
  }

  ngOnInit() {
  }

  loadMap() {
    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: '***API KEY GOOGLE***',
      API_KEY_FOR_BROWSER_DEBUG: '***API KEY GOOGLE***'
    });
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: 45.441  ,
          lng: 4.39
        },
        zoom: 12,
        tilt: 30
      }
    });
  }

}
