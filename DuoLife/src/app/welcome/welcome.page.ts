import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  username:string;
  constructor(private auth:AuthService) { }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.username = user.firstName + " " + user.lastName;
    })
  }

  logout(){
    this.auth.signOut();
  }

}
