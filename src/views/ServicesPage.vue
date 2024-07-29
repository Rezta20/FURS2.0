<template>
  <div>
    <el-row>
      <el-col :span="24">
        <h1>服務項目</h1>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <el-form @submit.native.prevent="addService">
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item :error="nameError">
                <el-input v-model="newService.name" placeholder="服務名稱" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item :error="priceError">
                <el-input
                  v-model.number="newService.price"
                  placeholder="價格"
                  type="number"
                  min="0"
                  @input="validatePrice"
                />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="addService" :icon="Plus">新增服務</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="24">
        <el-table :data="services">
          <el-table-column prop="name" label="服務名稱">
            <template #default="scope">
              <span style="color: var(--el-color-primary)">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="價格">
            <template #default="scope"> $ {{ scope.row.price }} </template>
          </el-table-column>
          <el-table-column>
            <template #default="scope">
              <el-button @click="openEditDialog(scope.$index, scope.row)" :icon="EditPen" />
              <el-button
                type="danger"
                @click="openDeleteDialog(scope.$index, scope.row)"
                :icon="Delete"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <EditServiceDialog v-model="editDialogVisible" :service="editService" @save="saveEditService" />
    <DeleteServiceDialog
      v-model="deleteDialogVisible"
      :serviceName="deleteServiceName"
      @confirm="confirmDeleteService"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ElMessage } from "element-plus";
import { Plus, EditPen, Delete } from "@element-plus/icons-vue";
import { useServiceStore } from "@/stores/service";
import EditServiceDialog from "@/components/service/EditServiceDialog.vue";
import DeleteServiceDialog from "@/components/service/DeleteServiceDialog.vue";
export default defineComponent({
  name: "ServicesPage",
  components: {
    EditServiceDialog,
    DeleteServiceDialog,
  },
  setup() {
    interface IService {
      name: string;
      price: any;
    }
    const serviceStore = useServiceStore();
    const services = serviceStore.services;

    const newService = ref<IService>({ name: "", price: "" });
    const nameError = ref("");
    const priceError = ref("");

    const editDialogVisible = ref(false);
    const editService = ref<IService>({ name: "", price: "" });
    const editIndex = ref<number | null>(null);

    const deleteDialogVisible = ref(false);
    const deleteServiceName = ref("");
    const deleteIndex = ref<number | null>(null);

    const openEditDialog = (index: number, service: IService) => {
      editService.value = { ...service };
      editIndex.value = index;
      editDialogVisible.value = true;
    };

    const saveEditService = () => {
      if (editIndex.value !== null) {
        serviceStore.updateService(editIndex.value, editService.value);
        editDialogVisible.value = false; // 關閉對話框
      }
    };

    const deleteService = (index: number) => {
      serviceStore.deleteService(index);
    };

    const addService = () => {
      const duplicateService = services.find((service) => service.name === newService.value.name);
      if (duplicateService) {
        ElMessage({
          message: "已存在相同服務項目，無法重複建立",
          type: "warning",
        });
        return;
      }

      if (validateForm()) {
        serviceStore.addService(newService.value);
        newService.value = { name: "", price: "" };
      }
    };

    const openDeleteDialog = (index: number, service: IService) => {
      deleteServiceName.value = service.name;
      deleteIndex.value = index;
      deleteDialogVisible.value = true;
    };

    const confirmDeleteService = () => {
      if (deleteIndex.value !== null) {
        serviceStore.deleteService(deleteIndex.value);
      }
    };

    const validatePrice = () => {
      if (newService.value.price < 0) {
        priceError.value = "價格不可為負數";
      } else if (newService.value.price == 0) {
        priceError.value = "價格不可為 0";
      } else {
        priceError.value = "";
      }
    };

    const validateForm = () => {
      if (!newService.value.name) {
        nameError.value = "請填寫服務名稱";
      } else {
        nameError.value = "";
      }

      if (newService.value.price === null || newService.value.price === undefined) {
        priceError.value = "請填寫價格並以數字輸入";
      }

      validatePrice();

      return !nameError.value && !priceError.value;
    };

    return {
      newService,
      deleteService,
      services,
      addService,
      openEditDialog,
      editDialogVisible,
      editService,
      editIndex,
      saveEditService,
      nameError,
      priceError,
      validatePrice,
      openDeleteDialog,
      deleteDialogVisible,
      deleteServiceName,
      confirmDeleteService,

      Delete,
      EditPen,
      Plus,
    };
  },
});
</script>

<style scoped></style>
