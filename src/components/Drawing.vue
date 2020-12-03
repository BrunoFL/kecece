<template>
  <div id="drawing" v-show="game.started" class="main">
    <div v-show="this.isDrawing" class="editor-container">
      <h1 class="mb-4">Dessiner 👉 {{ getWord }} 👈</h1>
      <div class="editor">
        <div class="current-color" :style="{ backgroundColor: color }"></div>

        <Tool :event="() => undo()" :iconClass="'fas fa-undo-alt fa-lg'" />

        <Tool :event="() => redo()" :iconClass="'fas fa-redo-alt fa-lg'" />

        <Tool :event="() => clear()" :iconClass="'fas fa-trash-alt fa-lg'" />

        <Tool :event="() => setTool('freeDrawing', params)" :iconClass="'fas fa-pencil-alt fa-lg'" :class="{ 'active-tool': currentActiveMethod === 'freeDrawing' }" />

        <Tool :event="() => setTool('circle', params)" :iconClass="'far fa-circle fa-lg'" :class="{ 'active-tool': currentActiveMethod === 'circle' }" />

        <Tool :event="() => setTool('rect', params)" :iconClass="'far fa-square fa-lg'" :class="{ 'active-tool': currentActiveMethod === 'rect' }" />

        <Tool :event="() => setTool('arrow', params)" :iconClass="'fas fa-long-arrow-alt-down fa-lg'" :class="{ 'active-tool': currentActiveMethod === 'arrow' }" />
      </div>
      <div class="colors">
        <ColorPicker :color="'#e40000'" :event="changeColor" />
        <ColorPicker :color="'#fce205'" :event="changeColor" />
        <ColorPicker :color="'#a834eb'" :event="changeColor" />
        <ColorPicker :color="'#65c31a'" :event="changeColor" />
        <ColorPicker :color="'#34b7eb'" :event="changeColor" />
        <ColorPicker :color="'#eb34df'" :event="changeColor" />
        <ColorPicker :color="'#00008b'" :event="changeColor" />
        <ColorPicker :color="'#000000'" :event="changeColor" />
      </div>
      <Editor :canvasWidth="size" :canvasHeight="size" ref="editor" />
      <button @click="validate()">Valider le dessin</button>
    </div>
  </div>
  <div v-show="!this.isDrawing">
    <button @click="describe()">Valider</button>
    <img v-bind:src="this.imgData" />
  </div>
</template>

<script>
import Editor from "vue-image-markup";
import Tool from "@/components/Tool.vue";
import ColorPicker from "@/components/ColorPicker.vue";
import Base64String from "lz-string";
import { mapState, mapGetters, mapMutations } from "vuex";
import { fcts } from "../firebase";

export default {
  name: "Drawing",
  components: {
    ColorPicker,
    Tool,
    Editor,
  },
  data() {
    return {
      currentActiveMethod: null,
      params: null,
      color: "black",
      size: 500,
      imgData: this.img ? Base64String.decompress(this.img) : "",
    };
  },
  mounted() {
    this.params = { strokeWidth: "4" };
    this.setTool("freeDrawing", this.params);
  },
  computed: {
    ...mapState(["game", "userData", "unsubscribe"]),
    ...mapGetters(["inGame", "gameStarted"]),
    ...mapMutations(["UPDATE_GAME", "LEAVE_GAME"]),
    getWord() {
      if (!this.game || !this.game.rounds || this.game.rounds.length == 0) return "";
      const round = this.game.rounds[this.game.round];
      const parts = round.parts;
      const word = parts.find((round) => round.uid == this.userData.uid);
      console.log(word);
      return word.word;
    },
  },
  methods: {
    isDrawing() {
      return this.game.round % 2 == 0;
    },
    saveImage() {
      const img = this.$refs.editor.saveImage();
      var compressed = Base64String.compress(img);
      return compressed;
    },
    setTool(type, params) {
      this.currentActiveMethod = type;
      this.$refs.editor.set(type, params);
    },
    setImage(img) {
      this.$refs.editor.uploadImage(img);
    },
    clear() {
      this.currentActiveMethod = this.clear;
      this.$refs.editor.clear();
    },
    changeColor(colorHex) {
      this.color = colorHex;
      this.$refs.editor.changeColor(colorHex);
    },
    undo() {
      this.currentActiveMethod = this.undo;
      this.$refs.editor.undo();
    },
    redo() {
      this.currentActiveMethod = this.redo;
      this.$refs.editor.redo();
    },
    validate() {
      const img = this.saveImage();
      const addPart = fcts.httpsCallable("addPart");
      addPart({
        gameId: this.game.id,
        draw: img,
      })
        .then(() => {
          this.$toast("Dessin validé");
        })
        .catch(() => {
          this.$toast("Erreur validation du dessin");
        });
    },
    describe() {
      console.log("describe");
    },
  },
};
</script>

<style>
.main {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  justify-content: center;
}
.main .editor-container {
  display: flex;
  flex-direction: column;
}
.main .editor-container .editor {
  display: flex;
  justify-content: space-between;
  margin: 0 15px;
}
.main .editor-container .editor .current-color {
  border-radius: 5px;
  min-width: 28px;
  min-height: 28px;
}
.main .editor-container .editor .active-tool {
  cursor: pointer;
  color: #4287f5;
}
.main .colors {
  display: flex;
  margin: 15px;
  align-items: center;
  justify-content: space-between;
}
.custom-editor {
  margin-top: 5px;
}
canvas,
img {
  border: 1px solid #021;
}
</style>
