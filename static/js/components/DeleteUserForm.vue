<template>
    <form action="">
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Delete User</p>
            </header>
            <section class="modal-card-body">
                Are you sure you want to delete <strong>{{user.first_name}} {{user.last_name}}</strong> ?
            </section>
            <footer class="modal-card-foot">
                <button class="button is-primary" type="button" @click="deleteUser()">Yes</button>
                <button class="button" type="button" @click="$parent.close()">No</button>
            </footer>
        </div>
    </form>
</template>

<script>
export default {
  props: ["user"],
  methods: {
    deleteUser: function() {
      this.$store.dispatch("deleteUser", this.user.id);
      this.$parent.close();
    }
  }
};
</script>

<style scoped>
.modal-card {
  width: auto;
}
</style>
