import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ScanStatus } from "../interfaces/scan";
import { EraseTagService } from "../services/erase-tag.service";

@Component({
  selector: "app-erase-tag",
  templateUrl: "./erase-tag.page.html",
  styleUrls: ["./erase-tag.page.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EraseTagPage implements OnInit, OnDestroy {
  public title: string = "Διαμόρφωση";
  public guid: string = null;
  public scanning = false;
  public errorOccured = false;
  public successOccured = false;
  private eraseCompleteEvent: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eraseTagService: EraseTagService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Init variables
    this.initContent();

    // Subscribe to emitted scan results
    this.eraseCompleteEvent = this.eraseTagService.eraseCompleteEvent.subscribe(
      (resp) => {
        this.handleScanResponse(resp);
      }
    );

    // Apply chnages
    this.cd.detectChanges();
  }

  public startScan() {
    this.scanning = true;
    this.errorOccured = false;
    this.successOccured = false;
    this.eraseTagService.erase();

    // Apply chnages
    this.cd.detectChanges();
  }

  public stopScan() {
    this.scanning = false;
    this.eraseTagService.stopErase();

    // Apply chnages
    this.cd.detectChanges();
  }

  public returnBack() {
    this.navigateTo("/home");
  }

  private handleScanResponse(resp) {
    if (resp.status === ScanStatus.Success) {
      // Get guid
      this.guid = resp.data?.id || null;
      // Show success screen
      this.successOccured = true;
      this.errorOccured = false;
      this.scanning = false;

      // Apply chnages
      this.cd.detectChanges();
    } else {
      // Show error screen
      this.successOccured = false;
      this.errorOccured = true;
      this.scanning = false;

      // Apply chnages
      this.cd.detectChanges();
    }
  }

  private navigateTo(path) {
    this.router.navigate([path], {
      relativeTo: this.route,
      replaceUrl: true,
    });
  }

  private initContent() {
    this.scanning = false;
    this.errorOccured = false;
    this.successOccured = false;

    // Apply chnages
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    if (this.eraseCompleteEvent) {
      this.eraseCompleteEvent.unsubscribe();
    }
  }
}
