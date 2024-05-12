import { Component,OnInit } from '@angular/core';
import { Enseignant } from 'src/app/models/enseignant';
import { EnseignantService } from 'src/app/services/enseignant.service';
@Component({
  selector: 'app-enseignant',
  templateUrl: './enseignant.component.html',
  styleUrls: ['./enseignant.component.css']
})
export class EnseignantComponent implements OnInit{
  textsearch: any;
  currentIndex = -1;
  title = '';
  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];
  enseignants: Enseignant[] = [];

  constructor(private enseignantService: EnseignantService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.enseignantService.getAllEnseignants().subscribe((data) => {
      this.enseignants = data;
      console.log(data);
    });
  }

  deleteEnseignant(enseignantSupp: Enseignant) {
    if (window.confirm('Vous voulez vraiment supprimer cet enseignant ?')) {
      this.enseignantService.deleteEnseignant(enseignantSupp._id).subscribe(
        () => {
          this.enseignants = this.enseignants.filter(ens => ens._id != enseignantSupp._id);
        }
      );
    }
  }

  handlePageChange(event: any) {
    this.page = event;
    this.getAll();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getAll();
  }

  acceptEnseignant(id: any) {
    this.enseignantService.accepterDemandeInscription(id).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  refuseEnseignant(id: any) {
    this.enseignantService.refuserDemandeInscription(id).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  };

}
