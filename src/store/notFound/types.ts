export interface INotFoundState {
  data: INotFoundData;
  setNotFound: (data: INotFoundData) => void;
}

export interface INotFoundData {
  title: string;
  message?: string;
  buttonLabel?: string;
  redirectUrl?: string;
}
