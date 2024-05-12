import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

//
import { RessourcesService } from './services/ressources.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
//composants
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
//Enseignant
import { AddRessourcesComponent } from './components/Ens/add-ressources/add-ressources.component';
import { DashbordEnsComponent } from './components/Ens/dashbord-ens/dashbord-ens.component';
import { AddCategorieComponent } from './components/Ens/add-categorie/add-categorie.component';
import { CategorieComponent } from './components/Ens/categorie/categorie.component';
import { EditCategorieComponent } from './components/Ens/edit-categorie/edit-categorie.component';
//Admin
import { DashboardComponent } from './components/Admin/dashboard/dashboard.component';

//etudiant
import {CategorieEtudComponent} from './components/Etud/categorie/categorie.component';
import { DashbordEtudComponent } from './components/Etud/dashbord-etud/dashbord-etud.component';
import { RessourcesComponent } from './components/Ens/ressources/ressources.component';
import { CoursComponent } from './components/Etud/cours/cours.component';
import { EtudiantComponent } from './components/Admin/etudiant/etudiant.component';
import { EnseignantComponent } from './components/Admin/enseignant/enseignant.component';
import { InscriptionEtudComponent } from './components/Etud/inscription-etud/inscription-etud.component';
import { InscriptionEnsComponent } from './components/Ens/inscription-ens/inscription-ens.component';
import { LogoutComponent } from './components/logout/logout.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    RessourcesComponent,
    ContactComponent,
    AboutComponent,
    AddRessourcesComponent,
    DashbordEnsComponent,
    DashbordEtudComponent,
    AddCategorieComponent,
    CategorieComponent,
    EditCategorieComponent,
    CategorieEtudComponent,
    CoursComponent,
    EtudiantComponent,
    EnseignantComponent,
    DashboardComponent,
    UnauthorizedComponent,
    InscriptionEtudComponent,
    InscriptionEnsComponent,
    LogoutComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [RessourcesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
