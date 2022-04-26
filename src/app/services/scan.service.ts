import { EventEmitter, Injectable } from "@angular/core";
import { NFC } from "@ionic-native/nfc/ngx";
import { ScanErrorCode, ScanStatus } from "../interfaces/scan";
import { GuidService } from "../utilities/guid-creator.service";

@Injectable({
  providedIn: "root",
})
export class ScanService {
  private readerMode$: any;

  public scanCompleteEvent = new EventEmitter<{ status: string; data: any }>();

  constructor(private nfc: NFC, private guidService: GuidService) {}

  public startScan() {
    // Once the reader mode is enabled, any tags that are scanned are sent to the subscriber
    let flags = this.nfc.FLAG_READER_NFC_A | this.nfc.FLAG_READER_NFC_F;
    this.readerMode$ = this.nfc.readerMode(flags).subscribe(
      (tag) => this.scanSuccess(tag),
      (err) => this.scanError(err)
    );
  }

  public stopScan() {
    // Remove subscription
    if (this.readerMode$) {
      this.readerMode$.unsubscribe();
    }
  }

  private scanSuccess(data) {
    if (!data.ndefMessage) {
      return;
    }
    let payload = data.ndefMessage[0].payload;
    const guid = this.nfc.bytesToString(payload).substring(3);

    // Stop scanning
    this.stopScan();

    if (this.guidService.isGuid(guid)) {
      // Emit result
      this.scanCompleteEvent.emit({
        status: ScanStatus.Success,
        data: { id: guid },
      });
    } else {
      // Emit result
      this.scanCompleteEvent.emit({
        status: ScanStatus.Error,
        data: { error: ScanErrorCode.GuidNotValid },
      });
    }
  }

  private scanError(err) {
    // Stop scanning
    this.stopScan();

    this.scanCompleteEvent.emit({
      status: ScanStatus.Error,
      data: { error: err },
    });
  }
}
