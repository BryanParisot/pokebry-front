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
  totalPurchasePrice: number;
  totalEstimatedValue: number;
  cardCount: number;
  fetchCollection: () => Promise<void>;
};

export const useCollectionStore = create<CollectionStore>((set) => ({
  collection: [],
  totalPurchasePrice: 0,
  totalEstimatedValue: 0,
  cardCount: 0,

  fetchCollection: async () => {
    try {
      const res = await fetch("http://localhost:3000/api/collection/user/2");
      const data = await res.json();

      const collection = data.collection;

      const totalPurchasePrice = collection.reduce(
        (sum: number, card: Card) => sum + parseFloat(card.purchase_price),
        0
      );

      const totalEstimatedValue = collection.reduce(
        (sum: number, card: Card) => sum + parseFloat(card.estimated_value),
        0
      );

      const cardCount = collection.length;

      set({
        collection,
        totalPurchasePrice,
        totalEstimatedValue,
        cardCount,
      });
    } catch (error) {
      console.error("Erreur lors du chargement de la collection :", error);
    }
  },
}));
