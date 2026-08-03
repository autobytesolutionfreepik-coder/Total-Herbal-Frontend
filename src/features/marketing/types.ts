import { ContactStatus } from "@/types/enums";

export interface NewsletterSubscriber {
  id: string;
  email: string;
  isSubscribed: boolean;
  createdAt: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: ContactStatus;
  createdAt: string;
}

export interface CreateContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}
