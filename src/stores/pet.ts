import { defineStore } from "pinia";

interface Pet {
  id: string;
  name: string;
  type: string;
  breed: string;
  age: number;
}

const localStorageKey = "pets";

const loadPetsFromLocalStorage = (): Pet[] => {
  try {
    const pets = localStorage.getItem(localStorageKey);
    return pets ? JSON.parse(pets) : [];
  } catch (error) {
    console.error("Failed to load pets from localStorage", error);
    return [];
  }
};

const savePetsToLocalStorage = (pets: Pet[]) => {
  localStorage.setItem(localStorageKey, JSON.stringify(pets));
};

export const usePetStore = defineStore("pet", {
  state: () => ({
    pets: loadPetsFromLocalStorage(),
  }),
  actions: {
    addPet(pet: Pet) {
      this.pets.unshift(pet); // 將新寵物插入到數組的最前面
      savePetsToLocalStorage(this.pets);
    },
    deletePet(id: string) {
      this.pets = this.pets.filter((pet) => pet.id !== id);
      savePetsToLocalStorage(this.pets);
    },
  },
});
