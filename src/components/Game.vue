<template>
  <div id="game">
    <StartingGame></StartingGame>
    <Room></Room>
  </div>
</template>

<script>
import StartingGame from "./StartingGame.vue";
import Room from "./Room.vue";

export default {
  name: "Game",
  components: {
    StartingGame,
    Room,
  },
};
</script>
