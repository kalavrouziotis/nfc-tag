import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { NotValidContentPageRoutingModule } from "./not-valid-content-routing.module";
import { NotValidContentPage } from "./not-valid-content.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotValidContentPageRoutingModule,
  ],
  declarations: [NotValidContentPage],
})
export class NotValidContentPageModule {}
