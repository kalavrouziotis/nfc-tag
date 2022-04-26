import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { CasesService } from "../cases.service";

function base64toBlob(base64Data, contentType) {
  contentType = contentType || "";
  const sliceSize = 1024;
  const byteCharacters = window.atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}

@Component({
  selector: "app-case-add",
  templateUrl: "./case-add.page.html",
  styleUrls: ["./case-add.page.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CaseAddPage implements OnInit {
  public guid: string = null;
  form: FormGroup;
  public lastCase: any;

  constructor(
    private casesService: CasesService,
    private route: ActivatedRoute,
    private router: Router,
    private loadingCtrl: LoadingController,
    private cd: ChangeDetectorRef
  ) {}

  public async ngOnInit() {
    this.guid = this.route.snapshot.paramMap.get("guid");
  }

  async ngAfterViewInit() {
    this.form = new FormGroup({
      firstName: new FormControl(null, {
        updateOn: "change",
        validators: [Validators.required],
      }),
      lastName: new FormControl(null, {
        updateOn: "change",
        validators: [Validators.required],
      }),
      age: new FormControl(null, {
        updateOn: "change",
        validators: [Validators.required, Validators.min(1)],
      }),
      description: new FormControl(null, {
        updateOn: "change",
        validators: [Validators.required, Validators.maxLength(180)],
      }),
    });

    this.lastCase =
      ((await this.casesService.fetchCases(this.guid)) || [])[0] || {};

    this.form.patchValue({
      firstName: this.lastCase.firstName || null,
      lastName: this.lastCase.lastName || null,
      age: this.lastCase.age || null,
    });

    // Apply chnages
    this.cd.detectChanges();
  }

  onImagePicked(imageData: string | File) {
    let imageFile;
    if (typeof imageData === "string") {
      try {
        imageFile = base64toBlob(
          imageData.replace("data:image/jpeg;base64,", ""),
          "image/jpeg"
        );
      } catch (error) {
        console.log(error);
        return;
      }
    } else {
      imageFile = imageData;
    }
    this.form.patchValue({ image: imageFile });
  }

  onBack() {
    this.navigateTo("/cases/list/" + this.guid);
  }

  private navigateTo(path) {
    this.router.navigate([path], {
      relativeTo: this.route,
      replaceUrl: true,
    });
  }

  onCreateOffer() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl
      .create({ message: "Γίνεται καταχώρηση..." })
      .then(async (loadingEl) => {
        loadingEl.present();

        const caseData = { ...this.form.value, ...{ tagId: this.guid } };
        await this.casesService.addCase(caseData);

        setTimeout(async () => {
          loadingEl.dismiss();
          this.form.reset();
          this.navigateTo("/cases/list/" + this.guid);
        }, 1500);
      });
  }
}
