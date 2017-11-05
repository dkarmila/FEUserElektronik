import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Routes, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-leftside',
  templateUrl: './leftside.component.html',
  styleUrls: ['./leftside.component.css']
})
export class LeftsideComponent implements OnInit {

  dataKategori : Object;
  constructor(private http: Http, private route: ActivatedRoute) { }

  ngOnInit() {
    this.http.get("https://elektronik124.herokuapp.com/api/katbarang")
    .subscribe((res:Response) => {
      this.dataKategori=res.json();
    });
  }

}
