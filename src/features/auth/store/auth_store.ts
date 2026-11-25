import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  isHydrated: false | null;
  setAuth: (
    user: User,
    accessToken: string,
    refreshToken: string,
    isLoggedIn: boolean,
  ) => void;
  setHasHydrated: (hydrated: boolean) => void;
  logout: () => void;
}

export interface ReduxAuthState {
  user: User | null;
  isLoggedIn: boolean;
}

const initialState: ReduxAuthState = {
  user: null,
  isLoggedIn: true,
};

export const useAuthState = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoggedIn: false,
      isHydrated: null,
      setAuth: (
        user: User,
        accessToken: string,
        refreshToken: string,
        isLoggedIn: boolean,
      ) => {
        // set({ user, accessToken, refreshToken, isLoggedIn });
      },
      setHasHydrated: () => {},

      logout: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isLoggedIn: false,
        });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

export const useReduxAuthState = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { logout, setUsers } = useReduxAuthState.actions;
export default useReduxAuthState.reducer;

export const state = configureStore({
  reducer: {
    auth: useReduxAuthState.reducer,
  },
});
