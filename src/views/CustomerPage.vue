<template>
  <div>
    <el-row class="header-row" type="flex" align="middle">
      <el-col :span="12">
        <h1>客戶資料</h1>
      </el-col>
      <el-col :span="12" class="align-right">
        <el-button type="primary" icon="Plus" @click="saveCustomer">建立客戶</el-button>
      </el-col>
    </el-row>

    <el-form :model="customerForm">
      <el-form-item label="客戶姓名">
        <el-input v-model="customerForm.name" placeholder="請輸入客戶姓名"></el-input>
      </el-form-item>
      <el-form-item label="聯絡電話">
        <el-input v-model="customerForm.phone" placeholder="請輸入聯絡電話"></el-input>
      </el-form-item>
      <el-form-item label="電子郵件">
        <el-input v-model="customerForm.email" placeholder="請輸入電子郵件"></el-input>
      </el-form-item>
    </el-form>

    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="12">
        <h3>歷史訂單</h3>
        <el-table :data="customerForm.orders" stripe>
          <el-table-column prop="orderNumber" label="訂單號碼"></el-table-column>
          <el-table-column prop="orderDate" label="訂單日期"></el-table-column>
          <el-table-column prop="totalAmount" label="總金額"></el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12">
        <el-row class="flex-center">
          <el-col :span="12">
            <h3>寵物列表</h3>
          </el-col>
          <el-col :span="12" class="align-right">
            <el-button type="primary" icon="Plus" @click="openAddPetDialog">新增寵物</el-button>
          </el-col>
        </el-row>
        <el-table :data="pets" stripe>
          <el-table-column prop="name" label="寵物名字"></el-table-column>
          <el-table-column prop="type" label="寵物種類"></el-table-column>
          <el-table-column prop="breed" label="寵物品種"></el-table-column>
          <el-table-column prop="age" label="寵物年齡"></el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <AddPetDialog v-model="addPetDialogVisible" @add-pet="addPet" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useCustomerStore } from "@/stores/customer";
import { usePetStore } from "@/stores/pet";
import AddPetDialog from "@/components/customer/AddPetDialog.vue";

export default defineComponent({
  name: "CustomerPage",
  components: {
    AddPetDialog,
  },
  setup() {
    const router = useRouter();
    const customerStore = useCustomerStore();
    const petStore = usePetStore();
    const customerForm = ref({
      id: "",
      name: "",
      phone: "",
      email: "",
      pets: [],
      orders: [],
    });

    const addPetDialogVisible = ref(false);

    const pets = computed(() =>
      customerForm.value.pets
        .map((petId) => petStore.pets.find((pet) => pet.id === petId))
        .filter(Boolean)
    );

    const saveCustomer = () => {
      customerStore.saveCustomer(customerForm.value);
      // 保存後跳轉回客戶列表頁面
      router.push("/customers");
    };

    const openAddPetDialog = () => {
      addPetDialogVisible.value = true;
    };

    const addPet = (pet) => {
      petStore.addPet(pet);
      customerForm.value.pets.push(pet.id); // 將寵物ID加入客戶的pets字段中
    };

    return {
      customerForm,
      pets,
      addPetDialogVisible,
      saveCustomer,
      openAddPetDialog,
      addPet,
    };
  },
});
</script>

<style scoped>
.header-row {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flex-center {
  display: flex;
  align-items: center;
}
.align-right {
  text-align: right;
}
</style>
