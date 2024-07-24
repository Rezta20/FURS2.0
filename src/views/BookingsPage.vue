<template>
  <div>
    <h1>Bookings</h1>
    <el-form @submit.native.prevent="addBooking">
      <el-form-item>
        <el-date-picker
          v-model="newBooking.date"
          type="date"
          placeholder="Select Date"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-input v-model="newBooking.petName" placeholder="Pet Name"></el-input>
      </el-form-item>
      <el-button type="primary" @click="addBooking">Add Booking</el-button>
    </el-form>
    <el-table :data="bookings">
      <el-table-column prop="date" label="Date"></el-table-column>
      <el-table-column prop="petName" label="Pet Name"></el-table-column>
      <el-table-column label="Actions">
        <template #default="scope">
          <el-button size="mini" @click="editBooking(scope.$index)">Edit</el-button>
          <el-button size="mini" type="danger" @click="deleteBooking(scope.$index)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useBookingStore } from "@/stores/booking";

export default defineComponent({
  name: "BookingsPage",
  setup() {
    const bookingStore = useBookingStore();
    const newBooking = ref({ date: "", petName: "" });
    const bookings = bookingStore.bookings;

    const addBooking = () => {
      bookingStore.addBooking(newBooking.value);
      newBooking.value = { date: "", petName: "" };
    };

    const editBooking = (index: number) => {
      // 編輯預約的邏輯
    };

    const deleteBooking = (index: number) => {
      bookingStore.deleteBooking(index);
    };

    return { newBooking, bookings, addBooking, editBooking, deleteBooking };
  },
});
</script>
