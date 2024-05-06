import { Component } from '@angular/core';

export const QUESTION_COLUMN = {
  SOLVED: 'solved',
  TITLE: 'name',
  DIFFICULTY: 'difficulty',
  STARRED: 'starred',
};

export const enum DIFFICULTY {
  EASY = 1,
  MEDIUM = 2,
  HARD = 3,
  EXPERT = 4,
}

export const DIFFICULTY_PROPERTY = {
  1: { cssClass: 'text-success', label: 'Easy' },
  2: { cssClass: 'text-warning', label: 'Medium' },
  3: { cssClass: 'text-danger', label: 'Hard' },
  4: { cssClass: 'text-secondary', label: 'Expert' },
};

@Component({
  selector: 'app-question-section',
  templateUrl: './question-section.component.html',
  styleUrls: ['./question-section.component.scss'],
})
export class QuestionSectionComponent {
  totalQuestions = 0;
  solvedQuestions = 0;
  solvedPercentage = 0;

  questionCol = QUESTION_COLUMN;
  difficultyProperty: any = DIFFICULTY_PROPERTY;
  sectionTitle = 'Array';

  columns = ['status', 'leetcode_number', 'name', 'difficulty', 'starred'];
  tableColumns = [
    { label: 'Status', value: 'solved' },
    { label: 'LeetCode', value: 'leetcode_number' },
    { label: 'Title', value: 'name' },
    { label: 'Difficulty', value: 'difficulty' },
    { label: 'Star', value: 'starred' },
  ];
  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  expandedIndex = 0;

  data: any = [
    {
      solved: true,
      difficulty: 3,
      starred: true,
      name: 'Word Search II',
      leetcode_number: 212,
      url: 'https://leetcode.com/problems/word-search-ii/',
    },
    {
      solved: false,
      difficulty: 4,
      starred: false,
      name: 'Palindrome Partitioning II',
      leetcode_number: 132,
      url: 'https://leetcode.com/problems/palindrome-partitioning-ii/',
    },
    {
      solved: false,
      difficulty: 2,
      starred: false,
      name: 'Regular Expression Matching',
      leetcode_number: 10,
      url: 'https://leetcode.com/problems/regular-expression-matching/',
    },
  ];

  onStarQuestion(row: any) {
    row.starred = !row.starred;
  }

  onSolveQuestion(row: any) {
    console.log(row);
    this.updateScore();
  }

  updateScore() {
    this.totalQuestions = this.data.length;
    this.solvedQuestions = 0;

    for (const question of this.data) {
      {
        if (question.solved) {
          this.solvedQuestions++;
        }
      }
    }

    if (this.totalQuestions) {
      this.solvedPercentage = Math.round(
        (this.solvedQuestions / this.totalQuestions) * 100
      );
    }
  }
}
