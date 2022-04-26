import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CasesListPage } from "./list/cases-list.page";
import { CaseAddPage } from "./new/case-add.page";
import { CaseViewPage } from "./view/case-view.page";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/not-found",
    pathMatch: "full",
  },
  {
    path: "list/:guid",
    component: CasesListPage,
  },
  {
    path: "list/:guid/:id",
    component: CaseViewPage,
  },
  {
    path: "new/:guid",
    component: CaseAddPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CasesPageRoutingModule {}
