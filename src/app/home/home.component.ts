import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data:Object;
  constructor(private http:Http) { }

  ngOnInit() {
    this.http.get("https://elektronik124.herokuapp.com/api/barang/agregat")
    .subscribe((res:Response) => {
      this.data = res.json();
      debugger;
    });
  }

}
