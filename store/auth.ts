import { create } from 'zustand'

type AuthState = {
  isLoggedIn: boolean
  user: string | null
  login: (user: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  login: (user) => set({ isLoggedIn: true, user }),
  logout: () => set({ isLoggedIn: false, user: null })
}))