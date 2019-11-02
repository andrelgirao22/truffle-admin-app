import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportProdComponent } from './report-prod.component';

describe('ReportProdComponent', () => {
  let component: ReportProdComponent;
  let fixture: ComponentFixture<ReportProdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportProdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
