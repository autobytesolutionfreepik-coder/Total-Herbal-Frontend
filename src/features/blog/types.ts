export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  _count?: {
    posts: number;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  authorName: string;
  categoryId: string;
  category?: BlogCategory;
  tags: string[];
  isPublished: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogQueryParams {
  q?: string;
  category?: string;
  tag?: string;
  page?: number;
  limit?: number;
}
