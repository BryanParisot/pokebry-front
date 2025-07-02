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
  rarity?: any; // à adapter selon ton type exact
  item_type?: any; // idem
};

type CollectionStore = {
  collection: Card[];
  fetchCollection: () => Promise<void>;
  updateCard: (updatedCard: Card) => void;
  deleteCard: (id: number) => void;
};

export const useCollectionStore = create<CollectionStore>((set) => ({
  collection: [],
  fetchCollection: async () => {
    try {
      const res = await fetch("http://localhost:3000/api/collection/user/2");
      const data = await res.json();
      set({ collection: data.collection });
    } catch (error) {
      console.error("Erreur lors du chargement de la collection :", error);
    }
  },
  updateCard: (updatedCard) =>
    set((state) => ({
      collection: state.collection.map((card) =>
        card.id === updatedCard.id ? updatedCard : card
      ),
    })),
  deleteCard: (id) =>
    set((state) => ({
      collection: state.collection.filter((card) => card.id !== id),
    })),
}));
