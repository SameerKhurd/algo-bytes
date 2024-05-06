import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-question-table',
  templateUrl: './question-table.component.html',
  styleUrls: ['./question-table.component.scss'],
})
export class QuestionTableComponent implements AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  columns = ['status', 'leetcode_number', 'name', 'difficulty', 'starred'];
  tableColumns = [
    { label: 'Status', value: 'status' },
    { label: 'LeetCode', value: 'leetcode_number' },
    { label: 'Title', value: 'name' },
    { label: 'Difficulty', value: 'difficulty' },
    { label: 'Star', value: 'starred' },
  ];

  data = [
    {
      status: 'solved',
      difficulty: 'hard',
      starred: true,
      name: 'Word Search II',
      leetcode_number: 212,
      url: 'https://leetcode.com/problems/word-search-ii/',
    },
    {
      status: 'unsolved',
      difficulty: 'easy',
      starred: false,
      name: 'Palindrome Partitioning II',
      leetcode_number: 132,
      url: 'https://leetcode.com/problems/palindrome-partitioning-ii/',
    },
    {
      status: 'unsolved',
      difficulty: 'medium',
      starred: false,
      name: 'Regular Expression Matching',
      leetcode_number: 10,
      url: 'https://leetcode.com/problems/regular-expression-matching/',
    },
  ];
  dataSource = new MatTableDataSource(this.data);
}
