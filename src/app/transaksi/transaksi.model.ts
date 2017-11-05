import { Component } from '@angular/core';
import { Http, Request, Response, Headers, RequestOptions } from '@angular/http';

export class TransaksiModel {
    public _id: string;
    public KdPenjualan: string;
    public KdPelanggan: string;
    public TglPenjualan: Date;
    public JmlItem:number;
    public TotalHargaJual:Number;
}
