import { create } from "zustand";

interface UIState {
  isCategorySidebarOpen: boolean;
  toggleCategorySidebar: () => void;
  setCategorySidebarOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isCategorySidebarOpen: true,
  toggleCategorySidebar: () =>
    set((state) => ({ isCategorySidebarOpen: !state.isCategorySidebarOpen })),
  setCategorySidebarOpen: (open) => set({ isCategorySidebarOpen: open }),
}));
