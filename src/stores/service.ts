import { defineStore } from "pinia";

interface IService {
  name: string;
  price: number;
}

const localStorageKey = "services";

const loadServicesFromLocalStorage = (): IService[] => {
  try {
    const services = localStorage.getItem(localStorageKey);
    return services ? JSON.parse(services) : [];
  } catch (error) {
    console.error("Failed to load services from localStorage", error);
    return [];
  }
};

const saveServicesToLocalStorage = (services: IService[]) => {
  localStorage.setItem(localStorageKey, JSON.stringify(services));
};

export const useServiceStore = defineStore("service", {
  state: () => ({
    services: loadServicesFromLocalStorage(),
  }),
  actions: {
    addService(service: IService) {
      this.services.unshift(service); // 將新服務插入到數組的最前面
      saveServicesToLocalStorage(this.services);
    },
    updateService(index: number, service: IService) {
      this.services[index] = service;
      saveServicesToLocalStorage(this.services);
    },
    deleteService(index: number) {
      this.services.splice(index, 1);
      saveServicesToLocalStorage(this.services);
    },
  },
});
