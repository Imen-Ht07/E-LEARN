import { Component } from '@angular/core';
import { CategorieService } from 'src/app/services/categorie.service';
import { Categorie } from 'src/app/models/categorie';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.css']
})
export class AddCategorieComponent {
  categoryData: Categorie = {
    _id: '',
    name: '',
    imageCat: ''
  };
  selectedFile: File | null = null;

  constructor(private categorieService: CategorieService) { }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.selectedFile = file;
    this.categoryData.imageCat = file.name;
  }

  createCategory(): void {
    if (!this.selectedFile) { // Correction : Vérifiez si this.selectedFile est null
      console.log('Veuillez sélectionner un fichier');
      return;
    }

    this.categorieService.createCategory(this.selectedFile, this.categoryData)
      .subscribe(
        response => {
          console.log('Catégorie ajoutée avec succès : ', response);
          // Réinitialiser les champs après l'ajout réussi
          this.resetFields();
        },
        error => {
          console.error('Erreur lors de l\'ajout de la catégorie : ', error);
        }
      );
  }

  resetFields(): void {
    this.categoryData = {
      _id: '',
      name: '',
      imageCat: ''
    };
    this.selectedFile = null;
  }
}
