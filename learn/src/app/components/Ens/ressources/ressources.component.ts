import { Component , OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RessourcesService } from '../../../services/ressources.service';
import { Ressources } from 'src/app/models/ressources';

@Component({
  selector: 'app-ressources',
  templateUrl: './ressources.component.html',
  styleUrls: ['./ressources.component.css']
})
export class RessourcesComponent implements OnInit {
  resources: Ressources[] = [];
  categorieID!: string;
  constructor(private resourceService: RessourcesService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const categorieID = this.route.snapshot.paramMap.get('id');
      this.getAllResources(categorieID!);
  }

  getAllResources(categorieID:string): void {
    this.resourceService.getAllResources(categorieID).subscribe(
      (data: any) => {
        this.resources = data;

      },
      error => {
        console.error('Error fetching resources:', error);
      }
    );
}
isPDF(url: string): boolean {
  return url.toLowerCase().endsWith('.pdf');
}
onDelete(resource: Ressources) {
  if (resource && resource._id && confirm(`Souhaitez-vous confirmer la suppression du fichier "${resource.title}"?`)) {
    this.resourceService.deleteResource(resource._id).subscribe(
      () => {
        this.resources = this.resources.filter((r) => r._id !== resource._id);
      },
      (err) => console.error(err)
    );
  }
}
  
}

