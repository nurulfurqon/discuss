export interface ProvidersProps {
  children: React.ReactNode
}

export interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}