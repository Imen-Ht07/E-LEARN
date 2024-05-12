import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RessourcesService } from '../../../services/ressources.service';
import { Ressources } from 'src/app/models/ressources';
import { Categorie } from 'src/app/models/categorie';
import { CategorieService } from '../../../services/categorie.service';

@Component({
  selector: 'app-add-ressources',
  templateUrl: './add-ressources.component.html',
  styleUrls: ['./add-ressources.component.css']
})
export class AddRessourcesComponent implements OnInit {
  resource: Ressources = {
    _id:'',
    title: '',
    description:'',
    fileURL: ''
  };
  selectedFile: File | null = null;
  categories: Categorie[] = [];
  selectedCategoryId: string = '';

  constructor(
    private resourceService: RessourcesService, 
    private categorieService: CategorieService, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
      this.getAllCategories();
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.selectedFile = file;
    this.resource.fileURL = file.name;
  }

  onSubmit(): void {
    if (this.selectedFile) {
      this.resourceService.createResource(this.selectedFile, this.resource, this.selectedCategoryId).subscribe(
        response => {
          console.log('Ressource ajoutée avec succès:', response);
        },
        error => {
          console.error('Erreur lors de l\'ajout de la ressource:', error);
        }
      );
    } else {
      console.error('Veuillez sélectionner un fichier.');
    }
  }
  //CATEGORIE
  getAllCategories(): void {
    this.categorieService.getAllCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Erreur lors de la récupération des catégories : ', error);
      }
    );
  }

  onSelectCategory(categoryId: string): void {
    this.selectedCategoryId = categoryId;
  }
}
