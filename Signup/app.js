import { auth, createUserWithEmailAndPassword, doc, setDoc, db } from "../firebaseConfig.js"


const fname = document.getElementById('firstname')
const lname = document.getElementById('lastname')
const email = document.getElementById('email')
const password = document.getElementById('password')
const rpassword = document.getElementById('repeat-password')
const signup = document.getElementById('signup')

signup.addEventListener('click', signUpHandler)

async function signUpHandler() {

    if (fname.value && lname.value && password.value && email.value && rpassword) {

        if (password.value.length > 8) {

            if (password.value == rpassword.value) {

                try {
                    const response = await createUserWithEmailAndPassword(auth, email.value, password.value)

                    if (response.user) {
                        addUser(response.user.uid)
                    }

                } catch (error) {
                    console.log(error.code)
                    console.log(error.message)

                    if (error.code == 'auth/invalid-email') {
                        alert('kindly add valid email')
                        email.value = '';
                        password.value = '';
                        rpassword.value = '';
                    }
                    else if (error.code == "auth/email-already-in-use") {
                        alert("auth/email-already-in-use")
                    }

                }
            }
            else {
                rpassword.style.border = "1px solid red";

                alert('Repeat password should be same')
            }

        } else {

            alert('Password should contain atleast 8 characters')
        }
    }
    else {
        alert('Please add all information')
    }

}


async function addUser(uid) {

    try {
        const response = await setDoc(doc(db, "users", uid), {
            firstname: fname.value,
            lastname: lname.value,
            email: email.value
        });

        fname.value = '';
        lname.value = '';
        email.value = '';
        password.value = '';
        rpassword.value = '';

        alert("login successffully")
        setTimeout(() => {
            window.location.href = '../Dashboard'
        }, 2000)

        window.location.href = '../Dashboard/dashboard.html'
    } catch (e) {
        console.error("Error adding document: ", e);
    }

}
