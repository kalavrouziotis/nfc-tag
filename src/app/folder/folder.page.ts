import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-folder",
  templateUrl: "./folder.page.html",
  styleUrls: ["./folder.page.scss"],
})
export class FolderPage implements OnInit {
  public folder: string;

  public appPages = [
    { title: "Αρχική", url: "/home", icon: "mail" },
    { title: "Καταγραφές", url: "/scan/list", icon: "scan" },
    { title: "Νέα καταγραφή", url: "/scan/new", icon: "scan" },
    { title: "Επανεγγραφή", url: "/set-tag", icon: "scan" },
    { title: "Διαμόρφωση", url: "/erase", icon: "scan" },
  ];
  public labels = ["Logout"];

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get("id");
  }
}
