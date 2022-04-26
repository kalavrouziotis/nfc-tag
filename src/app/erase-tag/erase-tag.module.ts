import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { EraseTagPageRoutingModule } from "./erase-tag-routing.module";
import { EraseTagPage } from "./erase-tag.page";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, EraseTagPageRoutingModule],
  declarations: [EraseTagPage],
})
export class EraseTagPageModule {}
