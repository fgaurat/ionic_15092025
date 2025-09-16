import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersoPlatformPage } from './perso-platform.page';

describe('PersoPlatformPage', () => {
  let component: PersoPlatformPage;
  let fixture: ComponentFixture<PersoPlatformPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PersoPlatformPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
