import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Platform, ToastController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class AuthService {
  public authState = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private storage: Storage,
    private platform: Platform,
    public toastController: ToastController
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }

  public ifLoggedIn() {
    this.storage.get("token").then((response) => {
      if (response) {
        this.authState.next(true);
      }
    });
  }

  public async setAuthResponse(response) {
    await this.setUser(response.aidWorker);
    await this.setToken(response.token);

    this.router.navigate(["scan"]);
    this.authState.next(true);
  }

  public async logout() {
    // Save data
    await this.storage.remove("token");
    await this.storage.remove("userInfo");
    // Redirect
    this.router.navigate(["login"]);
    this.authState.next(false);
  }

  public isAuthenticated() {
    return this.authState.value;
  }

  public async getToken() {
    return await this.storage.get("token");
  }

  private async setToken(token) {
    await this.storage.set("token", token);
  }

  private async getUser() {
    return await this.storage.get("userInfo");
  }

  private async setUser(userInfo) {
    await this.storage.set("userInfo", userInfo);
  }
}
