import { auth, googleAuthProvider, sendPasswordResetEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification, db, doc, setDoc, updateDoc, getDoc, arrayUnion } from './firebase';

export const registerUser = async (email, password, firstName, lastName, companyName, companyAddress, companyContactInfo) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await sendEmailVerification(user);

    const userDoc = doc(db, 'users', user.uid);
    await setDoc(userDoc, {
        companyName,
        companyAddress,
        companyContactInfo,
        membershipType: 'Enterprise',
        admins: [{ name: `${firstName} ${lastName}`, email }],
        ocrExtractionsCount: 0,
        chatDocQueriesCount: 0,
        uploadsCount: 0,
        contributors: [],
        isVerified: false,
    });
    return user;
};

export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (!userCredential.user.emailVerified) {
            throw new Error("Email not verified");
        }
        return userCredential;
    } catch (error) {
        throw error;
    }
};


export const logoutUser = async () => {
    return await signOut(auth);
};

export const resetPassword = async (email) => {
    return await sendPasswordResetEmail(auth, email);
};

// export const trackActivity = async (userId, activityType) => {
//     const userDoc = doc(db, 'users', userId);
//     const userSnapshot = await getDoc(userDoc);

//     if (userSnapshot.exists()) {
//         let updateData = {};
//         if (activityType === 'ocr') {
//             updateData = { ocrExtractionsCount: userSnapshot.data().ocrExtractionsCount + 1 };
//         } else if (activityType === 'chat') {
//             updateData = { chatDocQueriesCount: userSnapshot.data().chatDocQueriesCount + 1 };
//         } else if (activityType === 'upload') {
//             updateData = { uploadsCount: userSnapshot.data().uploadsCount + 1 };
//         }
//         await updateDoc(userDoc, updateData);
//     } else {
//         throw new Error('User does not exist');
//     }
// };

export const updateUserVerification = async (userId, isVerified) => {
    const userDoc = doc(db, 'users', userId);
    await updateDoc(userDoc, { isVerified });
};
