import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionUsuarioComponent } from './accion-usuario.component';

describe('AccionUsuarioComponent', () => {
  let component: AccionUsuarioComponent;
  let fixture: ComponentFixture<AccionUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccionUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccionUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
