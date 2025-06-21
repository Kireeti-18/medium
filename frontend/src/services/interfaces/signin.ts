export interface SigninResponse {
  data: {
    token: string;
    user: {
      email: string;
      id: string;
      name: string;
      avathar: string;
    };
  };
}

export interface SigininParmas {
  email: string;
  password: string;
  name?: string;
}
