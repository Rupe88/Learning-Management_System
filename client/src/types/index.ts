// Common Types
export interface Course {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    price: number;
    instructor: string;
    rating: number;
    totalStudents: number;
    category: string;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    role: 'student' | 'instructor' | 'admin';
  }
  
 export interface Testimonial {
    id: number;
    name: string;
    role: string;
    avatar: string;
    content: string;
    rating: number;
  }
  
  
  export interface Feature {
    icon: React.FC<{ className?: string }>;
    title: string;
    description: string;
  }
  
  export interface FooterLink {
    title: string;
    href: string;
  }
  
  export interface FooterSection {
    title: string;
    links: FooterLink[];
  }