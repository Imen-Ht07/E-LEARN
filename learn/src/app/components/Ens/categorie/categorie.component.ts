import { Component, OnInit } from '@angular/core';
import { CategorieService } from 'src/app/services/categorie.service';
import { Categorie } from 'src/app/models/categorie';


@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  searchQuery: string = '';
  categories: Categorie[] = [];
  filteredCategories: Categorie[] = [];
  selectedCategory: Categorie | null = null;
  constructor(private categorieService: CategorieService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categorieService.getAllCategories().subscribe(
      (categories) => {
        this.categories = categories;
        this.filteredCategories = categories;
      },
      (error) => {
        console.error('Erreur lors du chargement des catégories : ', error);
      }
    );
  }
  onSearch(): void {
    const query = this.searchQuery.trim().toLowerCase();
    if (query) {
      this.filteredCategories = this.categories.filter(category =>
        category.name.toLowerCase().includes(query)
      );
    } else {
      this.filteredCategories = this.categories;
    }
  }
  deleteCategory(categorie: Categorie){
    if (categorie && categorie._id && confirm(`Souhaitez-vous confirmer la suppression du fichier "${categorie.name}"?`)) {
    this.categorieService.deleteCategory(categorie._id).subscribe(
      () => {
        this.categories = this.categories.filter(cat => cat._id !== categorie._id);
      },
      (error) => {
        console.error('Erreur lors de la suppression de la catégorie : ', error);
      }
    );
  }
}
}