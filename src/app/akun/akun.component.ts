import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Routes, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-akun',
  templateUrl: './akun.component.html',
  styleUrls: ['./akun.component.css']
})
export class AkunComponent implements OnInit {
  dataEdit : Object;
  constructor(private http:Http, private route: ActivatedRoute) { }

  ngOnInit() {
    this.http.get("https://elektronik124.herokuapp.com/api/usernamepelanggan/"+localStorage.UsernamePelanggan)
    .subscribe((res:Response) => {
      this.dataEdit = res.json()[0];
      debugger;
    });
  }
  putPelanggan(id){
    if(this.dataEdit['NamaPelanggan']=="" || this.dataEdit['AlamatPelanggan']=="" || 
    this.dataEdit['UsernamePelanggan']=="" || this.dataEdit['PasswordPelanggan']==""){
      alert("Inputan Jangan Kosong Pakk");
    } else if(this.dataEdit['NoRmh']==null && this.dataEdit['NoTelp']==null){
      debugger;
      alert("No telp / No rumah salah satu harus terisi Pakk");
    }else if(this.dataEdit['NoTelp'] > '9999999999999'){
      alert("No Telp Tidak Boleh Lebih Dari 13 Pakk");
    }else if(this.dataEdit['NoRmh'] > '99999999999'){
      alert("No Rumah Melebihi Batas");
    } else {
      this.http.get("https://elektronik124.herokuapp.com/api/usernamepelanggan/"+this.dataEdit['UsernamePelanggan'])
      .subscribe((res:Response) => {
          debugger;
          if(res.json() == ""){
            this.dataEdit['KdPelanggan'] = "KP"+this.dataEdit['UsernamePelanggan'];
            this.http.put("https://elektronik124.herokuapp.com/api/pelanggan/"+this.dataEdit['_id'], this.dataEdit)
            .subscribe((res:Response) => {
              alert("Berhasil di Edit Silahkan Login Kembali");
              localStorage.removeItem('token');
              localStorage.removeItem('UsernamePelanggan');
              localStorage.removeItem('ListBarang');
              localStorage.removeItem('JumlahItemBarang');
              localStorage.removeItem('HargaItemBarang');
              localStorage.removeItem('NamaMerkBarang');
              localStorage.removeItem('TipeBarang');
              window.location.href='./login';
            })
          } else {
            debugger;
            if(res.json()[0]._id == this.dataEdit['_id']){
              this.dataEdit['KdPelanggan'] = "KP"+this.dataEdit['UsernamePelanggan'];
              this.http.put("https://elektronik124.herokuapp.com/api/pelanggan/"+this.dataEdit['_id'], this.dataEdit)
              .subscribe((res:Response) => {
                alert("Berhasil di Edit Silahkan Login Kembali");
                localStorage.removeItem('token');
                localStorage.removeItem('UsernamePelanggan');
                localStorage.removeItem('ListBarang');
                localStorage.removeItem('JumlahItemBarang');
                localStorage.removeItem('HargaItemBarang');
                localStorage.removeItem('NamaMerkBarang');
                localStorage.removeItem('TipeBarang');
                localStorage.removeItem('StokAkhirBarang');
                window.location.href='./login';
              })
            } else {
              alert('Username sudah ada');
            }  
          }
      })
    }
  }
}
