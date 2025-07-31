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
    filterType: 'text',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnFilter],
    }).compileComponents();

    fixture = TestBed.createComponent(ColumnFilter);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('column', mockColumn);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
