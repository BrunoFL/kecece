<template>
  <div v-show="user" class="flex flex-col">
    <h1 class="text-2xl m-4">Parametres</h1>
    <p v-show="user.isAnonymous">Votre compte est anonyme, les données peuvent etre perdue lors d'une prochaine visite</p>
    <div class="m-4">
      <label for="name">Nouveau Pseudo</label>
      <input type="txt" name="name" v-model="name" />
      <button @click="updateName">Modifier</button>
    </div>
    <div class="m-4">
      <button v-on:click="deleteUserA" class="no-underline hover:no-underline ml-6 border-2 border-light-blue-500 border-opacity-100 rounded-full p-2 hover:bg-red-800">Supprimer le compte</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["user"]),
    ...mapGetters(["username"]),
    ...mapMutations(["SIGN_OUT"]),
  },
  data() {
    return {
      name: null,
    };
  },
  methods: {
    ...mapActions(["deleteUser"]),
    updateName() {
      this.updateNameAction(this.name);
    },
    deleteUserA() {
      console.log(this.user);
      this.$toast("Suppression du compte");
      this.deleteUser()
        .then(() => {
          this.$toast("Compte supprimé");
          this.$router.push("login");
        })
        .catch((error) => {
          this.$toast("Erreur suppression du compte");
          console.log(error);
        });
    },
  },
};
</script>
