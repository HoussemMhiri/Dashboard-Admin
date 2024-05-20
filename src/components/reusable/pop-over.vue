<template>
  <div class="pop_button">
    <button
      type="button"
      class="w-100"
      :class="[bgColor ? 'btn btn-danger' : 'btn btn-primary']"
      @click="togglePopover"
    >
      {{ bgColor ? "Remove" : "Submit" }}
    </button>
    <div v-if="isPopoverVisible" class="popover">
      <div class="popover-content">
        <p>Are you sure you want to submit this Configuration ?</p>
        <button
          type="button"
          class="btn btn-danger btn-sm"
          @click="hidePopover"
        >
          Cancel
        </button>
        <button
          type="button"
          class="btn btn-primary btn-sm"
          @click="submitForm"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["postData", "bgColor"],
  data() {
    return {
      isPopoverVisible: false,
    };
  },
  methods: {
    togglePopover() {
      this.isPopoverVisible = !this.isPopoverVisible;
    },
    hidePopover() {
      this.isPopoverVisible = false;
    },
    submitForm() {
      this.postData();
      console.log("Form submitted!");

      this.hidePopover();
    },
  },
};
</script>

<style scoped>
.pop_button {
  position: relative;
}
.popover {
  position: absolute;
  top: -50px;
  left: -290px;
  z-index: 1000;
  display: block;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
}

.popover-content {
  margin-bottom: 10px;
}

.btn {
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid transparent;
  margin: 0px 3px;
}
</style>
