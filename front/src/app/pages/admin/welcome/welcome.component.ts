import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { HistoryserviceService } from 'src/app/service/historyservice.service';
import { QuizService } from 'src/app/service/quiz.service';
import { ViewChild, ElementRef } from '@angular/core';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import { Point } from 'chart.js/dist/helpers/helpers.canvas';
import { Chart } from 'chart.js';
import { UserserviceService } from 'src/app/service/user.service';
import { map } from 'rxjs/operators';



interface User {
  username: string;
  profile: string;
  marks: number;
  quizName: string;
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent implements OnInit {


  history = [
    {
      Eid: '',
      uname: '',
      marks: '',
      date: '',
      correct_answer: '',
      attempted: '',
      quizId: '',
      quiz_name: ''
    }
  ]

 
  users: User[] = [];


  Api: any
  imageName: any;
  imageSrc:any
  iname:any;
  totalcount = 0;
  quizzTotal = 0;

  constructor(private _cat: CategoryService, private _quizz: QuizService, private _history: HistoryserviceService, private _user: UserserviceService) {
    this.history = [];
  }

  ngOnInit(): void {
    this._cat.totalCategory().subscribe(
      (data: any) => {
        // console.log(data);
        this.totalcount = data;
      }
    )
    this._quizz.totalQuizz().subscribe(
      (data: any) => {
        // console.log(data);
        this.quizzTotal = data;

      })
    this._history.getAllhistory().subscribe((data: any) => {
      this.history = data;
    });

    // continue
    this._user.getTopScorer().subscribe((response: any) => {
      // console.log(response);
      
      if (response && response.length) {
        this.users = response.map((data: any) => {
          return {
            username: data[0],
            profile: data[1],
            marks: parseInt(data[2]),
            quizName: data[3]
          }
        });
      }
    });


  }
  ngAfterViewInit(): void {
  
    this.Api = 'http://localhost:8081/user/post/image/';
    this.imageName = this.iname;
    this.imageSrc = this.Api + this.imageName;
  }

}





