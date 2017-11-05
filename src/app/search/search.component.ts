import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Routes, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  cari: string;
  data: Object;
  kdKatBarang:String;
  kategori:String;
  merk="";
  constructor(private http: Http, private route: ActivatedRoute) {
    this.route.params.subscribe(params =>{
      this.cari=params['cari'];
    });
   }

  ngOnInit() {
    if(this.cari == "undefined"){
      this.merk = "Kosong";
    } else {
      this.merk = this.cari;
    }
    this.http.get("https://elektronik124.herokuapp.com/api/barang/agregatmatch/"+this.cari)
    .subscribe((res:Response) => {
      this.data=res.json();
    });
  }
  addchart(KdBarang,HrgBarang,NmMerkBarang,TypeBarang,Kode){
    if(localStorage.getItem('token') != null){
      if(localStorage.getItem("ListBarang") == null){
        debugger;
        var ListBarang = [];
        var JumlahItemBarang = [];
        var HargaItemBarang = [];
        var NamaMerkBarang = [];
        var TipeBarang = [];
        ListBarang[0] = KdBarang;
        JumlahItemBarang[0] = 1;
        HargaItemBarang[0] = HrgBarang;
        NamaMerkBarang[0] = NmMerkBarang;
        TipeBarang[0] = TypeBarang; 
        localStorage.setItem("ListBarang", JSON.stringify(ListBarang));
        localStorage.setItem("JumlahItemBarang", JSON.stringify(JumlahItemBarang));
        localStorage.setItem("HargaItemBarang", JSON.stringify(HargaItemBarang));
        localStorage.setItem("NamaMerkBarang", JSON.stringify(NamaMerkBarang));
        localStorage.setItem("TipeBarang", JSON.stringify(TipeBarang));
        alert("Masuk Keranjang");
        window.location.href = "/kategori/"+Kode;
      } else {
        let cek = "";
        var ListBarangArray = JSON.parse(localStorage.getItem("ListBarang"));
        var JumlahItemBarangArray = JSON.parse(localStorage.getItem("JumlahItemBarang"));
        var HargaItemBarangArray = JSON.parse(localStorage.getItem("HargaItemBarang"));
        var NamaMerkBarangArray = JSON.parse(localStorage.getItem("NamaMerkBarang"));
        var TipeBarangArray = JSON.parse(localStorage.getItem("TipeBarang"));
        for (var i = 0; i < ListBarangArray.length; i++) {
          if(ListBarangArray[i]==KdBarang){
            cek = "Ready";
          }
        }
        if(cek == ""){
          var ListBarang = [];
          var JumlahItemBarang = [];
          var HargaItemBarang = [];
          var NamaMerkBarang = [];
          var TipeBarang = [];
          for (var i = 0; i < ListBarangArray.length; i++) {
            ListBarang[i] = ListBarangArray[i];
            JumlahItemBarang[i] = JumlahItemBarangArray[i];
            HargaItemBarang[i] = HargaItemBarangArray[i];
            NamaMerkBarang[i] = NamaMerkBarangArray[i];
            TipeBarang[i] = TipeBarangArray[i];
          } 
          ListBarang[i] = KdBarang;
          JumlahItemBarang[i] = 1;
          HargaItemBarang[i] = HrgBarang;
          NamaMerkBarang[i] = NmMerkBarang;
          TipeBarang[i] = TypeBarang; 
          localStorage.setItem("ListBarang", JSON.stringify(ListBarang));
          localStorage.setItem("JumlahItemBarang", JSON.stringify(JumlahItemBarang));
          localStorage.setItem("HargaItemBarang", JSON.stringify(HargaItemBarang));
          localStorage.setItem("NamaMerkBarang", JSON.stringify(NamaMerkBarang));
          localStorage.setItem("TipeBarang", JSON.stringify(TipeBarang));
          alert("Masuk Keranjang");
          window.location.href = "/kategori/"+Kode;
        } else {
          alert("Barang Sudah Ada di Keranjang");
        }
      }
    } else {
      alert('Registrasi Dulu Gan');
    }
  }
}
