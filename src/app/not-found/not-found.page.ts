import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-not-found",
  templateUrl: "./not-found.page.html",
  styleUrls: ["./not-found.page.scss"],
})
export class NotFoundPage implements OnInit {
  public title: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {}

  public return() {
    this.navigateTo("/home");
  }

  private navigateTo(path) {
    this.router.navigate([path], {
      relativeTo: this.route,
      replaceUrl: true,
    });
  }
}
