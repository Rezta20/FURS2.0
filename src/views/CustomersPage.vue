<template>
  <div>
    <el-row class="header-row" type="flex" align="middle">
      <el-col :span="12">
        <h1>客戶列表</h1>
      </el-col>
      <el-col :span="12" class="align-right">
        <el-button type="primary" icon="Plus" @click="$router.push('/customers/new')">
          新增客戶
        </el-button>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-input
          v-model="searchCustomerName"
          placeholder="搜尋客戶名字"
          clearable
          prefix-icon="Search"
          @clear="fetchCustomers"
        ></el-input>
      </el-col>
      <el-col :span="12">
        <el-input
          v-model="searchCustomerPhone"
          placeholder="搜尋客戶電話"
          clearable
          prefix-icon="Search"
          @clear="fetchCustomers"
        ></el-input>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="24">
        <el-table :data="filteredCustomers" stripe>
          <el-table-column prop="name" label="客戶名字"></el-table-column>
          <el-table-column prop="phone" label="客戶電話"></el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button @click="console.log('more')" icon="More" />
              <el-button @click="editCustomer(scope.row)" icon="EditPen" />
              <el-button @click="openDeleteDialog(scope.row)" type="danger" icon="Delete" />
              <el-button @click="console.log('create')" icon="Tickets" />
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <DeleteCustomerDialog
      v-model="deleteDialogVisible"
      :customerName="deleteCustomerName"
      @confirm="confirmDeleteCustomer"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useCustomerStore } from "@/stores/customer";
import DeleteCustomerDialog from "@/components/customer/DeleteCustomerDialog.vue";

export default defineComponent({
  name: "CustomersPage",
  components: {
    DeleteCustomerDialog,
  },
  setup() {
    const customerStore = useCustomerStore();
    const searchCustomerName = ref("");
    const searchCustomerPhone = ref("");

    const filteredCustomers = computed(() => {
      let customers = customerStore.customers;

      if (searchCustomerName.value) {
        customers = customers.filter((customer) =>
          customer.name.toLowerCase().includes(searchCustomerName.value.toLowerCase())
        );
      }

      if (searchCustomerPhone.value) {
        customers = customers.filter((customer) =>
          customer.phone.includes(searchCustomerPhone.value)
        );
      }

      return customers;
    });

    const fetchCustomers = () => {
      customerStore.fetchCustomers();
    };

    const editCustomer = (customer: any) => {
      this.$router.push(`/customers/${customer.id}`);
    };

    const deleteDialogVisible = ref(false);
    const deleteCustomerName = ref("");
    const deleteCustomerId = ref("");

    const openDeleteDialog = (customer: any) => {
      deleteCustomerName.value = customer.name;
      deleteCustomerId.value = customer.id;
      deleteDialogVisible.value = true;
    };

    const confirmDeleteCustomer = () => {
      customerStore.deleteCustomer(deleteCustomerId.value);
      deleteDialogVisible.value = false;
    };

    return {
      searchCustomerName,
      searchCustomerPhone,
      filteredCustomers,
      fetchCustomers,
      editCustomer,
      deleteDialogVisible,
      deleteCustomerName,
      openDeleteDialog,
      confirmDeleteCustomer,
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
.align-right {
  text-align: right;
}
</style>
