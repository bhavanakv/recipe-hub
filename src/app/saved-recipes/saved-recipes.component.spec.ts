import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedRecipesComponent } from './saved-recipes.component';

describe('SavedRecipesComponent', () => {
  let component: SavedRecipesComponent;
  let fixture: ComponentFixture<SavedRecipesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavedRecipesComponent]
    });
    fixture = TestBed.createComponent(SavedRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
