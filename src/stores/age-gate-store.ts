import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AgeGateState {
  isVerified: boolean;
  verifyAge: () => void;
  resetAgeVerification: () => void;
}

export const useAgeGateStore = create<AgeGateState>()(
  persist(
    (set) => ({
      isVerified: false,
      verifyAge: () => set({ isVerified: true }),
      resetAgeVerification: () => set({ isVerified: false }),
    }),
    {
      name: "total_herbal_age_verified",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
