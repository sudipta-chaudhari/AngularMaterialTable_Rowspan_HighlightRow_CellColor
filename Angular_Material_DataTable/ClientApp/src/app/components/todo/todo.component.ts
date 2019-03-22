import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { TodoService } from '../../services/todo/todo.service';
import { ToDo } from 'src/app/services/todo/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  spanningColumns = ['id'];
  spans = [];

  DATA: ToDo[];

  constructor(private todoService: TodoService) {
  }

  displayedColumns: string[] = ['userId', 'id', 'title', 'completed'];

  dataSource = new MatTableDataSource();

  ngOnInit() {
    this.RenderDataTable();
  }

  private RenderDataTable() {
    this.todoService.getToDos()
      .subscribe(
        res => {
          this.DATA = res;
          this.dataSource.data = res;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.spanRow('userId', d => d.userId);
        },
        error => {
          console.log('There was an error while retrieving ToDos !' + error);
        });
  }

  /**
   * Evaluated and store an evaluation of the rowspan for each row.
   * The key determines the column it affects, and the accessor determines the
   * value that should be checked for spanning.
   */
   spanRow(key, accessor) {
    for (let i = 0; i < this.DATA.length;) {
      let currentValue = accessor(this.DATA[i]);
      let count = 1;

      // Iterate through the remaining rows to see how many match
      // the current value as retrieved through the accessor.
      for (let j = i + 1; j < this.DATA.length; j++) {
        if (currentValue != accessor(this.DATA[j])) {
          break;
        }

        count++;
      }

      if (!this.spans[i]) {
        this.spans[i] = {};
      }

      // Store the number of similar values that were found (the span)
      // and skip i to the next unique row.
      this.spans[i][key] = count;
      i += count;
    }
  }

  getRowSpan(col, index) {
    return this.spans[index] && this.spans[index][col];
  }

  selectedRow: any;

  selectedRowIndex: number;

  highlight(row) {
    this.selectedRowIndex = row.id;
  }
}
