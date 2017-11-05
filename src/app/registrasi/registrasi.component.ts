import { Component, OnInit } from '@angular/core';
import { PelangganModel } from './registrasi.model';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Routes, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registrasi',
  templateUrl: './registrasi.component.html',
  styleUrls: ['./registrasi.component.css']
})
export class RegistrasiComponent implements OnInit {
  dataTambah : PelangganModel;
  nama:String;
  constructor(private http:Http, private route: ActivatedRoute) { }

  ngOnInit() {
    this.dataTambah = new PelangganModel();
  }
  postPelanggan(dataTambah){
    debugger;
    if(this.dataTambah.NamaPelanggan==null || this.dataTambah.AlamatPelanggan==null || 
      this.dataTambah.UsernamePelanggan==null || this.dataTambah.PasswordPelanggan==null){
      alert("Inputan Jangan Kosong Pakk");
    } else if(this.dataTambah.NoRmh == null && this.dataTambah.NoTelp==null){
      alert("No telp / No rumah salah satu harus terisi Pakk");
    }else if(this.dataTambah.NoTelp > '9999999999999'){
      alert("No Telp Tidak Boleh Lebih Dari 13 Pakk");
    }else if(this.dataTambah.NoRmh > '99999999999'){
      alert("No Rumah Melebihi Batas");
    } else {
      this.http.get("https://elektronik124.herokuapp.com/api/usernamepelanggan/"+this.dataTambah.UsernamePelanggan)
      .subscribe((res:Response) => {
          this.nama = res.json();
          if(this.nama == ""){
            this.dataTambah.KdPelanggan = "KP"+this.dataTambah.UsernamePelanggan;
            debugger;
            debugger;
            let header = new Headers({"Content-Type":"application/json"});
            let opsi = new RequestOptions({headers:header});
            this.http.post("https://elektronik124.herokuapp.com/api/pelanggan", JSON.stringify(dataTambah), opsi)
            .subscribe((res:Response) => {
              window.location.href='./login';
              alert("Berhasil Registrasi Silahkan Login");
            })
          } else {
            alert('User '+this.dataTambah.UsernamePelanggan+' sudah ada');  
          }
      })
    }
  }
}
