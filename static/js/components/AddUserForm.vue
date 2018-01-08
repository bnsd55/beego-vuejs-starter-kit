<template>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Add</p>
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
                <button class="button is-primary" @click="addUser()">Add</button>
            </footer>
        </div>
</template>

<script>
export default {
  data: function() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      gender: ""
    };
  },
  methods: {
    addUser() {
      let addedUser = {
        id: Math.floor(Math.random() * Math.floor(999999)),
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        gender: this.gender
      };

      this.$store.dispatch("addUser", addedUser);
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
