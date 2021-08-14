import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.page.html',
  styleUrls: ['./sidemenu.page.scss'],
})
export class SidemenuPage implements OnInit {

  public appPages = [
    { title: 'Accueil', url: '/home/welcome', icon: 'home' },
    { title: 'Les tâches', url: '/home/task', icon: 'file-tray-stacked' }
  ];
  constructor() { }

  ngOnInit() {
  }

}
