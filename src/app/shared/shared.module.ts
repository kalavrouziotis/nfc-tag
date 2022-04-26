import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { MapModalComponent } from "./map-modal/map-modal.component";
import { ImagePickerComponent } from "./pickers/image-picker/image-picker.component";

@NgModule({
  declarations: [MapModalComponent, ImagePickerComponent],
  imports: [CommonModule, IonicModule],
  exports: [MapModalComponent, ImagePickerComponent],
  entryComponents: [MapModalComponent],
})
export class SharedModule {}
