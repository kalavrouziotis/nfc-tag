import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ScanErrorCode, ScanStatus } from "../interfaces/scan";
import { ScanService } from "../services/scan.service";

@Component({
  selector: "app-scan",
  templateUrl: "./scan.page.html",
  styleUrls: ["./scan.page.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScanPage implements OnInit, OnDestroy {
  public title: string = null;
  public scanType: string = null;
  public guid: string = null;
  public readerMode$: any;
  public scanning = false;
  public errorOccured = false;
  private scanCompleteEvent: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scanService: ScanService,
    private cd: ChangeDetectorRef
  ) {}

  public ngOnInit() {
    // Get type of scanning (list, new)
    this.scanType = this.route.snapshot.routeConfig.path;

    if (this.scanType === "list") {
      this.title = "Ιστορικό καταγραφών";
    } else {
      this.title = "Προσθήκη καταγραφής";
    }

    // Init variables
    this.initContent();

    // Subscribe to emitted scan results
    this.scanCompleteEvent = this.scanService.scanCompleteEvent.subscribe(
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
    this.scanService.startScan();

    // Apply chnages
    this.cd.detectChanges();
  }

  public stopScan() {
    this.scanning = false;
    this.scanService.stopScan();

    // Apply chnages
    this.cd.detectChanges();
  }

  private handleScanResponse(resp) {
    if (resp.status === ScanStatus.Success) {
      // Get guid
      this.guid = resp.data?.id || null;
      // Navigate
      this.navigateOnSuccess();
    } else {
      if (resp.data?.error === ScanErrorCode.GuidNotValid) {
        this.navigateTo("/not-valid-content");
      } else {
        this.errorOccured = true;
      }

      // Apply chnages
      this.cd.detectChanges();
    }
  }

  private navigateOnSuccess() {
    if (this.scanType === "list") {
      this.navigateTo("/cases/list/" + this.guid);
    } else {
      this.navigateTo("/cases/new/" + this.guid);
    }
  }

  private navigateTo(path) {
    this.router.navigate([path], {
      relativeTo: this.route,
      replaceUrl: true,
    });
  }

  private initContent() {
    this.guid = null;
    this.scanning = false;
    this.errorOccured = false;

    // Apply chnages
    this.cd.detectChanges();
  }

  public ngOnDestroy() {
    if (this.scanCompleteEvent) {
      this.scanCompleteEvent.unsubscribe();
    }
  }
}
