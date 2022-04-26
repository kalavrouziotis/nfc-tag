import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { HTTP } from "@ionic-native/http/ngx";
import { Ndef, NFC } from "@ionic-native/nfc/ngx";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { IonicStorageModule } from "@ionic/storage";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthGuardService } from "./services/auth-guard.service";
import { AuthService } from "./services/auth.service";
import { DalService } from "./services/dal.service";
import { EraseTagService } from "./services/erase-tag.service";
import { ScanService } from "./services/scan.service";
import { SetTagService } from "./services/set-tag.service";
import { GuidService } from "./utilities/guid-creator.service";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    HttpClientModule,
  ],
  providers: [
    AuthGuardService,
    AuthService,
    DalService,
    ScanService,
    SetTagService,
    EraseTagService,
    GuidService,
    NFC,
    Ndef,
    HTTP,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
