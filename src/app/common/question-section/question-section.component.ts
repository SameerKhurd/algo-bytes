import { Component } from '@angular/core';

@Component({
  selector: 'app-question-section',
  templateUrl: './question-section.component.html',
  styleUrls: ['./question-section.component.scss'],
})
export class QuestionSectionComponent {
  sectionTitle = 'Array';

  columns = ['status', 'leetcode_number', 'name', 'difficulty', 'starred'];
  tableColumns = [
    { label: 'Status', value: 'status' },
    { label: 'LeetCode', value: 'leetcode_number' },
    { label: 'Title', value: 'name' },
    { label: 'Difficulty', value: 'difficulty' },
    { label: 'Star', value: 'starred' },
  ];
  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  expandedIndex = 0;

  data: any = [
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

  
}
