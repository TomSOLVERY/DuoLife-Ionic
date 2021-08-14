import { CursorError } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/task';
import { TaskPageModule } from '../task.module';

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
  constructor(private router: Router) { 
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
      alarm: new Date
    }
    
  }

  ngOnInit() {
  }

}
