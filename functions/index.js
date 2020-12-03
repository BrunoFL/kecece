const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const getGameByCode = async (code) => {
    const doc = await admin.firestore().collection("games").where("code", "==", code).where("finished", "==", false).where("started", "==", false).limit(1).get();
    if (doc.empty) {
        return null;
    } else {
        const game = doc.docs[0].data();
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

const getRandomArbitrary = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.createGame = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError("unauthenticated", "createGame must be called while authenticated.");
    }

    const uid = context.auth.uid;
    const name = context.auth.token.name || null;
    let cpt = 0;
    while (true) {
        const code = createCode();
        const doc = await getGameByCode(code);
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
            await admin
                .firestore()
                .collection("stats")
                .doc("LhfqSZs9SiUXqP0y059V")
                .update({
                    createdGames: FieldValue.increment(1),
                });
            const result = await admin.firestore().collection("games").add(game);
            game.id = result.id;
            return game;
        } else {
            if (cpt >= 10) {
                throw new functions.https.HttpsError("cancelled", "createGame too much tries");
            }
        }
        cpt++;
    }
});

exports.startGame = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError("unauthenticated", "startGame must be called while authenticated.");
    }

    const game = data.game;
    if (context.auth.uid != game.master) {
        throw new functions.https.HttpsError("unauthenticated", "startGame maste should be starte game");
    }
    const rounds = [
        {
            number: 0,
            parts: [],
        },
    ];
    const already = [];
    console.log;
    for (const player of game.players) {
        let index;
        do {
            index = getRandomArbitrary(0, 253);
        } while (already.includes(index));
        already.push(index);
        const doc = await admin.firestore().collection("words").where("index", "==", index).limit(1).get();
        rounds[0].parts.push({
            uid: player.uid,
            word: doc.docs[0].data().word,
        });
    }
    game.started = true;
    game.rounds = rounds;
    game.round = 0;

    await admin.firestore().collection("games").doc(game.id).set(game);
    return {};
});

exports.addPart = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError("unauthenticated", "startGame must be called while authenticated.");
    }
    const gameId = data.gameId;
    const draw = data.draw;
    const part = {
        uid: context.auth.uid,
        draw: draw
    };
    const gameRef = admin.firestore().collection("games").doc(gameId);
    await admin.firestore().runTransaction(async (t) => {
        const doc = await t.get(gameRef);
        const game = doc.data();
        game.rounds[game.round].parts.push(part);
        if (game.rounds[game.round].parts.length == game.players.length) {
            game.round++;
        }
        await t.update(gameRef, game);
    });
});
