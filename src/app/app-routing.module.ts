import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "./services/auth-guard.service";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: "cases",
    loadChildren: () =>
      import("./cases/cases.module").then((m) => m.CasesPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: "scan",
    loadChildren: () =>
      import("./scan/scan.module").then((m) => m.ScanPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: "set-tag",
    loadChildren: () =>
      import("./set-tag/set-tag.module").then((m) => m.SetTagPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: "erase",
    loadChildren: () =>
      import("./erase-tag/erase-tag.module").then((m) => m.EraseTagPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: "not-valid-content",
    loadChildren: () =>
      import("./not-valid-content/not-valid-content.module").then(
        (m) => m.NotValidContentPageModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: "not-found",
    loadChildren: () =>
      import("./not-found/not-found.module").then((m) => m.NotFoundPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: "**",
    loadChildren: () =>
      import("./not-found/not-found.module").then((m) => m.NotFoundPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
