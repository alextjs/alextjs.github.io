import firebase from "firebase/compat";
import 'firebase/storage'
import {upload} from "./upload";

const firebaseConfig = {
    apiKey: "AIzaSyDni54burtpgZfDJ3yHRnZ5w93yju-F5pU",
    authDomain: "fe-upload-d96b6.firebaseapp.com",
    projectId: "fe-upload-d96b6",
    storageBucket: "fe-upload-d96b6.appspot.com",
    messagingSenderId: "24854954994",
    appId: "1:24854954994:web:d9a1fcf3079141e464216b"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage()




upload('#file', {
    multi: true,
    accept: ['.png', '.jpg', '.jpeg', '.gif'],
    onUpload(files) {
        files.forEach(file => {
           const ref = storage.ref(`images/${file.name}`)
            const task = ref.put(file)

            task.on('state_changed', snapshot => {
                const percentage = (snapshot.bytesTransferred / snapshot.totalBytes)
                console.log(percentage)
            }, error => {
                console.log(error)
            }, () => {
                console.log('Complete')
            })
        })
    }
})

console.log('app.js')