import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.page.html',
  styleUrls: ['./sidemenu.page.scss'],
})
export class SidemenuPage implements OnInit {

  username: string;
  public appPages = [
    { title: 'Accueil', url: '/home/welcome', icon: 'home' },
    { title: 'Les tâches', url: '/home/task', icon: 'file-tray-stacked' }
  ];
  constructor(private auth:AuthService) { }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.username = user.firstName + " " + user.lastName;
    })
  }

}
