import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController, LoadingController } from "@ionic/angular";
import { AuthService } from "../services/auth.service";
import { DalService } from "../services/dal.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  constructor(
    private dal: DalService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  authenticate(email: string, password: string) {
    this.loadingCtrl
      .create({ keyboardClose: true, message: "Σύνδεση σε εξέλιξη..." })
      .then(async (loadingEl) => {
        loadingEl.present();

        const resData = await this.loginUser(email, password);

        if (resData) {
          loadingEl.dismiss();
          this.router.navigate(["/home"], {
            relativeTo: this.route,
            replaceUrl: true,
          });
        } else {
          loadingEl.dismiss();
          this.showAlert(
            "Ο συνδυασμός του email και του κωδικού πρόσβασης είναι λανθασμένος."
          );
        }
      });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.authenticate(email, password);
    form.reset();
  }

  private showAlert(message: string) {
    this.alertCtrl
      .create({
        header: "Η ταυτοποίηση απέτυχε",
        message: message,
        buttons: ["Ενταξει"],
      })
      .then((alertEl) => alertEl.present());
  }

  async loginUser(email, password) {
    try {
      const response = await this.dal.post(
        "aid-workers/login",
        { email, password },
        false
      );

      if (response) {
        this.authService.setAuthResponse(response);
      }

      return response;
    } catch (error) {
      return null;
    }
  }
}
