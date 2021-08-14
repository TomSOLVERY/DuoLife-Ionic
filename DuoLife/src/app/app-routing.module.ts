import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { SidemenuPage } from './sidemenu/sidemenu.page';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./sidemenu/sidemenu.module').then(m => m.SidemenuPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'home',
    redirectTo:'/home/welcome',
    pathMatch: "full"
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),

  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
