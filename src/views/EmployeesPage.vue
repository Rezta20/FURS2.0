<template>
  <div>
    <h1>Employees</h1>
    <el-form @submit.prevent="addEmployee">
      <el-form-item>
        <el-input v-model="newEmployee.name" placeholder="Employee Name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="newEmployee.position" placeholder="Position"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="newEmployee.contact" placeholder="Contact"></el-input>
      </el-form-item>
      <el-button type="primary" @click="addEmployee">Add Employee</el-button>
    </el-form>
    <el-table :data="employees">
      <el-table-column prop="name" label="Employee Name"></el-table-column>
      <el-table-column prop="position" label="Position"></el-table-column>
      <el-table-column prop="contact" label="Contact"></el-table-column>
      <el-table-column label="Actions">
        <template #default="scope">
          <el-button size="mini" @click="editEmployee(scope.$index)">Edit</el-button>
          <el-button size="mini" type="danger" @click="deleteEmployee(scope.$index)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { useEmployeeStore } from "@/stores/employee";
import { ref } from "vue";

export default {
  name: "EmployeesPage",
  setup() {
    const employeeStore = useEmployeeStore();
    const newEmployee = ref({ name: "", position: "", contact: "" });
    const employees = employeeStore.employees;

    const addEmployee = () => {
      employeeStore.addEmployee(newEmployee.value);
      newEmployee.value = { name: "", position: "", contact: "" };
    };

    const editEmployee = (index: any) => {
      // 編輯員工的邏輯
      console.log(index);
    };

    const deleteEmployee = (index: any) => {
      employeeStore.deleteEmployee(index);
    };

    return { newEmployee, employees, addEmployee, editEmployee, deleteEmployee };
  },
};
</script>
