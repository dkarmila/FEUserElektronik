import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KategoridetailComponent } from './kategoridetail.component';

describe('KategoridetailComponent', () => {
  let component: KategoridetailComponent;
  let fixture: ComponentFixture<KategoridetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KategoridetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KategoridetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
