<template>
  <div id="drawing" class="main">
    <div v-show="!this.readOnly" class="editor-container">
      <div class="editor">
        <div class="current-color" :style="{ backgroundColor: color }"></div>

        <Tool :event="() => undo()" :iconClass="'fas fa-undo-alt fa-lg'" />

        <Tool :event="() => redo()" :iconClass="'fas fa-redo-alt fa-lg'" />

        <Tool :event="() => clear()" :iconClass="'fas fa-trash-alt fa-lg'" />

        <Tool
          :event="() => setTool('freeDrawing', params)"
          :iconClass="'fas fa-pencil-alt fa-lg'"
          :class="{ 'active-tool': currentActiveMethod === 'freeDrawing' }"
        />

        <Tool
          :event="() => setTool('circle', params)"
          :iconClass="'far fa-circle fa-lg'"
          :class="{ 'active-tool': currentActiveMethod === 'circle' }"
        />

        <Tool
          :event="() => setTool('rect', params)"
          :iconClass="'far fa-square fa-lg'"
          :class="{ 'active-tool': currentActiveMethod === 'rect' }"
        />

        <Tool
          :event="() => setTool('arrow', params)"
          :iconClass="'fas fa-long-arrow-alt-down fa-lg'"
          :class="{ 'active-tool': currentActiveMethod === 'arrow' }"
        />
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
      <button @click="validate()">Valider le dessin</button>
      <Editor :canvasWidth="size" :canvasHeight="size" ref="editor" />
    </div>
  </div>
  <div v-show="this.readOnly">
    <button v-show="this.readOnly" @click="describe()">Valider</button>
    <img v-bind:src="this.imgData" />
  </div>
</template>

<script>
import Editor from "vue-image-markup";
import Tool from "@/components/Tool.vue";
import ColorPicker from "@/components/ColorPicker.vue";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import Base64String from "lz-string";
export default {
  name: "Drawing",
  components: {
    ColorPicker,
    Tool,
    Editor
  },
  data() {
    return {
      currentActiveMethod: null,
      params: null,
      color: "black",
      size: 500,
      readOnly: this.img != null,
      imgData: this.img ? Base64String.decompress(this.img) : ""
    };
  },
  props: {
    event: {
      type: Function
    },
    img: {
      type: String
    }
  },
  mounted() {
    this.params = { strokeWidth: "4" };
    this.setTool("freeDrawing", this.params);
  },
  methods: {
    saveImage() {
      const img = this.$refs.editor.saveImage();
      console.log("size ", img.length);
      var compressed = Base64String.compress(img);
      console.log("Size of compressed sample is: " + compressed.length);
      return compressed;
    },
    setTool(type, params) {
      console.log(params);
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
      //   const img = this.saveImage();
      //   console.log(img);
    },
    describe() {
      console.log("describe");
    }
  }
};
</script>

<style>
.main {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 50px;
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
