import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IpInfo } from '../interfaces/ipInfo';

@Injectable({
  providedIn: 'root',
})
export class IpService {
  private IP_INFO_TOKEN = 'dec4799a17057c';

  constructor(private http: HttpClient) {}

  getIpAdress(): Observable<any> {
    return this.http.get('http://api.ipify.org/?format=json');
  }

  getIpInfo(ip: string): Observable<IpInfo> {
    return this.http.get<IpInfo>(
      `https://ipinfo.io/${ip}?token=${this.IP_INFO_TOKEN}`
    );
  }
}
