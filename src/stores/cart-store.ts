import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { LocalCartItem } from "@/features/cart/types";

interface CartState {
  items: LocalCartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: LocalCartItem) => void;
  updateQuantity: (productId: string, variantId: string | undefined, quantity: number) => void;
  removeItem: (productId: string, variantId?: string) => void;
  clearLocalCart: () => void;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      addItem: (newItem) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) => i.productId === newItem.productId && i.variantId === newItem.variantId
          );
          if (existingIndex > -1) {
            const updated = [...state.items];
            updated[existingIndex].quantity += newItem.quantity;
            return { items: updated };
          }
          return { items: [...state.items, newItem] };
        });
      },
      updateQuantity: (productId, variantId, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter(
                (i) => !(i.productId === productId && i.variantId === variantId)
              ),
            };
          }
          return {
            items: state.items.map((i) =>
              i.productId === productId && i.variantId === variantId
                ? { ...i, quantity }
                : i
            ),
          };
        });
      },
      removeItem: (productId, variantId) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.variantId === variantId)
          ),
        }));
      },
      clearLocalCart: () => set({ items: [] }),
      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: "total_herbal_cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
