import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Injectable()
export class AuthService {

  user$ : Observable<User>;
  user: User;
  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private router: Router,
    private loadingCtrl : LoadingController,
    private toaster :  ToastController
  ) 
  {
    this.user$ = this.afauth.authState
    .pipe(
      switchMap(user => {
        if(user){
          return this.afs.doc<User>(`user/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    )
  }

  async signIn(email, password){
    const loading = await this.loadingCtrl.create({
      message : "Authentification...",
      spinner : 'crescent',
      showBackdrop: true
    });
    loading.present();
    this.afauth.setPersistence(firebase.default.auth.Auth.Persistence.LOCAL).then(() => {
      this.afauth.signInWithEmailAndPassword(email,password).then((data) => {
        if(!data.user.emailVerified){
          loading.dismiss();
          this.toast("Veuillez confirmer le compte via email","warning");
          this.afauth.signOut();
        } else {
          loading.dismiss();
          console.log("Connexion réussite");
          this.router.navigate(['/home/welcome']);
        }
      })
      .catch(error => {
        loading.dismiss();
        if(error.code == "auth/wrong-password"){
          this.toast("Mot de passe invalide","danger");
        } else  if (error.code == "auth/invalid-email"){
          this.toast("Adresse email invalide","danger");
        } else if(error.code == "auth/user-not-found"){
          this.toast("Utilisateur inconnue","danger");
        } else {
          this.toast(error.message,"danger");
        }
        
      })
    })
    .catch(error => {
      loading.dismiss();
      this.toast(error.message,"danger");
    })
  }

  async signOut(){
    const loading = await this.loadingCtrl.create({
      spinner:'crescent',
      showBackdrop: true
    });
    loading.present();
    this.afauth.signOut()
    .then(()=> {
      loading.dismiss();
      this.router.navigate(["/login"]);
    })
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
