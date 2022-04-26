import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { SetTagPageRoutingModule } from "./set-tag-routing.module";
import { SetTagPage } from "./set-tag.page";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SetTagPageRoutingModule],
  declarations: [SetTagPage],
})
export class SetTagPageModule {}
