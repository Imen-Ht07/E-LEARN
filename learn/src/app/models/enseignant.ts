export class Enseignant {
    _id!: string; 
    Nom!: string;
    Prenom!: string;
    email!: string;
    password!: string;
    role!: 'enseignant';
    specialite!: string;
    dateNaissance!:string;
    cin!: number;
    tel!: number;
    adresse!: string;
    isVerified!: boolean;
}
