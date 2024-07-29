<template>
  <div>
    <el-form ref="orderForm" :model="orderForm" label-width="120px">
      <!-- 基本資訊 -->
      <el-form-item label="客戶姓名">
        <el-input v-model="orderForm.customerName"></el-input>
      </el-form-item>
      <el-form-item label="聯絡電話">
        <el-input v-model="orderForm.customerPhone"></el-input>
      </el-form-item>
      <el-form-item label="電子郵件">
        <el-input v-model="orderForm.customerEmail"></el-input>
      </el-form-item>
      <el-form-item label="預約日期與時間">
        <el-date-picker
          v-model="orderForm.appointmentDate"
          type="datetime"
          placeholder="選擇日期和時間"
        ></el-date-picker>
      </el-form-item>

      <!-- 寵物資訊 -->
      <el-form-item label="寵物姓名">
        <el-input v-model="orderForm.petName"></el-input>
      </el-form-item>
      <el-form-item label="寵物種類">
        <el-input v-model="orderForm.petType"></el-input>
      </el-form-item>
      <el-form-item label="寵物品種">
        <el-input v-model="orderForm.petBreed"></el-input>
      </el-form-item>
      <el-form-item label="寵物年齡">
        <el-input v-model="orderForm.petAge"></el-input>
      </el-form-item>
      <el-form-item label="寵物性別">
        <el-radio-group v-model="orderForm.petGender">
          <el-radio label="公">公</el-radio>
          <el-radio label="母">母</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="寵物體重">
        <el-input v-model="orderForm.petWeight"></el-input>
      </el-form-item>
      <el-form-item label="寵物健康狀況">
        <el-input type="textarea" v-model="orderForm.petHealth"></el-input>
      </el-form-item>
      <el-form-item label="寵物個性">
        <el-input v-model="orderForm.petPersonality"></el-input>
      </el-form-item>
      <el-form-item label="寵物是否會咬人">
        <el-switch v-model="orderForm.petBite"></el-switch>
      </el-form-item>

      <!-- 服務內容 -->
      <el-form-item label="所需服務">
        <el-select v-model="orderForm.services" multiple placeholder="選擇服務">
          <el-option
            v-for="service in services"
            :key="service.name"
            :label="service.name"
            :value="service.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="特殊要求">
        <el-input type="textarea" v-model="orderForm.specialRequests"></el-input>
      </el-form-item>
      <el-form-item label="過敏反應或敏感部位">
        <el-input type="textarea" v-model="orderForm.allergies"></el-input>
      </el-form-item>
      <el-form-item label="過往經驗">
        <el-input type="textarea" v-model="orderForm.previousExperiences"></el-input>
      </el-form-item>

      <!-- 額外選項 -->
      <el-form-item label="接送服務">
        <el-switch v-model="orderForm.pickupService"></el-switch>
      </el-form-item>
      <el-form-item label="寄宿服務">
        <el-switch v-model="orderForm.boardingService"></el-switch>
      </el-form-item>
      <el-form-item label="加購產品">
        <el-input type="textarea" v-model="orderForm.additionalProducts"></el-input>
      </el-form-item>

      <!-- 訂單資訊 -->
      <el-form-item label="訂單總金額">
        <el-input v-model="orderForm.totalAmount" type="number" :min="0"></el-input>
      </el-form-item>

      <el-button type="primary" plain @click="createOrder" style="margin-top: 20px"
        >建立訂單</el-button
      >
    </el-form>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useServiceStore } from "@/stores/service";

export default defineComponent({
  name: "NewOrderPage",
  setup() {
    const serviceStore = useServiceStore();
    const services = serviceStore.services;

    const orderForm = ref({
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      appointmentDate: "",
      petName: "",
      petType: "",
      petBreed: "",
      petAge: "",
      petGender: "",
      petWeight: "",
      petHealth: "",
      petPersonality: "",
      petBite: false,
      services: [],
      specialRequests: "",
      allergies: "",
      previousExperiences: "",
      pickupService: false,
      boardingService: false,
      additionalProducts: "",
      totalAmount: 0,
    });

    const createOrder = () => {
      // 创建订单逻辑
      // 跳转回订单页面，并将新订单显示在最上方
    };

    return {
      orderForm,
      services,
      createOrder,
    };
  },
});
</script>

<style scoped></style>
