import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "./sanity.types";
import { useUser } from "@clerk/nextjs";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface StoreState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  deleteCartProduct: (productId: string) => void;
  resetCart: () => void;
  getTotalPrice: () => number;
  getSubTotalPrice: () => number;
  getItemCount: (productId: string) => number;
  getGroupedItems: () => CartItem[];
  //   // favorite
  favoriteProduct: Product[];
  addToFavorite: (product: Product) => Promise<void>;
  removeFromFavorite: (productId: string) => void;
  resetFavorite: () => void;
  // discount
  discount: number;
  setDiscount: (amount: number) => void;
}

// Custom storage that includes user ID in the key
const createUserStorage = (userId: string | null) => ({
  getItem: (name: string) => {
    if (!userId) return null;
    const item = localStorage.getItem(`${name}-${userId}`);
    return item ? JSON.parse(item) : null;
  },
  setItem: (name: string, value: any) => {
    if (!userId) return;
    localStorage.setItem(`${name}-${userId}`, JSON.stringify(value));
  },
  removeItem: (name: string) => {
    if (!userId) return;
    localStorage.removeItem(`${name}-${userId}`);
  },
});

const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      items: [],
      favoriteProduct: [],
      addItem: (product, quantity = 1) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product._id === product._id
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product._id === product._id
                  ? { ...item, quantity: item.quantity + quantity, product }
                  : item
              ),
            };
          } else {
            return { items: [...state.items, { product, quantity }] };
          }
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.reduce((acc, item) => {
            if (item.product._id === productId) {
              if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 });
              }
            } else {
              acc.push(item);
            }
            return acc;
          }, [] as CartItem[]),
        })),
      deleteCartProduct: (productId) =>
        set((state) => ({
          items: state.items.filter(
            ({ product }) => product?._id !== productId
          ),
        })),
      resetCart: () => set({ items: [] }),
      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price = item.product.price ?? 0;
          const discount = item.product.discount ?? 0;
          const discountedPrice = discount > 0
            ? price - (price * discount) / 100
            : price;
          return total + discountedPrice * item.quantity;
        }, 0);
      },
      getSubTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price = item.product.price ?? 0;
          const discount = item.product.discount ?? 0;
          const discountedPrice = discount > 0
            ? price - (price * discount) / 100
            : price;
          return total + discountedPrice * item.quantity;
        }, 0);
      },
      getItemCount: (productId) => {
        const item = get().items.find((item) => item.product._id === productId);
        return item ? item.quantity : 0;
      },
      getGroupedItems: () => get().items,
      addToFavorite: (product: Product) => {
        return new Promise<void>((resolve) => {
          set((state: StoreState) => {
            const isFavorite = state.favoriteProduct.some(
              (item) => item._id === product._id
            );
            return {
              favoriteProduct: isFavorite
                ? state.favoriteProduct.filter(
                  (item) => item._id !== product._id
                )
                : [...state.favoriteProduct, { ...product }],
            };
          });
          resolve();
        });
      },
      removeFromFavorite: (productId: string) => {
        set((state: StoreState) => ({
          favoriteProduct: state.favoriteProduct.filter(
            (item) => item?._id !== productId
          ),
        }));
      },
      resetFavorite: () => {
        set({ favoriteProduct: [] });
      },
      discount: 0,
      setDiscount: (amount: number) => set({ discount: amount }),
    }),
    {
      name: "cart-store",
      storage: typeof window !== "undefined"
        ? createJSONStorage(() => createUserStorage(null))
        : undefined,
    }
  )
);

// Function to reinitialize store with user-specific storage
export const initializeStoreWithUser = (userId: string | null) => {
  if (typeof window !== "undefined") {
    useStore.persist.setOptions({
      storage: createJSONStorage(() => createUserStorage(userId)),
    });

    // If user changed, clear the previous state and rehydrate with user's data
    if (userId) {
      useStore.persist.rehydrate();
    } else {
      // For anonymous users, clear the cart
      useStore.getState().resetCart();
    }
  }
};

export default useStore;