export type UserSchema = {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
  isVerified: boolean;
  isActive: boolean;
  avatar: string;
  role: string;
};
export type LoginPayload = {
  username: string;
  password: string;
};
// export type GenericResponse<T> = {
//   statusCode: number;
//   message: string;
//   data: T;
//   error?: {
//     data: {
//       message: string;
//     };
//   };
// };
export type AuthResponse = {
  status: number;
  data?: {
    token: string;
    user: UserSchema;
    message: string;
  };
  error?: {
    message: string;
  };
};

export type SignupPayload = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  confirmPassword?: string;
};

export type UserInitialState = {
  token?: string;
  user?: UserSchema;
  verifyUser?: UserSchema;
};
