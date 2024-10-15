import { atom } from 'jotai';

export interface ImageData {
  id: number;
  authors_work: string;
}

export interface Comment {
  // Define the structure for a Comment if you have specifics; for now, using a placeholder.
  id: number;
  content: string;
}

export interface PersonalInfo {
  id: number;
  date_joined: string;
  description: string;
  email: string;
  first_name: string;
  last_name: string;
  link_to_artstation: string | null;
  link_to_behance: string | null;
  link_to_instagram: string | null;
  link_to_portfolio: string | null;
  photo: string;
  rub: string;
  user_permissions: any[];
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  last_login: string | null;
  groups: any[];
}

export interface Course {
  id: number;
  description: string;
  cap: string;
  sales: number | null;
  money_sales: number | null;
  is_active: boolean;
  name: string;
  price: string;
  images_data: ImageData[];
  comment: Comment[];
  user: PersonalInfo;
}

// Default Course object
const defaultCourse: Course = {
  id: 0,
  name: '',
  description: '',
  price: '',
  cap: '',
  images_data: [],
  is_active: false,
  sales: null,
  money_sales: null,
  comment: [],
  user: {
    id: 0,
    date_joined: '',
    description: '',
    email: '',
    first_name: '',
    last_name: '',
    link_to_artstation: null,
    link_to_behance: null,
    link_to_instagram: null,
    link_to_portfolio: null,
    photo: '',
    rub: '',
    user_permissions: [],
    is_active: false,
    is_staff: false,
    is_superuser: false,
    last_login: null,
    groups: [],
  },
};

// Atoms for state management
export const productFormAtom = atom({
  name: '',
  description: '',
  price: '',
  fileList: [],
  capFile: null,
});
export const activeBtn = atom<boolean>(false);
export const idUser = atom<number>(0);
export const productCardsAtom = atom<Course[]>([]);
export const idAtom = atom<number>(0);
export const courseAtom = atom<Course>(defaultCourse);
export const personalInfoAtom = atom<PersonalInfo | null>(null);
export const loadAtom = atom<boolean>(false);
export const ForgotPasswordVisible = atom<boolean>(false);
export const ResetPasswordVisible = atom<boolean>(false);
