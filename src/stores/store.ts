import { defineStore } from "pinia";

interface StoreInfo {
  name: string;
  address: string;
  contact: string;
  hours: string;
}

interface Service {
  name: string;
  price: string;
}

export const useStoreStore = defineStore("store", {
  state: () => ({
    storeInfo: JSON.parse(localStorage.getItem("storeInfo") || "{}") as StoreInfo,
    services: JSON.parse(localStorage.getItem("services") || "[]") as Service[],
  }),
  actions: {
    updateStoreInfo(storeInfo: StoreInfo) {
      this.storeInfo = storeInfo;
      localStorage.setItem("storeInfo", JSON.stringify(this.storeInfo));
    },
    addService(service: Service) {
      this.services.push(service);
      localStorage.setItem("services", JSON.stringify(this.services));
    },
    deleteService(index: number) {
      this.services.splice(index, 1);
      localStorage.setItem("services", JSON.stringify(this.services));
    },
  },
});
