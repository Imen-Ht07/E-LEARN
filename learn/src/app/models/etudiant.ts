export class Etudiant {
    _id!: string; 
    Nom!: string;
    Prenom!: string;
    email!: string;
    password!: string;
    role!: 'etudiant';
    cin!: number;
    dateNaissance!:string;
    Classe!: string;
    tel!: number;
    adresse!: string;
    isVerified!: boolean;
 }
