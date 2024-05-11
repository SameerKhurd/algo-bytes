import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
//import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { MatTableModule } from '@angular/material/table';
import { HomeComponent } from './pages/home/home.component';
import { QuestionTableComponent } from './common/question-table/question-table.component';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';

// Services
import { ThemeService } from './services/theme.service';
import { QuestionSectionComponent } from './common/question-section/question-section.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ProblemComponent } from './pages/problem/problem.component';

import { SplitterModule } from 'primeng/splitter';
import { PromptComponent } from './pages/problem/layout/prompt/prompt.component';
import { ChipsModule } from 'primeng/chips';

import { MonacoEditorModule, MONACO_PATH } from '@materia-ui/ngx-monaco-editor';
import { EditorComponent } from './pages/problem/layout/editor/editor.component';

import { ThemeModule } from './theme/theme.module';
import { lightTheme } from './theme/light-theme';
import { darkTheme } from './theme/dark-theme';
import { ResultComponent } from './pages/problem/layout/result/result.component';
import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
import { ApplicationService } from './services/http-services/application.service';
import { BookmarkService } from './services/http-services/bookmark.service';
import { SubmissionService } from './services/http-services/submission.service';
import { SubmissionsComponent } from './pages/problem/layout/submissions/submissions.component';
import { ProblemsComponent } from './pages/problems/problems.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    QuestionTableComponent,
    QuestionSectionComponent,
    ProblemComponent,
    PromptComponent,
    EditorComponent,
    ResultComponent,
    SubmissionsComponent,
    ProblemsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    ButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSlideToggleModule,
    MatCardModule,
    MatSortModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatRippleModule,
    NgbModule,
    MonacoEditorModule,
    SkeletonModule,
    // Prime NG
    ListboxModule,
    TooltipModule,
    TableModule,
    SplitterModule,
    DropdownModule,
    ProgressSpinnerModule,
    ChipsModule,
    ThemeModule.forRoot({
      themes: [lightTheme, darkTheme],
      active: 'light',
    }),
  ],
  providers: [
    ThemeService,
    {
      provide: MONACO_PATH,
      useValue: 'https://unpkg.com/monaco-editor@0.24.0/min/vs',
    },
    AuthService,
    DataService,
    BookmarkService,
    ApplicationService,
    SubmissionService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
