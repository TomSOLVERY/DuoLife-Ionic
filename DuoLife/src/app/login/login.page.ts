import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { take,map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password:string;

  constructor(private auth : AuthService, private toaster : ToastController, private router:Router) { }

  ngOnInit() {
  }

  signIn(){

    if(this.email && this.password){
      this.auth.signIn(this.email,this.password).then(() => {
        this.password = '';
      });
    } else {
        this.toast("Veuillez entrer votre email et votre mot de passe", "warning");
    }
    
  }

  async toast(message, status){
    const toast = await this.toaster.create({
      message: message,
      color: status,
      position:'top',
      duration:2000
    });
    toast.present();
  }

  
}
