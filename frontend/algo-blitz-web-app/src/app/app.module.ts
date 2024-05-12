import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';

//import { HttpClientModule } from '@angular/common/http';

// Services
import { ThemeService } from './services/theme.service';
import { HttpClientModule } from '@angular/common/http';
import { ProblemComponent } from './pages/problem/problem.component';

import { SplitterModule } from 'primeng/splitter';
import { PromptComponent } from './pages/problem/layout/prompt/prompt.component';
import { ChipsModule } from 'primeng/chips';

import { MonacoEditorModule, MONACO_PATH } from '@materia-ui/ngx-monaco-editor';
import { EditorComponent } from './pages/problem/layout/editor/editor.component';

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
import { RippleModule } from 'primeng/ripple';

@NgModule({
  declarations: [
    AppComponent,
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
    ButtonModule,
    MonacoEditorModule,
    SkeletonModule,
    // Prime NG
    ListboxModule,
    RippleModule,
    TooltipModule,
    TableModule,
    SplitterModule,
    DropdownModule,
    ProgressSpinnerModule,
    ChipsModule,
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
