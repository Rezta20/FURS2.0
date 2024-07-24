import { defineStore } from "pinia";

interface User {
  username: string;
  password: string;
}

export const useUserStore = defineStore("user", {
  state: () => ({
    users: JSON.parse(localStorage.getItem("users") || "[]") as User[],
    currentUser: null as User | null,
  }),
  actions: {
    login(username: string, password: string): boolean {
      const user = this.users.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {
        this.currentUser = user;
        return true;
      }
      return false;
    },
    register(newUser: User) {
      this.users.push(newUser);
      localStorage.setItem("users", JSON.stringify(this.users));
    },
    logout() {
      this.currentUser = null;
    },
  },
});
