export interface eventType {
  type: 'commentsUpdate' | 'none';
  data?: {
    caseId?: string;
  };
}

export interface ISubscription {
  unsubscribe?: () => void;
  remove?: () => void;
}

export interface Observable {
  subscribe: (callback: {
    next: unknown;
    error?: (e: IObservableError) => void;
  }) => ISubscription;
}

export interface IObservableError {
  error: {errors: [{message: string}]};
}
