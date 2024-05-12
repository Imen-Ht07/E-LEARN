import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnseignantService } from '../../../services/enseignant.service';
@Component({
  selector: 'app-inscription-ens',
  templateUrl: './inscription-ens.component.html',
  styleUrls: ['./inscription-ens.component.css']
})
export class InscriptionEnsComponent {
  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private EnseignantService: EnseignantService
  ) {
    this.signupForm = this.formBuilder.group({
      Nom: ['', Validators.required],
      Prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      specialite: ['', Validators.required],
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

    this.EnseignantService.registerEnseignant(this.signupForm.value)
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
