import { defineStore } from "pinia";

interface Booking {
  date: string;
  petName: string;
}

export const useBookingStore = defineStore("booking", {
  state: () => ({
    bookings: JSON.parse(localStorage.getItem("bookings") || "[]") as Booking[],
  }),
  actions: {
    addBooking(booking: Booking) {
      this.bookings.push(booking);
      localStorage.setItem("bookings", JSON.stringify(this.bookings));
    },
    updateBooking(index: number, booking: Booking) {
      this.bookings[index] = booking;
      localStorage.setItem("bookings", JSON.stringify(this.bookings));
    },
    deleteBooking(index: number) {
      this.bookings.splice(index, 1);
      localStorage.setItem("bookings", JSON.stringify(this.bookings));
    },
  },
});
