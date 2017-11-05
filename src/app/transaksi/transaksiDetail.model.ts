import { Component } from '@angular/core';
import { Http, Request, Response, Headers, RequestOptions } from '@angular/http';

export class TransaksiDetailModel {
    public _id: string;
    public KdPenjualan: string;
    public KdBarang : string;
    public JmlBarang:number;
    public HargaBarang:Number;
    public NamaBang:String;
}
