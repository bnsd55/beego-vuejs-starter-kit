<template>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Edit</p>
            </header>
            <section class="modal-card-body">
                <b-field label="First Name">
                    <b-input
                        type="text"
                        v-model="first_name"
                        placeholder="Your first name"
                        required>
                    </b-input>
                </b-field>

                <b-field label="Last Name">
                    <b-input
                        type="text"
                        v-model="last_name"
                        placeholder="Your last name"
                        required>
                    </b-input>
                </b-field>

                <b-field label="Email">
                    <b-input
                        type="text"
                        v-model="email"
                        placeholder="Your email"
                        required>
                    </b-input>
                </b-field>
                
                <b-radio v-model="gender"
                    native-value="Male">
                    Male
                </b-radio>

                <b-radio v-model="gender"
                    native-value="Female">
                    Female
                </b-radio>

            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="$parent.close()">Close</button>
                <button class="button is-primary" @click="editUser()">Edit</button>
            </footer>
        </div>
</template>

<script>
export default {
  props: ["user"],
  data: function() {
    return {
      userIndex: this.$store.state.usersModule.allUsers.indexOf(this.user)
    };
  },
  beforeMount: function () {
      this.$store.dispatch('initializeTemp', this.user)
  },
  computed: {
    first_name: {
      get() {
        return this.$store.state.usersModule.editUser.first_name;
      },
      set(value) {
        this.$store.dispatch("updateUser", {
          field: "first_name",
          value: value
        });
      }
    },
    last_name: {
      get() {
        return this.$store.state.usersModule.editUser.last_name;
      },
      set(value) {
        this.$store.dispatch("updateUser", {
          field: "last_name",
          value: value
        });
      }
    },
    email: {
      get() {
        return this.$store.state.usersModule.editUser.email;
      },
      set(value) {
        this.$store.dispatch("updateUser", {
          field: "email",
          value: value
        });
      }
    },
    gender: {
      get() {
        return this.$store.state.usersModule.editUser.gender;
      },
      set(value) {
        this.$store.dispatch("updateUser", {
          field: "gender",
          value: value
        });
      }
    }
  },
  methods: {
    editUser: function() {
      this.$store.dispatch("submitUpdateUser", this.userIndex);
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
