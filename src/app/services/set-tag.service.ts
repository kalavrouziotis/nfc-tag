import { EventEmitter, Injectable } from "@angular/core";
import { Ndef, NFC } from "@ionic-native/nfc/ngx";
import { ScanStatus } from "../interfaces/scan";
import { GuidService } from "../utilities/guid-creator.service";

@Injectable({
  providedIn: "root",
})
export class SetTagService {
  private setterMode$: any;
  public setCompleteEvent = new EventEmitter<{ status: string; data: any }>();

  constructor(
    private nfc: NFC,
    private ndef: Ndef,
    private guidService: GuidService
  ) {}

  public startScan() {
    // Set listener
    this.nfc
      .enabled()
      .then((x) => this.addSetTagListener())
      .catch((err) => this.errorAddSetTagListener(err));
  }

  public stopScan() {
    // Remove subscription
    if (this.setterMode$) {
      this.setterMode$.unsubscribe();
    }
  }

  private addSetTagListener() {
    this.setterMode$ = this.nfc
      .addNdefListener(this.successEventListenerFnc, this.errorEventListenerFnc)
      .subscribe((event) => {
        // Create new guid
        const guid = this.guidService.create();
        // Create an NDEF text record
        const record = this.ndef.textRecord(guid, "en", null);
        // an NDEF message is an array of NDEF records
        const message = [record];

        // write to the tag
        this.nfc.write(message).then(
          (_) => this.successWriteNcfTagFnc(guid),
          (error) => this.errorWriteNcfTagFnc(error)
        );
      });
  }

  private errorAddSetTagListener(err) {
    // Stop scanning for set
    this.stopScan();

    // Emit result
    this.setCompleteEvent.emit({
      status: ScanStatus.Error,
      data: { error: err },
    });
  }

  private successEventListenerFnc() {
    console.log("[HRC] - Success: Event listener added");
  }

  private errorEventListenerFnc() {
    console.log("[HRC] - Error");

    // Stop scanning for set
    this.stopScan();
  }

  private successWriteNcfTagFnc(data) {
    console.log("[HRC] - Wrote unique message guid to tag: " + data);

    // Stop scanning for set
    this.stopScan();

    // Emit result
    this.setCompleteEvent.emit({
      status: ScanStatus.Success,
      data: { id: data },
    });
  }

  private errorWriteNcfTagFnc(err) {
    console.log("[HRC] - Write failed", err);

    // Stop scanning for set
    this.stopScan();

    // Emit result
    this.setCompleteEvent.emit({
      status: ScanStatus.Error,
      data: { error: err },
    });
  }
}
