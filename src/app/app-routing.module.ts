import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileManagerComponent } from './file-explorer/file-manager.component';

const routes: Routes = [
  {
    path: 'files',
    component: FileManagerComponent
  },
  {
    path: '',
    redirectTo: '/files',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
