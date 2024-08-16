const auth = firebase.auth();
const db = firebase.firestore();

auth.onAuthStateChanged((user) => {
    if (user) {
        console.log('User is signed in:', user);
        document.getElementById('userEmail').textContent = user.email;

        document.getElementById('logoutBtn').addEventListener('click', () => {
            auth.signOut().then(() => {
                console.log('User signed out');
                window.location.href = 'signin.html';
            });
        });

        const postForm = document.getElementById('postForm');
        postForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('postTitle').value;
            const content = document.getElementById('postContent').value;

            db.collection('posts').add({
                title: title,
                content: content,
                user: user.uid,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                alert('Post Published');
                loadPosts();
            }).catch((error) => {
                console.error('Error publishing post:', error);
                alert(error.message);
            });
        });

        function loadPosts() {
            db.collection('posts')
                .where('user', '==', user.uid)
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => {
                    const postsList = document.getElementById('postsList');
                    postsList.innerHTML = '';
                    snapshot.forEach((doc) => {
                        const post = doc.data();
                        postsList.innerHTML += `<div><h5>${post.title}</h5><p>${post.content}</p></div>`;
                    });
                });
        }

        loadPosts();
    } else {
        console.log('No user is signed in');
        window.location.href = 'signin.html';
    }
});
