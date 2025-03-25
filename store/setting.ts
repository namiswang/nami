import { create } from 'zustand'

type Setting = {
  mode: 'light' | 'dark'
  setMode: (newMode: 'light' | 'dark') => void
}

export const useSettingStore = create<Setting>((set) => ({
  mode: 'light',
  setMode: (newMode) => set({ mode: newMode })
}))