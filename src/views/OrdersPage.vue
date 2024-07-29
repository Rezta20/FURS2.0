<template>
  <div>
    <el-row class="header-row" type="flex" align="middle">
      <el-col :span="12">
        <h1>訂單頁面</h1>
      </el-col>
      <el-col :span="12" class="align-right">
        <el-button type="primary" plain @click="$router.push('/orders/createOrder')"
          >新增訂單</el-button
        >
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="6" :lg="6">
        <el-input
          v-model="searchOrderNumber"
          placeholder="搜尋訂單號碼"
          clearable
          :prefix-icon="Search"
          @clear="fetchOrders"
        ></el-input>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" :lg="6">
        <el-date-picker
          v-model="searchDate"
          type="date"
          placeholder="選擇訂單日期"
          @change="fetchOrders"
          clearable
          style="width: 100%"
        ></el-date-picker>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" :lg="6">
        <el-input
          v-model="searchCustomerName"
          placeholder="搜尋客戶名字"
          clearable
          :prefix-icon="Search"
          @clear="fetchOrders"
        ></el-input>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6" :lg="6">
        <el-input
          v-model="searchCustomerPhone"
          placeholder="搜尋客戶電話"
          clearable
          :prefix-icon="Search"
          @clear="fetchOrders"
        ></el-input>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="24">
        <el-table :data="filteredOrders" stripe>
          <el-table-column prop="orderNumber" label="訂單號碼" sortable></el-table-column>
          <el-table-column prop="orderDate" label="訂單日期" sortable></el-table-column>
          <el-table-column prop="customerName" label="客戶名字"></el-table-column>
          <el-table-column prop="customerPhone" label="客戶電話"></el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row justify="center" style="margin-top: 20px">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalOrders"
        :page-size="pageSize"
        @current-change="handlePageChange"
      ></el-pagination>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { Search } from "@element-plus/icons-vue";

export default defineComponent({
  name: "OrdersPage",
  setup() {
    const searchDate = ref(null);
    const searchOrderNumber = ref("");
    const searchCustomerName = ref("");
    const searchCustomerPhone = ref("");
    const currentPage = ref(1);
    const pageSize = ref(10);

    const value1 = ref("");

    const orders = ref([
      // 示例数据
      {
        orderNumber: "12345",
        orderDate: "2024-07-20",
        customerName: "John Doe",
        customerPhone: "123456789",
      },
      {
        orderNumber: "67890",
        orderDate: "2024-07-21",
        customerName: "Jane Smith",
        customerPhone: "987654321",
      },
      {
        orderNumber: "54321",
        orderDate: "2024-07-22",
        customerName: "Alice Brown",
        customerPhone: "456789123",
      },
      {
        orderNumber: "09876",
        orderDate: "2024-07-23",
        customerName: "Bob Johnson",
        customerPhone: "654321987",
      },
      {
        orderNumber: "11223",
        orderDate: "2024-07-24",
        customerName: "Charlie Lee",
        customerPhone: "789456123",
      },
      {
        orderNumber: "44556",
        orderDate: "2024-07-25",
        customerName: "Diana Ross",
        customerPhone: "321654987",
      },
      {
        orderNumber: "77889",
        orderDate: "2024-07-26",
        customerName: "Evan Scott",
        customerPhone: "987123456",
      },
      {
        orderNumber: "99001",
        orderDate: "2024-07-27",
        customerName: "Frank White",
        customerPhone: "654789321",
      },
      {
        orderNumber: "22334",
        orderDate: "2024-07-28",
        customerName: "Grace Young",
        customerPhone: "321987654",
      },
      {
        orderNumber: "55667",
        orderDate: "2024-07-29",
        customerName: "Henry King",
        customerPhone: "789321654",
      },
      {
        orderNumber: "88900",
        orderDate: "2024-07-30",
        customerName: "Ivy Lewis",
        customerPhone: "123654789",
      },
      {
        orderNumber: "00112",
        orderDate: "2024-07-31",
        customerName: "Jack Brown",
        customerPhone: "456123789",
      },
    ]);

    const totalOrders = ref(orders.value.length);

    const filteredOrders = computed(() => {
      let filtered = orders.value;
      if (searchDate.value) {
        const date = new Date(searchDate.value);
        const dateString = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
          .toISOString()
          .split("T")[0];
        filtered = filtered.filter((order) => order.orderDate === dateString);
      }
      if (searchOrderNumber.value) {
        filtered = filtered.filter((order) => order.orderNumber.includes(searchOrderNumber.value));
      }
      if (searchCustomerName.value) {
        const searchNameLower = searchCustomerName.value.toLowerCase();
        filtered = filtered.filter((order) =>
          order.customerName.toLowerCase().includes(searchNameLower)
        );
      }
      if (searchCustomerPhone.value) {
        const phonePattern = new RegExp(searchCustomerPhone.value.replace(/[-]/g, "[-]?"));
        filtered = filtered.filter((order) => phonePattern.test(order.customerPhone));
      }
      totalOrders.value = filtered.length;
      return filtered.slice(
        (currentPage.value - 1) * pageSize.value,
        currentPage.value * pageSize.value
      );
    });

    const fetchOrders = () => {
      // Fetch orders from the backend or other source
      // This should update `orders` and `totalOrders`
    };

    const openNewOrderPage = () => {
      // 跳转到新增订单页面
    };

    const handlePageChange = (page: number) => {
      currentPage.value = page;
    };

    return {
      searchDate,
      searchOrderNumber,
      searchCustomerName,
      searchCustomerPhone,
      orders,
      totalOrders,
      pageSize,
      currentPage,
      filteredOrders,
      fetchOrders,
      openNewOrderPage,
      handlePageChange,
      Search,
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
.el-col {
  margin-bottom: 8px;
}
</style>
