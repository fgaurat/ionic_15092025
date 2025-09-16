import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreferencesThemePage } from './preferences-theme.page';

describe('PreferencesThemePage', () => {
  let component: PreferencesThemePage;
  let fixture: ComponentFixture<PreferencesThemePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferencesThemePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
