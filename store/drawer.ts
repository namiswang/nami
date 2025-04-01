import { create } from 'zustand'

type DrawerOptions = {
  drawerType: 'front' | 'back' | 'slide',
  drawerPosition: 'left' | 'right',
  drawerStyle: { width: number },
}

type DrawerState = {
  drawerContent: JSX.Element | null,
  setDrawerContent: (content: JSX.Element | null) => void,
  drawerOptions: DrawerOptions,
  setDrawerOptions: (options: Partial<DrawerOptions>) => void,
}

export const useDrawerStore = create<DrawerState>((set) => ({
  drawerContent: null,
  setDrawerContent: (content) => set({ drawerContent: content }),

  drawerOptions: {
    drawerType: 'slide',
    drawerPosition: 'left',
    drawerStyle: { width: 300 }
  },
  setDrawerOptions: (options) => set((state) => ({
    drawerOptions: { ...state.drawerOptions, ...options }
  }))
}))
