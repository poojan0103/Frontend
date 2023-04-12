import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit {
  questions: any;
  questionForm!: FormGroup;
  currentPage: number = 1;
  survey: any;
  questionsPerPage: number = 2;
  update = false;
  constructor(
    private sevice: ProjectService,
    private fb: FormBuilder,
    private router: Router,
    private tostr: ToastrService
  ) {}

  ngOnInit(): void {
    this.questionForm = this.fb.group({});
    localStorage.getItem('formProgress');

    this.survey = localStorage.getItem('survey');
    const currentPageString = localStorage.getItem('currentPage');
    if (currentPageString && Number.isInteger(Number(currentPageString))) {
      this.currentPage = parseInt(currentPageString);
    }

    this.questionForm = this.fb.group({});

    localStorage.setItem('currentPage', JSON.stringify(this.currentPage));
    this.questions = this.sevice.questions(this.survey).subscribe((data) => {
      this.questions = data.result;

      this.questions.forEach((question: { id: any; answer: any }) => {
        this.questionForm.addControl(
          `${question.id}`,
          this.fb.control('', [Validators.required])
        );
      });
    });
  }
  onpreviousPage() {
    let formProgress = {
      answers: this.questionForm.value,
    };

    localStorage.setItem('currentPage', JSON.stringify(this.currentPage - 1));
    this.currentPage--;
    localStorage.setItem('formProgress', JSON.stringify(formProgress));
  }
  onnextPage() {
    const user = localStorage.getItem('id');
    const survey = localStorage.getItem('survey');

    const startIndex = (this.currentPage - 1) * this.questionsPerPage;
    const endIndex = startIndex + this.questionsPerPage;
    const pageQuestions = this.questions.slice(startIndex, endIndex);
    const pageAnswers: any = {};
    pageQuestions.forEach((question: { id: any }) => {
      pageAnswers[`${question.id}`] = this.questionForm.get(
        `${question.id}`
      )?.value;
    });

    let formProgress = {
      answers: this.questionForm.value,
    };

    localStorage.setItem('currentPage', JSON.stringify(this.currentPage + 1));
    const form = localStorage.setItem(
      'formProgress',
      JSON.stringify(formProgress)
    );
    this.currentPage++;

    let get: any;
    get = localStorage.getItem('formProgress')
      ? localStorage.getItem('formProgress')
      : '';

    get = get ? JSON.parse(get) : '';

    this.sevice
      .storeAnswer({ answer: pageAnswers, user, survey })
      .subscribe((data) => {
        localStorage.setItem('ansid', data._id);
      });
  }

  onFinish() {
    let formProgress = {
      answers: this.questionForm.value,
    };
    localStorage.setItem('formProgress', JSON.stringify(formProgress));
    let get = localStorage.getItem('formProgress')
      ? localStorage.getItem('formProgress')
      : '';
    get = get ? JSON.parse(get) : '';

    const answer = get;

    const points = localStorage.getItem('surveyid');

    const id = localStorage.getItem('id');

    const data = {
      points,
      id,
    };
    this.sevice.updatePoints(data).subscribe((data) => {});
    this.tostr.success('Survey Completed ', undefined, {
      timeOut: 2000,
      closeButton: true,
      progressBar: true,
    });

    this.router.navigateByUrl('/dashboard');

    const startIndex = (this.currentPage - 1) * this.questionsPerPage;
    const endIndex = startIndex + this.questionsPerPage;
    const pageQuestions = this.questions.slice(startIndex, endIndex);
    const pageAnswers: any = {};
    pageQuestions.forEach((question: { id: any }) => {
      pageAnswers[`${question.id}`] = this.questionForm.get(
        `${question.id}`
      )?.value;
    });
    const user = localStorage.getItem('id');
    const survey = localStorage.getItem('survey');
    this.sevice
      .storeAnswer({ answer: pageAnswers, user, survey })
      .subscribe((data) => {});
    localStorage.removeItem('currentPage');
  }
  isValid() {
    const startIndex = (this.currentPage - 1) *  this.questionsPerPage;
    const endIndex = startIndex + this.questionsPerPage;
    const pageQuestions = this.questions.slice(startIndex, endIndex);
    let valid = true
    pageQuestions.forEach((question: { id: any; }) => {
      if (!this.questionForm.get(`${question.id}`)?.value) {
        valid = false
      }
    });
    return valid
   
  }
  
}
