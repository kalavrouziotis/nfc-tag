import { Component } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { MenuController, Platform } from "@ionic/angular";
import { AuthService } from "./services/auth.service";
import { ScanService } from "./services/scan.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  public appPages = [
    { title: "Αρχική", url: "/home", icon: "apps" },
    { title: "Καταγραφές", url: "/scan/list", icon: "list" },
    { title: "Νέα καταγραφή", url: "/scan/new", icon: "reader" },
    { title: "Επανεγγραφή", url: "/set-tag", icon: "reload" },
    { title: "Διαμόρφωση", url: "/erase", icon: "close-circle" },
  ];
  public labels = [
    { title: "Έξοδος", icon: "log-out", action: this.logout.bind(this) },
  ];

  constructor(
    private router: Router,
    private platform: Platform,
    private authService: AuthService,
    private scanService: ScanService,
    public menuCtrl: MenuController
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.scanService.stopScan();
      }
    });

    this.initializeApp();
  }
  public initializeApp() {
    this.platform.ready().then(() => {
      this.authService.authState.subscribe((state) => {
        if (state) {
          this.router.navigate(["home"]);
          // this.router.navigate([
          //   "cases/new/67bb1395-8dc9-40cc-e5b5-92335a1bf7f1",
          // ]);
        } else {
          this.router.navigate(["login"]);
        }
      });
    });
  }

  public logout() {
    this.authService.logout();
    this.menuCtrl.close();
  }
}
