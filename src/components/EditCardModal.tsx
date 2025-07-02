import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useCollectionStore } from "../stores/collectionStore";
import { useItemStore } from "../stores/useItemStore";
import { useRarityStore } from "../stores/useRarityStore";

// Types attendus
type Item = {
  id: string;
  name: string;
};

type Rarity = {
  id: string;
  name: string;
};

type Card = {
  id: string;
  name: string;
  edition: string;
  item_type: string;
  rarity: string;
  quality: number;
  purchasePrice: number;
  currentValue: number;
  image: string;
};

type FormData = {
  name: string;
  edition: string;
  item_type_id: string;
  rarity_id: string;
  quality: number;
  purchase_price: number;
  estimated_value: number;
  image_url: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  card: Card | null;
};

export const EditCardModal = ({ isOpen, onClose, card }: Props) => {
  const { rarities, fetchRarities } = useRarityStore();
  const { items, fetchitem } = useItemStore();
  const [formData, setFormData] = useState<FormData | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchRarities();
      fetchitem();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !card) return;

    if (items.length === 0 || rarities.length === 0) return; // attend que les listes soient prêtes

    const itemType = items.find((item) => item.name === card.item_type);
    const rarity = rarities.find((r) => r.name === card.rarity);

    setFormData({
      name: card.name || "",
      edition: card.edition || "",
      item_type_id: itemType?.id ?? "",
      rarity_id: rarity?.id ?? "",
      quality: card.quality ?? 1,
      purchase_price: card.purchasePrice ?? 0,
      estimated_value: card.currentValue ?? 0,
      image_url: card.image || "",
    });
  }, [isOpen, card, items, rarities]);
  
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [name]: type === "number" || type === "range" ? Number(value) : value,
      };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData || !card) return;

    const token = localStorage.getItem("authToken");

    try {
      const res = await fetch(
        `http://localhost:3000/api/collection/update-item/${card.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        const updatedCard = await res.json();
        useCollectionStore.getState().updateCard(updatedCard);
        toast.success("Carte mise à jour !");
        setFormData(null);
        onClose();
      } else {
        toast.error("Échec de la mise à jour de la carte.");
        console.log(formData)
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      toast.error("Une erreur est survenue.");
    }
  };

  if (!isOpen || !formData) return null;


  console.log("card.item_type", card.item_type);
  console.log("Tous les items disponibles :", items.map(i => i.name));

  

  if (!isOpen || !formData) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded shadow">Chargement...</div>
      </div>
    );
  }


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">Modifier la carte</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Item Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Type d'objet</label>
            <select
              name="item_type_id"
              value={formData.item_type_id}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            >
              {items.map(i => (
                <option key={i.id} value={i.id}>{i.name}</option>
              ))}
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Edition */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Édition</label>
            <input
              type="text"
              name="edition"
              value={formData.edition}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Rarity */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Rareté</label>
            <select
              name="rarity_id"
              value={formData.rarity_id}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            >
              {rarities.map(r => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>

          {/* Quality */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Qualité</label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                name="quality"
                min="1"
                max="10"
                value={formData.quality}
                onChange={handleChange}
                className="flex-grow"
              />
              <input
                type="number"
                min="1"
                max="10"
                name="quality"
                value={formData.quality}
                onChange={handleChange}
                className="w-16 border rounded p-1"
              />
            </div>
          </div>

          {/* Purchase Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Prix d'achat (€)</label>
            <input
              type="number"
              name="purchase_price"
              value={formData.purchase_price}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Estimated Value */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Valeur estimée (€)</label>
            <input
              type="number"
              name="estimated_value"
              value={formData.estimated_value}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700">URL de l'image</label>
            <input
              type="text"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                onClose();
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
