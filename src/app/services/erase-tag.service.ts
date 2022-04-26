import { EventEmitter, Injectable } from "@angular/core";
import { Ndef, NFC } from "@ionic-native/nfc/ngx";
import { ScanStatus } from "../interfaces/scan";
import { GuidService } from "../utilities/guid-creator.service";

@Injectable({
  providedIn: "root",
})
export class EraseTagService {
  private eraseMode$: any;
  public eraseCompleteEvent = new EventEmitter<{ status: string; data: any }>();

  constructor(
    private nfc: NFC,
    private ndef: Ndef,
    private guidService: GuidService
  ) {}

  public erase() {
    // Set listener
    this.nfc
      .enabled()
      .then((x) => this.addEraseListener())
      .catch((err) => this.errorAddEraseTagListener(err));
  }

  public stopErase() {
    // Remove subscription
    if (this.eraseMode$) {
      this.eraseMode$.unsubscribe();
    }
  }

  private addEraseListener() {
    this.eraseMode$ = this.nfc
      .addNdefListener(this.successEventListenerFnc, this.errorEventListenerFnc)
      .subscribe((event) => {
        // erase tag
        this.nfc.erase().then(
          (resp) => this.successEraseNcfTagFnc(resp),
          (error) => this.errorEraseNcfTagFnc(error)
        );
      });
  }

  private errorAddEraseTagListener(err) {
    // Stop scanning for set
    this.stopErase();

    // Emit result
    this.eraseCompleteEvent.emit({
      status: ScanStatus.Error,
      data: { error: err },
    });
  }

  private successEventListenerFnc() {
    console.log("[HRC] - Success: Event listener added");
  }

  private errorEventListenerFnc() {
    console.log("[HRC] - Error");

    // Stop scanning for erase
    this.stopErase();
  }

  private successEraseNcfTagFnc(data) {
    console.log("[HRC] - Tag erased");

    // Stop scanning for erase
    this.stopErase();

    // Emit result
    this.eraseCompleteEvent.emit({
      status: ScanStatus.Success,
      data: null,
    });
  }

  private errorEraseNcfTagFnc(err) {
    console.log("[HRC] - Write failed", err);

    // Stop scanning for erase
    this.stopErase();

    // Emit result
    this.eraseCompleteEvent.emit({
      status: ScanStatus.Error,
      data: { error: err },
    });
  }
}
