import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Rarity {
  id: number;
  name: string;
}

interface RarityState {
  rarities: Rarity[];
  setRarities: (rarities: Rarity[]) => void;
  fetchRarities: () => Promise<void>;
}

export const useRarityStore = create<RarityState>()(
  persist(
    (set) => ({
      rarities: [],
      setRarities: (rarities) => set({ rarities }),
      fetchRarities: async () => {
        try {
          const res = await fetch(
            "http://localhost:3000/api/collection/rarities"
          );
          const data = await res.json();
          set({ rarities: data });
        } catch (error) {
          console.error("Erreur lors du chargement des raretés :", error);
        }
      },
    }),
    {
      name: "rarity-store",
    }
  )
);
