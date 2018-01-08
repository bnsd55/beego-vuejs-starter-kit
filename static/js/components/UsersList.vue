<template>
    <section class="section">
    <div class="container">
      <b-field>
          <b-input v-model="searchUser" placeholder="Search..." type="search" icon="search">
          </b-input>
      </b-field>

      <a href="#" @click="addUserModal()" id="add-user" class="button is-primary">
            <b-icon icon="plus-circle"> </b-icon> <span>Add User</span>
      </a>

      <v-user v-for="item in getUsers()" :key="item.id" :user="item"></v-user>
    </div>
  </section>
</template>

<style scoped>

</style>

<script>
import VUser from "./User";
import VAddUserForm from "./AddUserForm";
export default {
  data: function() {
    return {
      searchUser: ""
    };
  },
  name: "v-users-list",
  computed: {
    users() {
      return this.$store.state.usersModule.allUsers;
    }
  },
  created() {
    this.$store.dispatch("getAllUsers");
  },
  components: {
    VUser,
    VAddUserForm
  },
  methods: {
    getUsers: function() {
      let searchUser = this.searchUser;

      if (searchUser != "") {
        return this.users.filter(function(user) {
          let userName = user.first_name + " " + user.last_name;
          return userName.toLowerCase().includes(searchUser.toLowerCase());
        });
      }

      return this.users;
    },
    addUserModal() {
      this.$modal.open({
        parent: this,
        component: VAddUserForm,
        hasModalCard: true
      });
    }
  }
};
</script>