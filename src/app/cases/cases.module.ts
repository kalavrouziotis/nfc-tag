import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { SharedModule } from "../shared/shared.module";
import { CasesPageRoutingModule } from "./cases-routing.module";
import { CasesService } from "./cases.service";
import { CasesListPage } from "./list/cases-list.page";
import { CaseAddPage } from "./new/case-add.page";
import { CaseViewPage } from "./view/case-view.page";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    CasesPageRoutingModule,
    SharedModule,
  ],
  declarations: [CasesListPage, CaseAddPage, CaseViewPage],
  providers: [CasesService],
})
export class CasesPageModule {}
