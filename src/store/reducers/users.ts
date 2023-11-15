import { UserInitialState, UserSchema } from '@utils/types/auth'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: UserInitialState = {
  token: undefined,
  user: undefined,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      const { payload } = action
      state.token = payload
    },
    // setVerifyEmail: (state, action: PayloadAction<string>) => {
    //   const { payload } = action
    //   state.verifyEmail = payload
    // },
    updateUser: (state, action: PayloadAction<UserSchema>) => {
      const { payload } = action
      state.user = payload
    },
    // setActiveOrganization: (state, action: PayloadAction<IOrganizationSchema>) => {
    //   const { payload } = action
    //   state.activeOrganization = payload
    // },
    // setPermissions: (state, action: PayloadAction<IPERMISSIONS_ENUMS[]>) => {
    //   const { payload } = action
    //   state.permissions = payload
    // },
    // logout: (state) => {
    //   state.token = undefined
    //   state.user = undefined
    //   state.activeOrganization = undefined
    //   state.permissions = []
    // },
  },
})

// Action creators are generated for each case reducer function
export const {
  updateUser,
//   setVerifyEmail,
  setToken,
//   setActiveOrganization,
//   logout,
//   setPermissions,
} = userSlice.actions

export default userSlice.reducer
