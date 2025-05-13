import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Rarity {
  id: number;
  name: string;
}

interface RarityState {
  items: Rarity[];
  setitem: (item: Rarity[]) => void;
  fetchitem: () => Promise<void>;
}

export const useItemStore = create<RarityState>()(
  persist(
    (set) => ({
      items: [],
      setitem: (item) => set({ item }),
      fetchitem: async () => {
        try {
          const res = await fetch(
            "http://localhost:3000/api/collection/items"
          );
          const data = await res.json();
          set({ items: data });
          console.log("data")
        } catch (error) {
          console.error("Erreur lors du chargement des items :", error);
        }
      },
    }),
    {
      name: "item-store",
    }
  )
);
