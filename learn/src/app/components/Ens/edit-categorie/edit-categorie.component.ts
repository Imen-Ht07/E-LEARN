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
  categoryData: Categorie = {
    _id: '',
    name: '',
    imageCat: ''
  };
  selectedFile: File | null = null;

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
    }
  }

  getCategoryById(id: any): void {
    this.categorieService.getCategoryById(id).subscribe(
      data => {
        this.categoryData = data;
      },
      error => {
        console.log(error);
      });
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('name', this.categoryData.name);
    if (this.selectedFile) {
      formData.append('imageCat', this.selectedFile, this.selectedFile.name);
    }
    
    this.categorieService.updateCategory(this.categoryData._id, formData).subscribe(
      response => {
        console.log('Category updated successfully:', response);
        this.router.navigate(['/categorie']); // Redirect to the category list after update
      },
      error => {
        console.log('Error updating category:', error);
        // Handle errors here
      }
    );
  }
}
