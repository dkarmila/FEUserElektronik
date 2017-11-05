import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { TransaksiModel } from './transaksi.model';
import { TransaksiDetailModel } from './transaksiDetail.model';
import { Routes, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transaksi',
  templateUrl: './transaksi.component.html',
  styleUrls: ['./transaksi.component.css']
})
export class TransaksiComponent implements OnInit {
  data: Object;
  subtotal:Number;
  dataModel:TransaksiModel;
  dataDetailModel:TransaksiDetailModel;
  dataBarangEdit: Object;
  constructor(private http:Http) { }

  ngOnInit() {
    this.dataModel = new TransaksiModel();
    this.dataDetailModel = new TransaksiDetailModel();
    let a = new Array(JSON.parse(localStorage.getItem('ListBarang')).length);
    let total = 0;
    this.data = a;
    for (var i = 0; i < a.length; i++) {
      this.data[i] = [
        JSON.parse(localStorage.getItem('ListBarang'))[i],
        JSON.parse(localStorage.getItem('NamaMerkBarang'))[i],
        JSON.parse(localStorage.getItem('TipeBarang'))[i],
        JSON.parse(localStorage.getItem('JumlahItemBarang'))[i],
        JSON.parse(localStorage.getItem('HargaItemBarang'))[i]
      ]; 
      total += (JSON.parse(localStorage.getItem('JumlahItemBarang'))[i]*JSON.parse(localStorage.getItem('HargaItemBarang'))[i]);
    }
    this.subtotal=total;
  }
  tambah(KdBarang,JmlBarang){
    this.http.get("https://elektronik124.herokuapp.com/api/barang/brg/"+KdBarang)
    .subscribe((res:Response) => {
      if(res.json()[0].StokAkhir <= JmlBarang){
        alert("Stok Yang Tersedia Hanya "+res.json()[0].StokAkhir);
      } else {
        var ListBarangArray = JSON.parse(localStorage.getItem("ListBarang"));
        var JumlahItemBarangArray = JSON.parse(localStorage.getItem("JumlahItemBarang"));
        var JumlahItemBarang = [];
        for (var i = 0; i < ListBarangArray.length; i++) {
            JumlahItemBarang[i] = JumlahItemBarangArray[i]+1;
        }
        localStorage.setItem("JumlahItemBarang", JSON.stringify(JumlahItemBarang));
        window.location.href = "/transaksi";
      }
    });
  }
  kurang(KdBarang){
    let cek = "";
    var ListBarangArray = JSON.parse(localStorage.getItem("ListBarang"));
    var JumlahItemBarangArray = JSON.parse(localStorage.getItem("JumlahItemBarang"));
    var JumlahItemBarang = [];
    for (var i = 0; i < ListBarangArray.length; i++) {
      if(ListBarangArray[i]==KdBarang){
        JumlahItemBarang[i] = JumlahItemBarangArray[i]-1;
        if(JumlahItemBarang[i] <= 0){
          cek="Tidak Boleh Membeli Kurang Dari Nol";
        }
      } else {
        JumlahItemBarang[i] = JumlahItemBarangArray[i];
      }
    }
    if(cek == ""){
      localStorage.setItem("JumlahItemBarang", JSON.stringify(JumlahItemBarang));
      window.location.href = "/transaksi";
    } else {
      alert(cek);
    }
  }
  hapus(KdBarang){
    debugger;
    var ListBarangArray = JSON.parse(localStorage.getItem("ListBarang"));
    var JumlahItemBarangArray = JSON.parse(localStorage.getItem("JumlahItemBarang"));
    var HargaItemBarangArray = JSON.parse(localStorage.getItem("HargaItemBarang"));
    var NamaMerkBarangArray = JSON.parse(localStorage.getItem("NamaMerkBarang"));
    var TipeBarangArray = JSON.parse(localStorage.getItem("TipeBarang"));
    var StokAkhirBarangArray = JSON.parse(localStorage.getItem("StokAkhirBarang"));
    var ListBarang = [];
    var JumlahItemBarang = [];
    var HargaItemBarang = [];
    var NamaMerkBarang = [];
    var TipeBarang = [];
    var StokAkhirBarang = [];
    var angka = 0;
    for (var i = 0; i < ListBarangArray.length; i++) {  
        if(ListBarangArray[i] == KdBarang){
          continue;
        }
        ListBarang[angka] = ListBarangArray[i];
        JumlahItemBarang[angka] = JumlahItemBarangArray[i];
        HargaItemBarang[angka] = HargaItemBarangArray[i];
        NamaMerkBarang[angka] = NamaMerkBarangArray[i];
        TipeBarang[angka] = TipeBarangArray[i];
        StokAkhirBarang[angka] = StokAkhirBarangArray[i];
        angka++;
    }
    localStorage.setItem("ListBarang", JSON.stringify(ListBarang));
    localStorage.setItem("JumlahItemBarang", JSON.stringify(JumlahItemBarang));
    localStorage.setItem("HargaItemBarang", JSON.stringify(HargaItemBarang));
    localStorage.setItem("NamaMerkBarang", JSON.stringify(NamaMerkBarang));
    localStorage.setItem("TipeBarang", JSON.stringify(TipeBarang));
    localStorage.setItem("StokAkhirBarang", JSON.stringify(StokAkhirBarang));
    if(JSON.parse(localStorage.getItem("ListBarang")) <=0){
      alert("Keranjang Kosong");
      window.location.href = "/home";
    } else {
      window.location.href = "/transaksi";
    }
  }
  pickup(){
    let header = new Headers({"Content-Type":"application/json"});
    let opsi = new RequestOptions({headers:header});
    this.http.get("https://elektronik124.herokuapp.com/api/usernamepelanggan/"+localStorage.UsernamePelanggan)
    .subscribe((res:Response) => {
      let KdPel = res.json()[0].KdPelanggan;
      this.http.get("https://elektronik124.herokuapp.com/api/penjualan/kdpelanggan/"+KdPel)
      .subscribe((res:Response) => {
        let JmlTransaksi = res.json().length+1;
        this.dataModel.KdPenjualan = "KJ"+KdPel+""+JmlTransaksi;
        this.dataModel.KdPelanggan = KdPel;
        this.dataModel.TglPenjualan = new Date;
        this.dataModel.JmlItem = JSON.parse(localStorage.getItem('ListBarang')).length;
        this.dataModel.TotalHargaJual = this.subtotal;
        this.http.post("https://elektronik124.herokuapp.com/api/penjualan", JSON.stringify(this.dataModel), opsi)
        .subscribe((res:Response) => {
          this.pickupdetail(this.dataModel.KdPenjualan);
        })
      })
    })
  }
  pickupdetail(KdPenjualan){
    let header = new Headers({"Content-Type":"application/json"});
    let opsi = new RequestOptions({headers:header});
    let jmlbarang = JSON.parse(localStorage.getItem("ListBarang")).length;
    debugger;
    for (var i = 0; i < jmlbarang; i++) {
      this.dataDetailModel.KdBarang = JSON.parse(localStorage.getItem("ListBarang"))[i];
      this.dataDetailModel.KdPenjualan = KdPenjualan;
      this.dataDetailModel.JmlBarang = JSON.parse(localStorage.getItem("JumlahItemBarang"))[i];
      this.dataDetailModel.NamaBang = JSON.parse(localStorage.getItem("NamaMerkBarang"))[i];
      this.dataDetailModel.HargaBarang = JSON.parse(localStorage.getItem("HargaItemBarang"))[i];
      debugger;
      this.http.post("https://elektronik124.herokuapp.com/api/penjualandetail", JSON.stringify(this.dataDetailModel), opsi)
      .subscribe((res:Response) =>{
      });
    }
    debugger;
    this.pickupbarang(jmlbarang);
  }
  pickupbarang(jmlbarang){
    let a=1;
    for (var i = 0; i < jmlbarang; i++) {
      debugger;
      this.http.get("https://elektronik124.herokuapp.com/api/barang/brg/"+JSON.parse(localStorage.getItem("ListBarang"))[i])
      .subscribe((res:Response) => {
        debugger;
        this.dataBarangEdit = res.json()[0];
        this.dataBarangEdit['StokAkhir'] = this.dataBarangEdit['StokAkhir']-this.dataDetailModel.JmlBarang;
        this.http.put("https://elektronik124.herokuapp.com/api/barang/"+this.dataBarangEdit['_id'], this.dataBarangEdit)
        .subscribe((res:Response) => {
          if(a==jmlbarang){
            localStorage.removeItem('ListBarang');
            localStorage.removeItem('JumlahItemBarang');
            localStorage.removeItem('HargaItemBarang');
            localStorage.removeItem('NamaMerkBarang');
            localStorage.removeItem('TipeBarang'); 
            alert('Berhasil Pickup');
            window.location.href = "/home";
          }
          a++;
        });
      })
    }
    debugger;
  }
}
