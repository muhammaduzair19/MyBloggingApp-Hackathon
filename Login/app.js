import { signInWithEmailAndPassword, auth } from '../firebaseConfig.js'


const email = document.getElementById('email');
const password = document.getElementById('password');
const login = document.getElementById('login');

login.addEventListener('click', async () => {
    try {
        const response = await signInWithEmailAndPassword(auth, email.value, password.value)

        if (response.user) {
            window.location.href = '../Dashboard/dashboard.html'
        }

    } catch (error) {
        if (error.code == 'auth/user-not-found') {
            alert('kindly register your account')
            email.value = '';
            password.value = '';

        } else if (error.code == 'auth/wrong-password') {
            alert('kindly enter the correct password')
            password.value = '';
        }
    }
})