import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultsComponent } from './results.component';

describe('ResultsComponent', () => {
  let component: ResultsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsComponent ],
      imports: [HttpClientModule]

    })
    .compileComponents();
    component = TestBed.createComponent(ResultsComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('On initializeNames', () => {
    
    beforeEach(async ()=> {
      await component.initializeNames();
    });

    it('should have name list objects',async () => {   
      expect(component.whiteList.length).toBeGreaterThan(1000);
      expect(component.blackList.length).toBeGreaterThan(10);
      expect(component.shiaList.length).toBeGreaterThan(10);
      expect(component.shiaRegex.length).toBeGreaterThan(3);   
    });

    it('should confirm Muhammad is sunni muslim name',async () => {
      component.checkName('Muhammad');
      expect(component.results[0].isMuslim).toBe(true);
      expect(component.results[0].isSunni).toBe(true);
    });

    it('should confirm John is not a muslim name',async () => {
      component.checkName('John');
      expect(component.results[0].isMuslim).toBe(false);
    });

    it('should confirm hosseini is a shia muslim name',async () => {
      component.checkName('hosseini');
      expect(component.results[0].isMuslim).toBe(true);
      expect(component.results[0].isSunni).toBe(false);
    });
  });

});