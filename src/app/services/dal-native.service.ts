import { Injectable } from '@angular/core';
import { HTTP, HTTPResponse } from '@ionic-native/http/ngx';
import { AuthService } from './auth.service';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DalNativeService {

  public apiURL: string;

  constructor(
    private http: HTTP,
    private authService: AuthService
  ) { 
    this.apiURL = environment.apiURL;
  }

  public sendRequest(url: string, options: {
        method: 'get' | 'post' | 'put' | 'patch' | 'head' | 'delete' | 'options' | 'upload' | 'download';
        data?: {
            [index: string]: any;
        };
        params?: {
            [index: string]: string | number;
        };
        serializer?: 'json' | 'urlencoded' | 'utf8' | 'multipart' | 'raw';
        timeout?: number;
        headers?: {
            [index: string]: string;
        };
        filePath?: string | string[];
        name?: string | string[];
        responseType?: 'text' | 'arraybuffer' | 'blob' | 'json';
    }): Promise<HTTPResponse> {
      return this.http.sendRequest(this.apiURL + url, options);
    }
  
  public get(url: string, params: any = {}, noAuth: boolean = false): Promise<HTTPResponse> {
    return this.http.get(this.apiURL + url, params, this.getHeaders(noAuth));
  }

  public post(url: string, body: any = {}, noAuth: boolean = false): Promise<HTTPResponse> {
    return this.http.post(this.apiURL + url, body, this.getHeaders(noAuth));
  }

  public delete(url: string, params: any = {}, noAuth: boolean = false): Promise<HTTPResponse>{
    return this.http.delete(this.apiURL + url, params, this.getHeaders(noAuth));
  }

  public patch(url: string, body: any = {}, noAuth: boolean = false): Promise<HTTPResponse> {
    return this.http.patch(this.apiURL + url, body, this.getHeaders(noAuth));
  }

  private getHeaders(noAuth: boolean) {
    return noAuth ? {} : {
        'Authorization': 'Bearer ' + this.authService.getToken(),
        'Content-Type': 'application/json' 
    }
  }

}
 