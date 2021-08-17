import { CursorError } from '@angular/compiler/src/ml_parser/lexer';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { isEmpty } from 'rxjs/operators';
import { Task } from 'src/app/models/task';
import { TaskPageModule } from '../task.module';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
})
export class AddTaskPage implements OnInit {

  task: Task;
  dayNames: any;
  dayShortNames: any;
  monthNames: any;
  monthShortNames: any;
  constructor(private router: Router, private afs: AngularFirestore, private toaster:ToastController,  private loadingCtrl: LoadingController) { 
    this.dayNames = ["Dimanche","Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    this.monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    this.dayShortNames= ["dim","lun","mar","mer","jeu","ven","sam"];
    this.task = {
      id: "",
      name: "",
      description: "",
      startDate: new Date().toString(),
      endDate: new Date().toString(),
      occurence: 0,
      createdBy: "",
      assignedFor: "",
      localization: "",
      alarm: null
    }
    
  }

  ngOnInit() {
  }

  async addTask(){
    if(this.task.name){
      const loading = await this.loadingCtrl.create({
        spinner : 'crescent',
        showBackdrop: true
      });
      loading.present();
      this.afs.collection("task").doc().set(this.task)
      .then(() => {
        loading.dismiss();
        this.toast("La tâche " + this.task.name + " a été créée avec succès" ,"success");
        this.router.navigate(['/home/task']);
      })
      .catch(error => {
        loading.dismiss();
        this.toast(error.message,"danger");
      });
    }else {
      this.toast("Veuillez compléter le titre de la tâche","danger");
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
