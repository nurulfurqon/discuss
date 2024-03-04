export interface ProvidersProps {
  children: React.ReactNode
}

export interface CreateTopicFormState {
  errors: {
    name?: string[]
    description?: string[]
    _form?: string[]
  }
}

export interface TopicShowPageProps {
  params: {
    slug: string
  }
}

export interface PostShowProps {
  postId: string
}

export interface PostCreateFormProps {
  slug: string
}

export interface CreatePostFormState {
  errors: {
    title?: string[]
    content?: string[]
    _form?: string[]
  }
}

export interface CreateCommentFormState {
  errors: {
    content?: string[];
    _form?: string[];
  };
  success?: boolean;
}

export interface SearchPageProps {
  searchParams: {
    term: string
  }
}