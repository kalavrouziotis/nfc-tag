import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotValidContentPage } from "./not-valid-content.page";

const routes: Routes = [
  {
    path: "",
    component: NotValidContentPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotValidContentPageRoutingModule {}
