import { defineStore } from "pinia";

interface Employee {
  name: string;
  position: string;
  contact: string;
}

export const useEmployeeStore = defineStore("employee", {
  state: () => ({
    employees: JSON.parse(localStorage.getItem("employees") || "[]") as Employee[],
  }),
  actions: {
    addEmployee(employee: Employee) {
      this.employees.push(employee);
      localStorage.setItem("employees", JSON.stringify(this.employees));
    },
    updateEmployee(index: number, employee: Employee) {
      this.employees[index] = employee;
      localStorage.setItem("employees", JSON.stringify(this.employees));
    },
    deleteEmployee(index: number) {
      this.employees.splice(index, 1);
      localStorage.setItem("employees", JSON.stringify(this.employees));
    },
  },
});
