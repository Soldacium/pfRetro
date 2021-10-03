import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@user/user.module').then(m =>
      m.UserModule
    )
  },
  {
    path: 'admin',
    loadChildren: () => import('@admin/admin.module').then(m =>
      m.AdminModule
    )
  },
  {
    path: 'doodles',
    loadChildren: () => import('@doodles/doodles.module').then(m =>
      m.DoodlesModule
    )
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
