import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidemenuPage } from './sidemenu.page';

const routes: Routes = [
  {
    path: 'home',
    component: SidemenuPage,
    children: [
      {
        path: 'welcome',
        loadChildren: () => import('../welcome/welcome.module').then( m => m.WelcomePageModule)
      },
      {
        path: 'task',
        loadChildren: () => import('../task/task.module').then( m => m.TaskPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home/welcome',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SidemenuPageRoutingModule {}
