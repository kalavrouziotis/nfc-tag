import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-not-valid-content",
  templateUrl: "./not-valid-content.page.html",
  styleUrls: ["./not-valid-content.page.scss"],
})
export class NotValidContentPage implements OnInit {
  public title: string = "";

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {}

  public reset() {
    this.navigateTo("/set-tag");
  }

  private navigateTo(path) {
    this.router.navigate([path], {
      relativeTo: this.route,
      replaceUrl: true,
    });
  }
}
