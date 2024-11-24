import { doc, updateDoc, increment } from "firebase/firestore";
import { auth, db } from "./firebase"; // Update the import path according to your structure

export const incrementChatQueries = async () => {
    if (auth.currentUser) {
        const userDoc = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userDoc, {
            chatDocQueriesCount: increment(1),
        });
    }
};

export const incrementOcrExtractions = async () => {
    if (auth.currentUser) {
        const userDoc = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userDoc, {
            ocrExtractionsCount: increment(1),
        });
    }
};
