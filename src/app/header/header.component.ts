import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  token:String;
  data:Object;
  constructor() { }

  ngOnInit() {
    // localStorage.removeItem('ListBarang');
    // localStorage.removeItem('JumlahItemBarang');
    // localStorage.removeItem('HargaItemBarang');
    // localStorage.removeItem('NamaMerkBarang');
    // localStorage.removeItem('TipeBarang'); 
    // localStorage.removeItem('StokAkhirBarang');
    this.token=localStorage.token;
  }
  cari(data){
    window.location.href="/search/"+data;
  }
}
