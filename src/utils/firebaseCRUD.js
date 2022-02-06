import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "whatdoiwatch-256.firebaseapp.com",
  databaseURL: "https://whatdoiwatch-256-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "whatdoiwatch-256",
  storageBucket: "whatdoiwatch-256.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: "G-N0BRKFM93Q"
};

initializeApp(firebaseConfig);
const db = getFirestore();

const moviesCollectionRef = collection(db, "movies");
var movieClicked = ""

const makeMovieArray = querySnapshot => {
    if (!querySnapshot.docs && !querySnapshot.docs.length > 0) {
      throw new Error('No documents in db!');
    }
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getWatchedMovies = async () => {
    const q = query(moviesCollectionRef, where("watched", "==", true));
    const querySnapshot = await getDocs(q);
    const watchedMovies = makeMovieArray(querySnapshot);
    return watchedMovies;
}

export const getUnwatchedMovies = async () => {
    const q = query(moviesCollectionRef, where("watched", "==", false));
    const querySnapshot = await getDocs(q);
    const unwatchedMovies = makeMovieArray(querySnapshot);
    return unwatchedMovies
}

export const searchMovies = async searchTags => {
    const q = query(moviesCollectionRef, where("watched", "==", false), where("tags", "==",  searchTags));
    const querySnapshot = await getDocs(q);
    const movies = makeMovieArray(querySnapshot);
    const movie = movies[Math.floor(Math.random() * movies.length)];
    return movie;
}


