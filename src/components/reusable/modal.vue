<template>
  <div
    class="modal fade"
    id="resultModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="resultModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <!-- Centered and wider modal -->
      <div class="modal-content">
        <div class="modal-header text-white">
          <!-- Blue header -->
          <h5 class="modal-title" id="resultModalLabel">Result</h5>
        </div>
        <div class="modal-body overflow-auto">
          <!-- Scrollable body -->
          <pre>{{ result }}</pre>
          <!-- Gray text -->
        </div>
        <div class="modal-footer bg-light">
          <!-- Light background footer -->
          <button type="button" class="btn btn-danger" @click="hideModal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["result"],
  methods: {
    hideModal() {
      // Use jQuery to hide the modal
      $("#resultModal").modal("hide");
    },
  },
};
</script>

<style scoped>
/* Custom styles for the modal */

.modal-header {
  background-color: #5e72ce;
}

.modal-footer {
  border-top: none; /* Remove default border */
}

/* Additional styling for the pre tag */
.modal-body pre {
  max-height: 400px; /* Maximum height for the scrollable content */
  overflow-y: auto; /* Enable vertical scrolling */
  white-space: pre-wrap; /* Preserve line breaks and wrap long lines */
  color: black;
}
</style>
