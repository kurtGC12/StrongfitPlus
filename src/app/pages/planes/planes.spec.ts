import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanesComponent } from './planes';
import { By } from '@angular/platform-browser';

describe('PlanesComponent', () => {
  let component: PlanesComponent;
  let fixture: ComponentFixture<PlanesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanesComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PlanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('debería llamar a agregarAlCarrito con "Plan Mensual"', () => {
    spyOn(component, 'agregarAlCarrito');
    const btnMensual = fixture.debugElement.queryAll(By.css('button.btn-primary'))[0];
    btnMensual.triggerEventHandler('click');
    expect(component.agregarAlCarrito).toHaveBeenCalledWith('Plan Mensual', 35000);
  });

  it('debería llamar a agregarAlCarrito con "Plan Semestral"', () => {
    spyOn(component, 'agregarAlCarrito');
    const btnSemestral = fixture.debugElement.queryAll(By.css('button.btn-primary'))[1];
    btnSemestral.triggerEventHandler('click');
    expect(component.agregarAlCarrito).toHaveBeenCalledWith('Plan Semestral', 180000);
  });

  it('debería llamar a agregarAlCarrito con "Plan Anual"', () => {
    spyOn(component, 'agregarAlCarrito');
    const btnAnual = fixture.debugElement.queryAll(By.css('button.btn-primary'))[2];
    btnAnual.triggerEventHandler('click');
    expect(component.agregarAlCarrito).toHaveBeenCalledWith('Plan Anual', 330000);
  });
});