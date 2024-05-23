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
  filteredStudents: Etudiant[] = [];

  constructor(private liveCourseService: LiveCourseService,
              private etudiantService: EtudiantService) {
    this.loadStudents();
  }

  loadStudents() {
    this.etudiantService.getAllEtudiants().subscribe(
      (data: Etudiant[]) => {
        this.students = data;
        this.filteredStudents = data; // Initialiser les étudiants filtrés
      },
      (error) => {
        console.error('Erreur lors de la récupération des étudiants :', error);
      }
    );
  }

  validateMeetLink(link: string): boolean {
    const pattern = /^(https?:\/\/)?(meet\.google\.com\/[a-zA-Z0-9\-]+)$/;
    return pattern.test(link);
  }

  createLiveCourse(): void {
    if (!this.validateMeetLink(this.newLiveCourse.LienMeet)) {
      alert('Veuillez entrer un lien Meet valide.');
      return;
    }

    this.newLiveCourse.invitedStudents = this.filteredStudents.map(student => student._id);
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

  filterStudentsByClass(event: Event): void {
    const selectedClass = (event.target as HTMLSelectElement).value;
    if (selectedClass) {
      this.filteredStudents = this.students.filter(student => student.Classe === selectedClass);
    } else {
      this.filteredStudents = this.students;
    }
  }
}
