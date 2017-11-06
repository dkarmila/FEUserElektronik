import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LeftsideComponent } from './leftside/leftside.component';
import { RightsideComponent } from './rightside/rightside.component';
import { FooterComponent } from './footer/footer.component';
import { KategoriComponent } from './kategori/kategori.component';
import { KategoridetailComponent } from './kategori/kategoridetail/kategoridetail.component';
import { TransaksiComponent } from './transaksi/transaksi.component';
import { LoginComponent } from './login/login.component';
import { RegistrasiComponent } from './registrasi/registrasi.component';
import { MerkComponent } from './merk/merk.component';
import { LogoutComponent } from './logout/logout.component';
import { AkunComponent } from './akun/akun.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { PembelianComponent } from './pembelian/pembelian.component';

let routes: Routes =[
  {path: '', component: HomeComponent},
  {path: 'kategori/:kdkatbarang', component: KategoriComponent},
  {path: 'login', component: LoginComponent},
  {path: 'detail/:kdbarang', component: KategoridetailComponent },
  {path: 'logout', component: LogoutComponent},
  {path: 'transaksi', component: TransaksiComponent},
  {path: 'registrasi', component: RegistrasiComponent},
  {path: 'akun', component: AkunComponent},
  {path: 'home', component: HomeComponent},
  {path: 'pembelian', component: PembelianComponent},
  {path: 'search/:cari', component: SearchComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeftsideComponent,
    RightsideComponent,
    FooterComponent,
    KategoriComponent,
    KategoridetailComponent,
    TransaksiComponent,
    LoginComponent,
    RegistrasiComponent,
    MerkComponent,
    LogoutComponent,
    AkunComponent,
    HomeComponent,
    SearchComponent,
    PembelianComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
