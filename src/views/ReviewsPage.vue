<template>
  <div>
    <h1>Reviews</h1>
    <el-form @submit.native.prevent="addReview">
      <el-form-item>
        <el-input v-model="newReview.customerName" placeholder="Customer Name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="newReview.reviewText" placeholder="Review"></el-input>
      </el-form-item>
      <el-rate v-model="newReview.rating"></el-rate>
      <el-button type="primary" @click="addReview">Add Review</el-button>
    </el-form>
    <el-table :data="reviews">
      <el-table-column prop="customerName" label="Customer Name"></el-table-column>
      <el-table-column prop="reviewText" label="Review"></el-table-column>
      <el-table-column prop="rating" label="Rating"></el-table-column>
      <el-table-column label="Actions">
        <template #default="scope">
          <el-button size="mini" @click="editReview(scope.$index)">Edit</el-button>
          <el-button size="mini" type="danger" @click="deleteReview(scope.$index)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useReviewStore } from "@/stores/review";

export default defineComponent({
  name: "ReviewsPage",
  setup() {
    const reviewStore = useReviewStore();
    const newReview = ref({ customerName: "", reviewText: "", rating: 0 });
    const reviews = reviewStore.reviews;

    const addReview = () => {
      reviewStore.addReview(newReview.value);
      newReview.value = { customerName: "", reviewText: "", rating: 0 };
    };

    const editReview = (index: number) => {
      // 編輯評論的邏輯
    };

    const deleteReview = (index: number) => {
      reviewStore.deleteReview(index);
    };

    return { newReview, reviews, addReview, editReview, deleteReview };
  },
});
</script>
