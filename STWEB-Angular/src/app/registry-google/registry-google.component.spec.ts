import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistryGoogleComponent } from './registry-google.component';

describe('RegistryGoogleComponent', () => {
  let component: RegistryGoogleComponent;
  let fixture: ComponentFixture<RegistryGoogleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistryGoogleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistryGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
