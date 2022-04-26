import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
})
export class HomePage implements OnInit {
  public title: string = "Αρχική";

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {}

  public create() {
    this.navigateTo("/scan/new");
  }

  public read() {
    this.navigateTo("/scan/list");
  }

  private navigateTo(path) {
    this.router.navigate([path], {
      relativeTo: this.route,
      replaceUrl: true,
    });
  }
}
