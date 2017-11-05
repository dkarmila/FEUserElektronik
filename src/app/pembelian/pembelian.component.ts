import { Component, OnInit } from '@angular/core';
import { Http, Response, Request } from '@angular/http';

@Component({
  selector: 'app-pembelian',
  templateUrl: './pembelian.component.html',
  styleUrls: ['./pembelian.component.css']
})
export class PembelianComponent implements OnInit {
  dataTampil:Object;
  dataDetail:Object;
  dataTampilDetail:Object;
  constructor(private http:Http) { }

  ngOnInit() {
    debugger;
    this.http.get("https://elektronik124.herokuapp.com/api/penjualan")
    .subscribe((res:Response) => {
      this.dataTampil=res.json();
      debugger;
    })
  }
  DetailModal(kdpenjualan){
    this.http.get("https://elektronik124.herokuapp.com/api/kdpenjualan/"+kdpenjualan)
    .subscribe((res:Response) => {
      this.dataDetail=res.json()[0];
      debugger;
    })
    this.http.get("https://elektronik124.herokuapp.com/api/penjualandetail/kdpenjualan/"+kdpenjualan)
    .subscribe((res:Response) =>{
      this.dataTampilDetail=res.json()[0];
    })
  }
  Detail(kodepenjualan){
    debugger;
  }
}
