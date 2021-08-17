import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Task } from '../models/task';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage implements OnInit {

  months : Array<String> = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre"];
  currentMonth : String;
  currentYear: number;
  tasks: Observable<Task>;

  constructor(private afs : AngularFirestore, private auth:AuthService) {
    //this.tasks = this.afs.doc<Task>(`task`).valueChanges();
  }

  ngOnInit() {
    this.currentMonth = this.months[new Date().getMonth()];
    this.currentYear = new Date().getUTCFullYear();
  }

  logout(){
    this.auth.signOut();
  }

}
