import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EraseTagPage } from "./erase-tag.page";

const routes: Routes = [
  {
    path: "",
    component: EraseTagPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EraseTagPageRoutingModule {}
