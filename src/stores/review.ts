import { defineStore } from "pinia";

interface Review {
  customerName: string;
  reviewText: string;
  rating: number;
}

export const useReviewStore = defineStore("review", {
  state: () => ({
    reviews: JSON.parse(localStorage.getItem("reviews") || "[]") as Review[],
  }),
  actions: {
    addReview(review: Review) {
      this.reviews.push(review);
      localStorage.setItem("reviews", JSON.stringify(this.reviews));
    },
    updateReview(index: number, review: Review) {
      this.reviews[index] = review;
      localStorage.setItem("reviews", JSON.stringify(this.reviews));
    },
    deleteReview(index: number) {
      this.reviews.splice(index, 1);
      localStorage.setItem("reviews", JSON.stringify(this.reviews));
    },
  },
});
