<template>
  <div class="table_container">
    <h3 class="text-center">Customers routers</h3>
    <table class="table table-bordered">
      <thead>
        <tr class="table-primary text-center">
          <th scope="col">Router</th>
          <th v-for="field in filtredFields" :key="field" scope="col">
            {{ field }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredData" :key="item.id">
          <th class="table-primary text-center" scope="row">{{ item.id }}</th>
          <td class="text-center" v-for="field in filtredFields" :key="field">
            {{ item.data[field] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["dbData"],
  computed: {
    filteredData() {
      return this.dbData.filter((item) => Object.keys(item.data).length > 0);
    },
    filteredDataKeys() {
      const keys = [];
      for (const item of this.filteredData) {
        const dataKeysMap = new Map(Object.entries(item.data));
        const dataKeys = Array.from(dataKeysMap.keys());
        keys.push(
          dataKeys.filter(
            (key) =>
              key !== "ce_router" &&
              key !== "network_address" &&
              key !== "wildcard_mask"
          )
        );
      }
      return keys;
    },
    filtredFields() {
      return this.filteredDataKeys[0];
    },
  },
};
</script>

<style scoped>
h3 {
  color: #434656;
  margin-bottom: 20px;
}

.table_container {
  background-color: white;
  box-shadow: 0 2px 4px #5e72c2;
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
}
/* .table-primary,
th {
 
  color: #434656 !important;
} */
</style>
