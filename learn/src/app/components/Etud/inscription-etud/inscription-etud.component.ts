import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EtudiantService } from '../../../services/etudiant.service';

@Component({
  selector: 'app-inscription-etud',
  templateUrl: './inscription-etud.component.html',
  styleUrls: ['./inscription-etud.component.css']
})
export class InscriptionEtudComponent {
  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private EtudiantService: EtudiantService
  ) {
    this.signupForm = this.formBuilder.group({
      Nom: ['', Validators.required],
      Prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      Classe: ['', Validators.required],
      cin: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]], 
      dateNaissance: ['', Validators.required],
      tel : ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      adresse: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      return;
    }

    this.EtudiantService.registerEtudiant(this.signupForm.value)
      .subscribe(
        (data) => {
          console.log('Signup successful', data);
          // Réinitialiser le formulaire après l'inscription réussie
          this.signupForm.reset();
        },
        (error) => {
          console.log('Error during signup', error);
        }
      );
  }
}
