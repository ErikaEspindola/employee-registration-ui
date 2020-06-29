import { SafeResourceUrl } from '@angular/platform-browser';
export interface ContactList {
    icon: string;
    text: string;
}

export interface EmployeeDetail {
    id: number;
    name: string;
    charge: string;
    team: string;
    profilePicture: string | SafeResourceUrl;
    professionalExperience: ProfessionalExperience[];
    skills: string[];
    contact: Contact;
}

export interface ProfessionalExperience {
    description: string;
    experienceImage: string | SafeResourceUrl;
}

export interface Contact {
    phone: string;
    cellPhone: string;
    workPhone: string;
    mail: string;
    facebook: string;
    linkedin: string;
    address: string;
}