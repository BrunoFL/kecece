<template>
<div class="settings">
    <h1>Parametres {{ plok }}</h1>
</div>
<User />
</template>

<script>
import User from "../components/User.vue";
export default {
    components: {
        User,
    },
    data: function () {
        return {
            plok: 5,
        };
    },
};
</script>
