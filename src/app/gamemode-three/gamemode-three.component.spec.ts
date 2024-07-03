import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamemodeThreeComponent } from './gamemode-three.component';

describe('GamemodeThreeComponent', () => {
  let component: GamemodeThreeComponent;
  let fixture: ComponentFixture<GamemodeThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamemodeThreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamemodeThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
