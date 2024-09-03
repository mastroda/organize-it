import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CampoAggiuntivoComponent } from './campo-aggiuntivo.component';

describe('CampoAggiuntivoComponent', () => {
  let component: CampoAggiuntivoComponent;
  let fixture: ComponentFixture<CampoAggiuntivoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CampoAggiuntivoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CampoAggiuntivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
