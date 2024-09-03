import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormCampoAggiuntivoComponent } from './form-campo-aggiuntivo.component';

describe('FormCampoAggiuntivoComponent', () => {
  let component: FormCampoAggiuntivoComponent;
  let fixture: ComponentFixture<FormCampoAggiuntivoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCampoAggiuntivoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormCampoAggiuntivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
