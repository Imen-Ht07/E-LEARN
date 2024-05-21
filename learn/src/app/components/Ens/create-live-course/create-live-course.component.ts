import { Component } from '@angular/core';
import { LiveCourse } from '../../../models/live-course';
import { LiveCourseService } from '../../../services/live-course.service';
import { EtudiantService } from 'src/app/services/etudiant.service';
import { Etudiant } from 'src/app/models/etudiant';

@Component({
  selector: 'app-create-live-course',
  templateUrl: './create-live-course.component.html',
  styleUrls: ['./create-live-course.component.css']
})
export class CreateLiveCourseComponent {
  newLiveCourse: LiveCourse = {
    _id: '',
    title: '',
    description: '',
    LienMeet: '',
    startTime: '',
    duration: '',
    invitedStudents:[]
  };
  students: Etudiant[] = [];
  selectedStudentIds: string[] = [];

  constructor(private liveCourseService: LiveCourseService,
              private etudiantService: EtudiantService) {
    this.loadStudents();
  }

  loadStudents() {
    this.etudiantService.getAllEtudiants().subscribe(
      (data: Etudiant[]) => {
        this.students = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des étudiants :', error);
      }
    );
  }

  createLiveCourse(): void {
    this.newLiveCourse.invitedStudents = this.selectedStudentIds;
    this.liveCourseService.createLiveCourse(this.newLiveCourse).subscribe(
      (data: LiveCourse) => {
        console.log('Cours en direct créé avec succès :', data);
        alert('Le cours en direct a été créé avec succès!');
      },
      (error) => {
        console.error('Erreur lors de la création du cours en direct :', error);
        alert('Une erreur est survenue lors de la création du cours en direct.');
      }
    );
  }

  onSelectStudent(event: Event): void {
    const selectedOptions = (event.target as HTMLSelectElement).selectedOptions;
    this.selectedStudentIds = Array.from(selectedOptions).map(option => option.value);
  }
}
