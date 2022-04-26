import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ScanStatus } from "../interfaces/scan";
import { SetTagService } from "../services/set-tag.service";

@Component({
  selector: "app-set-tag",
  templateUrl: "./set-tag.page.html",
  styleUrls: ["./set-tag.page.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetTagPage implements OnInit, OnDestroy {
  public title: string = "Επανεγγραφή";
  public guid: string = null;
  public scanning = false;
  public errorOccured = false;
  public successOccured = false;
  private setCompleteEvent: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private setTagService: SetTagService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Init variables
    this.initContent();

    // Subscribe to emitted scan results
    this.setCompleteEvent = this.setTagService.setCompleteEvent.subscribe(
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
    this.setTagService.startScan();

    // Apply chnages
    this.cd.detectChanges();
  }

  public stopScan() {
    this.scanning = false;
    this.setTagService.stopScan();

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
    if (this.setCompleteEvent) {
      this.setCompleteEvent.unsubscribe();
    }
  }
}
