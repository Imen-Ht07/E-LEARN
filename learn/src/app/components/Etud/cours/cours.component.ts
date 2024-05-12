import { Component , OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RessourcesService } from '../../../services/ressources.service';
import { Ressources } from 'src/app/models/ressources';
@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {
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
}
