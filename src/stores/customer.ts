import { defineStore } from "pinia";

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  pets: string[]; // 存放寵物的 id
  orders: Order[];
}

interface Order {
  id: string;
  orderNumber: string;
  orderDate: string;
  totalAmount: number;
}

const customers: Customer[] = [
  // 示例客戶數據
  {
    id: "1",
    name: "John Doe",
    phone: "123456789",
    email: "john@example.com",
    pets: [],
    orders: [],
  },
  // 更多客戶數據
];

export const useCustomerStore = defineStore("customer", {
  state: () => ({
    customers,
  }),
  actions: {
    fetchCustomers() {
      // 假設這裡會從後端獲取客戶數據並更新 customers 狀態
    },
    saveCustomer(customer: Customer) {
      const index = this.customers.findIndex((c: Customer) => c.id === customer.id);
      if (index !== -1) {
        this.customers[index] = customer;
      } else {
        this.customers.push(customer);
      }
      // 假設這裡會同步更新後端數據
    },
    deleteCustomer(id: string) {
      this.customers = this.customers.filter((c) => c.id !== id);
      // 假設這裡會同步更新後端數據
    },
    addPetToCustomer(customerId: string, petId: string) {
      const customer = this.customers.find((c) => c.id === customerId);
      if (customer) {
        customer.pets.push(petId);
      }
      // 假設這裡會同步更新後端數據
    },
  },
});
