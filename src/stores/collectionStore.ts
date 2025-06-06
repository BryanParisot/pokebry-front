// store/collectionStore.ts
import { create } from "zustand";

type Card = {
  id: number;
  user_id: number;
  name: string;
  edition: string;
  item_type_id: number;
  rarity_id: number;
  quality: number;
  purchase_price: string;
  estimated_value: string;
  image_url: string;
  created_at: string;
};

type CollectionStore = {
  collection: Card[];
  fetchCollection: () => Promise<void>;
};

export const useCollectionStore = create<CollectionStore>((set) => ({
  collection: [],
  fetchCollection: async () => {
    try {
      const res = await fetch("http://localhost:3000/api/collection/user/2");
      const data = await res.json();
      set({ collection: data.collection });
      console.log(data)
    } catch (error) {
      console.error("Erreur lors du chargement de la collection :", error);
    }
  },
}));