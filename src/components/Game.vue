<template>
  <div id="game">
    <StartingGame></StartingGame>
    <Room></Room>
    <Drawing />
  </div>
</template>

<script>
import StartingGame from "./StartingGame.vue";
import Room from "./Room.vue";
import Drawing from "./Drawing.vue";

export default {
  name: "Game",
  components: {
    StartingGame,
    Room,
    Drawing,
  },
};
</script>
