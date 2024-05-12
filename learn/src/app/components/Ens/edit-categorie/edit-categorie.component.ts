import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieService } from '../../../services/categorie.service';
import { Categorie } from 'src/app/models/categorie';

@Component({
  selector: 'app-edit-categorie',
  templateUrl: './edit-categorie.component.html',
  styleUrls: ['./edit-categorie.component.css']
})
export class EditCategorieComponent implements OnInit {
  categoryId!: string;
  category: Categorie | undefined;
  selectedFile: any; 
  categoryData: Categorie = {
    _id: '',
    name: '',
    imageCat: ''
  };

  constructor(
    private categorieService: CategorieService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryId = params['id'];
      this.getCategoryById(this.categoryId);
    });
  }

  loadImage(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFile = file;
      this.categoryData.imageCat = file.name;
    }
  }
  

  getCategoryById(id:any): void {
    this.categorieService.getCategoryById(id).subscribe(
        data => {
          this.categoryData = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updateCategory(): void {
    this.categorieService.updateCategory(this.categoryData._id, this.categoryData).subscribe(
      response => {
        console.log('Category updated successfully:', response);
        this.router.navigate(['/categorie']); // Rediriger vers la liste des catégories après la mise à jour
      },
      error => {
        console.log('Error updating category:', error);
        // Gérer les erreurs ici
      }
    );
  }
}
