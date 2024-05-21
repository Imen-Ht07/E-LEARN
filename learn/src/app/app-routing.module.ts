import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
//
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
//enseignant
import { DashbordEnsComponent } from './components/Ens/dashbord-ens/dashbord-ens.component';
import { AddRessourcesComponent } from './components/Ens/add-ressources/add-ressources.component';
import { AddCategorieComponent } from './components/Ens/add-categorie/add-categorie.component';
import { CategorieComponent } from './components/Ens/categorie/categorie.component';
import { RessourcesComponent } from './components/Ens/ressources/ressources.component';
import { EditCategorieComponent } from './components/Ens/edit-categorie/edit-categorie.component';
import { InscriptionEnsComponent } from './components/Ens/inscription-ens/inscription-ens.component';
import { CreateLiveCourseComponent } from './components/Ens/create-live-course/create-live-course.component';
//admin
import { DashboardComponent } from './components/Admin/dashboard/dashboard.component';
import { EtudiantComponent } from './components/Admin/etudiant/etudiant.component';
import { EnseignantComponent } from './components/Admin/enseignant/enseignant.component';
//Etud
import {CategorieEtudComponent} from './components/Etud/categorie/categorie.component';
import { CoursComponent } from './components/Etud/cours/cours.component';
import { DashbordEtudComponent } from './components/Etud/dashbord-etud/dashbord-etud.component';
import { InscriptionEtudComponent } from './components/Etud/inscription-etud/inscription-etud.component';
import { NotificationsComponent } from './components/Etud/notifications/notifications.component';
const routes: Routes = [
  {path:'unauthorized',component:UnauthorizedComponent},
  {path:'Ens/Inscri',component:InscriptionEnsComponent},
  {path:'contact',component:ContactComponent},
  {path:'about',component:AboutComponent},
  {path:'',component:HomeComponent},  
  {path:'login',component:LoginComponent},
  {path:'Etud/Inscri',component:InscriptionEtudComponent},
  //enseignant
  {path:'ressource/:id',component:RessourcesComponent , canActivate: [AuthGuard] ,  data: {role: 'enseignant'}},
  {path:'addRes',component:AddRessourcesComponent , canActivate: [AuthGuard] ,  data: {role: 'enseignant'}},
  {path:'Ens/dashboard',component:DashbordEnsComponent , canActivate: [AuthGuard] ,  data: {role: 'enseignant'}},
  {path:'addCat',component:AddCategorieComponent , canActivate: [AuthGuard] ,  data: {role: 'enseignant'}},
  {path:'categorie',component:CategorieComponent ,canActivate: [AuthGuard] ,  data: {role: 'enseignant'}},
  { path:'editCat/:id',component:EditCategorieComponent ,canActivate: [AuthGuard] ,  data: {role: 'enseignant'} },
  {path:'direct',component:CreateLiveCourseComponent , canActivate: [AuthGuard] ,  data: {role: 'enseignant'}},
  //etudiant
  {path:'categorieView',component:CategorieEtudComponent  , canActivate: [AuthGuard] ,  data: {role: 'etudiant'} },
  {path:'cours/:id',component:CoursComponent , canActivate: [AuthGuard] ,  data: {role: 'etudiant'}},
  {path:'Etud/dashboard',component:DashbordEtudComponent , canActivate: [AuthGuard] ,  data: {role: 'etudiant'}},
  {path:'notification',component:NotificationsComponent , canActivate: [AuthGuard] ,  data: {role: 'etudiant'}},
  //admin
  {path:'Admin/dashboard',component:DashboardComponent , canActivate: [AuthGuard] ,  data: {role: 'admin'}},
  {path:'ListEtud',component:EtudiantComponent , canActivate: [AuthGuard] ,  data: {role: 'admin'}},
  {path:'ListEns',component:EnseignantComponent , canActivate: [AuthGuard] ,  data: {role: 'admin'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
