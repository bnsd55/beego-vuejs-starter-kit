<template>
<div class="card">
  <header class="card-header">
    <p class="card-header-title">
      <span class="user-id">#{{user.id}}</span> 
      {{user.first_name}} {{user.last_name}} 
      <b-icon :icon="(user.gender == 'Female') ? 'venus' : 'mars'" size="is-small"></b-icon>
    </p>
  </header>
  <div class="card-content">
    <div class="content">
      <b-icon icon="envelope" size="is-small"></b-icon> {{user.email}}
    </div>
  </div>
  <footer class="card-footer">
    <a href="#" @click="editUserModal()" class="card-footer-item">Edit</a>
    <a href="#" @click="deleteUserModal()" class="card-footer-item">Delete</a>
  </footer>
</div>
</template>

<style scoped>
span.user-id {
  font-size: 23px;
  padding-right: 7px;
}

div.card {
  margin-bottom: 1%;
}
</style>

<script>
import VEditUserForm from './EditUserForm'
import VDeleteUserForm from './DeleteUserForm'

export default {
  name: "v-user",
  props: {
    user: {
      type: Object,
      default: {}
    }
  },
  methods: {
    editUserModal() {
      this.$modal.open({
        parent: this,
        component: VEditUserForm,
        hasModalCard: true,
        props: {
          user: this.user
        }
      });
    },
    deleteUserModal() {
      this.$modal.open({
        parent: this,
        component: VDeleteUserForm,
        hasModalCard: true,
        props: {
          user: this.user
        }
      });
    }
  }
};
</script>