import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.scss'
})
export class LessonComponent {
  public lesson: string =''

  constructor(private route: ActivatedRoute) {
    this.lesson = this.route.snapshot.paramMap.get('name')
  }
}
