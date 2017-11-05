import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Routes, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rightside',
  templateUrl: './rightside.component.html',
  styleUrls: ['./rightside.component.css']
})
export class RightsideComponent implements OnInit {
  dataMerk : Object;
  data:Object;
  JumlahItem : Number;
  subtotal:Number;
  constructor(private http: Http, private route: ActivatedRoute) { }
  ngOnInit() {
    this.http.get("https://elektronik124.herokuapp.com/api/barang/aggregatlimit/4")
    .subscribe((res:Response) => {
      this.dataMerk=res.json();
    });
    this.JumlahItem = JSON.parse(localStorage.getItem('JumlahItemBarang')).length;
    let total = 0;
    for (var i = 0; i < JSON.parse(localStorage.getItem('JumlahItemBarang')).length; i++) {
      total += (JSON.parse(localStorage.getItem('JumlahItemBarang'))[i]*JSON.parse(localStorage.getItem('HargaItemBarang'))[i]);
    }
    this.subtotal=total;
  }
}
