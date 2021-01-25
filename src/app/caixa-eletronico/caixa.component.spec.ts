import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaixaComponent } from './caixa.component';

describe('CaixaComponent', () => {
  let component: CaixaComponent;
  let fixture: ComponentFixture<CaixaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaixaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaixaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
