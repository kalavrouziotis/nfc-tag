import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ScanPage } from "./scan.page";

const routes: Routes = [
  {
    path: "",
    redirectTo: "list",
    pathMatch: "full",
  },
  {
    path: "list",
    component: ScanPage,
  },
  {
    path: "new",
    component: ScanPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScanPageRoutingModule {}
