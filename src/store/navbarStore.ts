import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface NavbarState {
  activeTab: string
  isExpanded: boolean
  setActiveTab: (tab: string) => void
  toggleNavbar: () => void
}

const useNavbarStore = create<NavbarState>()(
  persist(
    (set) => ({
      activeTab: 'Home',
      isExpanded: true,
      setActiveTab: (tab) => set({ activeTab: tab }),
      toggleNavbar: () => set((state) => ({ isExpanded: !state.isExpanded })),
    }),
    {
      name: 'navbar-storage',
    }
  )
)

export default useNavbarStore;