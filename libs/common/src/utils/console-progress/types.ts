export interface Progress {
  progress(message: string): void;

  success(message?: string): void;

  error(message: string): void;
}

