import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSelectModule} from '@angular/material';
import { OrderEntryComponent } from './order-entry.component';

describe('OrderEntryComponent', () => {
  let component: OrderEntryComponent;
  let fixture: ComponentFixture<OrderEntryComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     imports: [ MatSelectModule ],
  //     declarations: [ FooComponent ]
  //   })
  //   .compileComponents();
  // }));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatSelectModule ],
      declarations: [ OrderEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
