import { UserInitialState, UserSchema } from '@utils/types/auth';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserInitialState = {
  token: undefined,
  user: undefined,
  verifyUser: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | undefined>) => {
      const { payload } = action;
      state.token = payload;
    },
    setVerifyEmail: (state, action: PayloadAction<any>) => {
      const { payload } = action;
      state.verifyUser = payload;
    },
    updateUser: (state, action: PayloadAction<UserSchema | undefined>) => {
      const { payload } = action;
      state.user = payload;
    },
    // setActiveOrganization: (state, action: PayloadAction<IOrganizationSchema>) => {
    //   const { payload } = action
    //   state.activeOrganization = payload
    // },
    // setPermissions: (state, action: PayloadAction<IPERMISSIONS_ENUMS[]>) => {
    //   const { payload } = action
    //   state.permissions = payload
    // },
    logout: (state) => {
      state.token = undefined;
      state.user = undefined;
    },
  },
});
export const {
  updateUser,
  setToken,
  //   setActiveOrganization,
  logout,
  setVerifyEmail,
} = userSlice.actions;

export default userSlice.reducer;
