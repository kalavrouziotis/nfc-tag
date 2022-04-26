import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetTagPage } from './set-tag.page';


const routes: Routes = [
  {
    path: '',
    component: SetTagPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetTagPageRoutingModule {}
