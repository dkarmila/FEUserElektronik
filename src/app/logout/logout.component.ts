import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    localStorage.removeItem('token');
    localStorage.removeItem('UsernamePelanggan');
    localStorage.removeItem('ListBarang');
    localStorage.removeItem('JumlahItemBarang');
    localStorage.removeItem('HargaItemBarang');
    localStorage.removeItem('NamaMerkBarang');
    localStorage.removeItem('TipeBarang');
    localStorage.removeItem('StokAkhirBarang');
    window.location.href = "/home";
  }

}
