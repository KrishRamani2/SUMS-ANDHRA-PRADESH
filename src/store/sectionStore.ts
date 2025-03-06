/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

const useSectionStore = create((set) => ({
  selectedSection: null, // Holds the selected section data
  sections: [], // Holds all sections
  setSelectedSection: (section: any) => set({ selectedSection: section }), // Set the selected section
  addSection: (section: any) => set((state: { sections: any; }) => ({ sections: [...state.sections, section] })), // Add a new section
  updateSection: (id: any, updatedSection: any) => 
    set((state: { sections: any[]; }) => ({
      sections: state.sections.map((section: { id: any; }) =>
        section.id === id ? { ...section, ...updatedSection } : section
      ),
    })),
  deleteSection: (id: any) => 
    set((state: { sections: any[]; }) => ({ sections: state.sections.filter((section: { id: any; }) => section.id !== id) })),
}));

export default useSectionStore;