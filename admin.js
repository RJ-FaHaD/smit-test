// Import the functions you need from the SDKs you need
 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
 import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
 import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyA92UHYwz1u52pwQ1iLYEVpuxTFkynuaMo",
   authDomain: "project-2-735f3.firebaseapp.com",
   projectId: "project-2-735f3",
   storageBucket: "project-2-735f3.appspot.com",
   messagingSenderId: "690344429277",
   appId: "1:690344429277:web:c38844ce38d23107de3d34",
   measurementId: "G-CHZHXHVZSV"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);
 const Auth = getAuth(app);
 const db = getFirestore(app);

  document.getElementById('addStudentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const cnic = document.getElementById('cnic').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            db.collection('users').doc(user.uid).set({
                firstName,
                lastName,
                email,
                cnic,
                userType: 'student'
            });

            alert('Student added successfully!');
        })
        .catch((error) => {
            console.error('Error adding student:', error);
        });
});

document.getElementById('uploadMarksForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const course = document.getElementById('course').value;
    const studentId = document.getElementById('studentId').value;
    const marks = parseFloat(document.getElementById('marks').value);
    const totalMarks = parseFloat(document.getElementById('totalMarks').value);
    const grade = document.getElementById('grade').value;

    db.collection('marks').add({
        course,
        studentId,
        marks,
        totalMarks,
        grade
    })
    .then(() => {
        alert('Marks uploaded successfully!');
    })
    .catch((error) => {
        console.error('Error uploading marks:', error);
    });
});
