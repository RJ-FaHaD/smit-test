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
 
document.getElementById('editProfileForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const user = auth.currentUser;

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const cnic = document.getElementById('cnic').value;

    db.collection('users').doc(user.uid).update({
        firstName,
        lastName,
        cnic
    }).then(() => {
        alert('Profile updated successfully!');
    }).catch((error) => {
        console.error('Error updating profile:',);
    });
});

document.getElementById('resultForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const cnic = document.getElementById('cnic').value;
    const resultDiv = document.getElementById('result');

    resultDiv.innerHTML = '';

    db.collection('users').where('cnic', '==', cnic).get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                resultDiv.innerHTML = 'No student found with this CNIC.';
                return;
            }

            querySnapshot.forEach((doc) => {
                const studentId = doc.id;

                db.collection('marks').where('studentId', '==', studentId).get()
                    .then((marksSnapshot) => {
                        if (marksSnapshot.empty) {
                            resultDiv.innerHTML = 'No marks found for this student.';
                            return;
                        }

                        let resultHtml = '<h3>Student Results</h3><ul>';
                        marksSnapshot.forEach((markDoc) => {
                            const { course, marks, totalMarks, grade } = markDoc.data();
                            resultHtml += `<li>
                                <strong>Course:</strong> ${course} <br>
                                <strong>Marks:</strong> ${marks}/${totalMarks} <br>
                                <strong>Grade:</strong> ${grade}
                            </li>`;
                        });
                        resultHtml += '</ul>';

                        resultDiv.innerHTML = resultHtml;
                    })
                    .catch((error) => {
                        console.error('Error in fetching marks:');
                        resultDiv.innerHTML = 'Error in fetching marks.';
                    });
            });
        })
        .catch((error) => {
            console.error('Error in fetching student:', error);
            resultDiv.innerHTML = 'Error in fetching student information.';
        });
});
