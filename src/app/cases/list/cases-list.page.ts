import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IonItemSliding, LoadingController } from "@ionic/angular";
import _ from "lodash";
import { Subscription } from "rxjs";
import { CasesService } from "../cases.service";

@Component({
  selector: "app-cases-list",
  templateUrl: "./cases-list.page.html",
  styleUrls: ["./cases-list.page.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CasesListPage implements OnInit {
  public guid: string = null;
  loadedCases: any[] = [];
  isLoading = false;
  private bookingSub: Subscription;

  constructor(
    private casesService: CasesService,
    private loadingCtrl: LoadingController,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
    this.isLoading = true;
  }

  ngOnInit() {}

  async ionViewWillEnter() {
    this.guid = this.route.snapshot.paramMap.get("guid");
    await this.fetchCases(this.guid);
  }

  ionViewDidLeave() {
    this.loadedCases = [];
    // Apply changes
    this.cd.detectChanges();
  }

  private async fetchCases(tagId: string) {
    // this.isLoading = true;
    const cases = await this.casesService.fetchCases(tagId);
    this.loadedCases = [].concat(cases);
    this.isLoading = false;
    // Apply changes
    this.cd.detectChanges();
  }

  onRemoveCase(caseId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    this.loadingCtrl
      .create({ message: "Διαγραφή καταχώρησης..." })
      .then(async (loadingEl) => {
        loadingEl.present();

        const updatedCase: any = await this.casesService.deleteCase(caseId);

        setTimeout(() => {
          if (updatedCase && updatedCase.completed) {
            const idx = _.findIndex(this.loadedCases, { _id: updatedCase._id });
            if (idx !== -1) {
              this.loadedCases.splice(idx, 1);
            }

            // Apply changes
            this.cd.detectChanges();

            loadingEl.dismiss();
          }
        }, 1500);
      });
  }

  onCreateOffer() {
    this.navigateTo("/cases/new/" + this.guid);
  }

  private navigateTo(path) {
    this.router.navigate([path], {
      relativeTo: this.route,
      replaceUrl: true,
    });
  }

  ngOnDestroy() {
    // if (this.bookingSub) {
    //   this.bookingSub.unsubscribe();
    // }
  }
}
