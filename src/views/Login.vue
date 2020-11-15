<template lang="html">
<div id="firebaseui-auth-container"></div>
</template>

<script>
import {
    ui
} from "../firebase";
import firebase from "firebase/app";
import "firebaseui/dist/firebaseui.css";

export default {
    mounted() {
        const uiConfig = {
            signInSuccessUrl: "/home",
            signInOptions: [
                "anonymous",
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
            ],
        };
        ui.start("#firebaseui-auth-container", uiConfig);
    },
};
</script>
