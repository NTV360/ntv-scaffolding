import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnFilter } from './column-filter';
import { TableColumn } from '../../table.types';

describe('ColumnFilter', () => {
  let component: ColumnFilter;
  let fixture: ComponentFixture<ColumnFilter>;

  const mockColumn: TableColumn = {
    field: 'name',
    header: 'Name',
    filter: true,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnFilter],
    }).compileComponents();

    fixture = TestBed.createComponent(ColumnFilter);
    component = fixture.componentInstance;

    // Set required inputs
    fixture.componentRef.setInput('column', mockColumn);
    fixture.componentRef.setInput('data', []);
    fixture.componentRef.setInput('filterValue', '');
    fixture.componentRef.setInput('sortField', null);
    fixture.componentRef.setInput('sortOrder', 'asc');
    fixture.componentRef.setInput('isPopupOpen', false);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
