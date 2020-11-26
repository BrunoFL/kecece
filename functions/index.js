const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const getGameByCode = async (code) => {
    const doc = await admin.firestore()
        .collection("games")
        .where("code", "==", code)
        .where("finished", "==", false)
        .where("started", "==", false)
        .limit(1)
        .get();
    if (doc.empty) {
        return null;
    } else {
        const game = doc.docs[0].data();
        console.log(game);
        return game;
    }
};

const createCode = () => {
    let code = "";
    for (let i = 0; i < 4; i++) {
        const nb = Math.floor(Math.random() * 26);
        code += String.fromCharCode(65 + nb);
    }
    return code;
};

exports.createGame = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError(
            "unauthenticated",
            "createGame must be called while authenticated."
        );
    }

    const uid = context.auth.uid;
    const name = context.auth.token.name || null;
    console.log(uid, name);
    let cpt = 0;
    while (true) {
        const code = createCode();
        console.log(cpt, code);
        const doc = await getGameByCode(code);
        console.log(doc);
        const FieldValue = require("firebase-admin").firestore.FieldValue;
        if (doc == null) {
            const game = {
                finished: false,
                started: false,
                code: code,
                players: [{ uid: uid, name: name }],
                rounds: [],
                master: uid,
            };
            console.log("createGame");
            const plok = await admin
                .firestore()
                .collection("stats")
                .doc("LhfqSZs9SiUXqP0y059V")
                .update({
                    createdGames: FieldValue.increment(1),
                });
            console.log(plok);
            const result = await admin.firestore()
                .collection("games")
                .add(game);
            game.id = result.id;
            return game;
        } else {
            if (cpt >= 10) {
                throw new functions.https.HttpsError(
                    "cancelled",
                    "createGame too much tries"
                );
            }
        }
        cpt++;
    }
});
