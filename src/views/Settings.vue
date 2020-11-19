<template>
  <div class="settings">
    <h1>Parametres</h1>
    <label for="name">Nouveau Pseudo</label>
    <input type="txt" name="name" v-model="name" />
    <button @click="updateName">Modifier</button>

    <p v-show="user.isAnonymous">
      Votre compte est anonyme, les données peuvent etre perdue lors d'une
      prochaine visite
    </p>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["user"]),
    ...mapGetters(["username"]),
  },
  data() {
    return {
      name: null,
    };
  },
  methods: {
    ...mapActions(["updateNameAction"]),
    updateName() {
      this.updateNameAction(this.name);
    },
  },
};
</script>
