<template>
  <table class="table table-bordered">
    <thead>
      <tr>
        <th scope="col">Router</th>
        <th v-for="field in filtredFields" :key="field" scope="col">
          {{ field }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in filteredData" :key="item.id">
        <th scope="row">{{ item.id }}</th>
        <td v-for="field in filtredFields" :key="field">
          {{ item.data[field] }}
        </td>
      </tr>
    </tbody>
  </table>
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
        keys.push(dataKeys);
      }
      return keys;
    },
    filtredFields() {
      return this.filteredDataKeys[0];
    },
  },
};
</script>

<style></style>
