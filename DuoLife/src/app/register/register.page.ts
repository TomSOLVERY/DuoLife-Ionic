import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  firstname:string;
  name:string;
  email:string;
  password:string;

  constructor(private afauth:AngularFireAuth, private afs : AngularFirestore, private auth:AuthService, private toaster:ToastController,  private loadingCtrl: LoadingController, private router:Router) { }

  ngOnInit() {
  }

  async register(){
    if(this.name && this.firstname && this.email && this.password){
      const loading = await this.loadingCtrl.create({
        message : "Authentification...",
        spinner : 'crescent',
        showBackdrop: true
      });
      loading.present();
      this.afauth.createUserWithEmailAndPassword(this.email,this.password)
      .then((data)=>{
        data.user.sendEmailVerification();
        this.afs.collection("user").doc(data.user.uid).set({
          "userId":data.user.uid,
          "firstName":this.firstname,
          "lastName":this.name,
          "email":this.email,
          "createdAt":Date.now()
        })
        .then(() => {
          loading.dismiss();
          this.toast("Inscription avec succès ! Veuillez confirmer l'inscription via email","success");
          this.router.navigate(['/login']);
        })
        .catch(error => {
          loading.dismiss();
          this.toast(error.message,"danger");
        })
      })
      .catch(error => {
        loading.dismiss();
        this.toast(error.message,"danger");
      })
    } else {
      this.toast("Veuillez compléter tous les champs du formulaire","danger");
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
