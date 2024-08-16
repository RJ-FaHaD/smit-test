const auth = firebase.auth();

document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log('User signed up:', userCredential.user);
            alert('Sign Up Successful');
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            console.error('Sign Up Error:', error);
            alert(error.message);
        });
});

document.getElementById('signinForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signinEmail').value;
    const password = document.getElementById('signinPassword').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log('User signed in:', userCredential.user);
            alert('Sign In Successful');
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            console.error('Sign In Error:', error);
            alert(error.message);
        });
});
