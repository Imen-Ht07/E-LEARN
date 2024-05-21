import { Component,OnInit } from '@angular/core';
import { Etudiant } from 'src/app/models/etudiant';
import { EtudiantService } from 'src/app/services/etudiant.service';
@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit{

  textsearch:any;
  currentIndex = -1;
    title = '';
    page = 1;
    count = 0;
    pageSize = 3;
    pageSizes = [3, 6, 9];
    etudiants: Etudiant[]=[];
    constructor( private EtudiantService:EtudiantService) { }
  
    ngOnInit() {
      this.getAll();
    }
  
    getAll(){
      this.EtudiantService.getAllEtudiants().subscribe((data) =>
      {
        this.etudiants = data
        console.log(data);
      } )
  
    }
   
    deleteEtud(etudiantSupp: Etudiant) {
      if(window.confirm('Vous voulez vraiment supprimé cet étudiant ?')) {
  
      this.EtudiantService.deleteEtudiant(etudiantSupp._id)
        .subscribe(
          () => {
            this.etudiants = this.etudiants.filter(tL => tL._id != etudiantSupp._id);
          }
        );}
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

    acceptEtud(id:any) {
      this.EtudiantService.accepterDemandeInscription(id).subscribe(
        (data) => {        
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      );
    };
    refuseEtude(id:any) {
      this.EtudiantService.refuserDemandeInscription(id).subscribe(
        (data) => {        
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      );
    };
    
//actualiser
  refresh(): void {
    window.location.reload();
}
  
  }
  