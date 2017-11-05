import { Component, OnInit } from '@angular/core';
import { Http, Response, Request ,Headers, RequestOptions} from '@angular/http';
import { ActivatedRoute, Routes } from '@angular/router';
import { Data } from './logintambahmodel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  dataLogin:Data;
  constructor(private http: Http, private route: ActivatedRoute) { }

  ngOnInit() {
    this.dataLogin = new Data();
  }
  login(dataLogin){
    debugger;
    if(this.dataLogin.UsernamePelanggan == null || this.dataLogin.UsernamePelanggan == null){
      alert("Inputan Jangan Ksoong");
    } else {
      let header = new Headers({'Content-Type': 'application/json'});
      let opsi = new RequestOptions({headers : header});
      this.http.post('https://elektronik124.herokuapp.com/api/login/pelanggan/auth/',JSON.stringify(dataLogin),opsi)
      .subscribe((res: Response) => {
        if(res.json() == ""){
          alert('Registrasi Dulu');
        } else {
          localStorage.setItem("token",res.json().token);
          localStorage.setItem("UsernamePelanggan",dataLogin['UsernamePelanggan']);
          window.location.href = "home";
        }
      })
    }
  }
}
