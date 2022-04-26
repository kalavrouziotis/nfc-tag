import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "./../../environments/environment";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class DalService {
  private apiURL: string;
  private httpOptions: any = {};

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.apiURL = environment.apiURL;
  }

  public post(path, data?, noauth?, hasFile = false) {
    return new Promise(async (resolve, reject) => {
      let httpOptions = {};
      if (hasFile == false)
        httpOptions = noauth == true ? {} : await this.getHeaders();
      else httpOptions = this.getMultipartHeaders();
      return this.http.post(this.apiURL + path, data, httpOptions).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  public get(path, noauth?) {
    return new Promise(async (resolve, reject) => {
      let httpOptions = noauth == true ? {} : await this.getHeaders();
      return this.http.get<any>(this.apiURL + path, httpOptions).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          reject(null);
          if (error.status === 401) {
            this.authService.logout();
            this.navigateTo("/login");
          }
        }
      );
    });
  }

  public patch(path, data, noauth?) {
    return new Promise(async (resolve, reject) => {
      let httpOptions = noauth == true ? {} : await this.getHeaders();
      return this.http
        .patch<any>(this.apiURL + path, data, httpOptions)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  public delete(path, id?, noauth?) {
    return new Promise(async (resolve, reject) => {
      let httpOptions = noauth == true ? {} : await this.getHeaders();
      return this.http
        .delete<any>(this.apiURL + path + (id ? id : ""), httpOptions)
        .subscribe(
          (res) => {
            resolve(res);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  private async getHeaders() {
    const bear = await this.authService.getToken();
    return (this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + bear,
        "Content-Type": "application/json",
      }),
    });
  }

  private async getMultipartHeaders() {
    return (this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: "Bearer " + (await this.authService.getToken()),
        "Cache-Control":
          "no-cache, no-store, must-revalidate, post-check=0, pre-check=0",
        Pragma: "no-cache",
        Expires: "0",
        // 'Content-Type': 'multipart/form-data',
      }),
    });
  }

  private navigateTo(path) {
    this.router.navigate([path], {
      relativeTo: this.route,
      replaceUrl: true,
    });
  }
}
