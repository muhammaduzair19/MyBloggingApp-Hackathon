import { auth, serverTimestamp, deleteDoc, query, orderBy, onAuthStateChanged, doc, getDoc, db, signOut, addDoc, collection, getDocs } from '../firebaseConfig.js'


const logout = document.getElementById('logout')
const postbtn = document.getElementById('post')
const content = document.getElementById('blog-area')
const blogTitle = document.getElementById('title')
const blogArea = document.getElementById('blogArea')
const authorname = document.getElementById('author-name')


let currentUser;
let editFlag = false
let globalPostId;

getBlog()

onAuthStateChanged(auth, (user) => {

    if (user) {
        const uid = user.uid;
        console.log(uid)
        userData(uid)
        currentUser = uid
        // ...
    } else {
        window.location.href = '../Login/login.html'
    }
});


async function userData(uid) {

    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {

        const { firstname, lastname } = docSnap.data();

        authorname.innerHTML = `${firstname} ${lastname}`
        document.querySelector('.user-name').innerHTML = `${firstname} ${lastname}`
        document.querySelector('#author-name').innerHTML = `${firstname} ${lastname}`

    } else {
        console.log("No such document!");
    }

}

logout.addEventListener('click', logoutHandler);

function logoutHandler() {
    signOut(auth).then(() => {
        // Sign-out successful.
        window.location.href = '../login/login.html'
    }).catch((error) => {
        // An error happened.
    });
}

postbtn.addEventListener('click', postBlog)

async function postBlog() {
    try {
        const response = await addDoc(collection(db, "posts"), {
            title: blogTitle.value,
            postContent: content.value,
            authorId: currentUser,

            time: serverTimestamp()
        });
        alert("Posted")
        blogTitle.value = '';
        content.value = '';
        getBlog();
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}


async function getAuthorData(authorUid) {


    const docRef = doc(db, "users", authorUid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data()
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}

async function updateBlog() {
    content.value = 
    blogTitle.value

    try {
        const washingtonRef = doc(db, "posts", postIdGlobal);
        const response = await updateDoc(washingtonRef, {
            postContent: postInputBox.value,
            authorId: currentLoggedInUser,
            postImageUrl: downloadURL
        });

        getPosts()
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

async function editBlog(postId) {
    editFlag = true
    postbtn.innerText = "Update"

    postbtn.removeEventListener('click', postBlog)
    postbtn.addEventListener('click', updateBlog)
    globalPostId = postId;
}


async function deleteBlog(postId) {

    await deleteDoc(doc(db, "posts", postId));
    alert("Your post deleted successfully")
    getBlog()
}



async function getBlog() {

    try {
        blogArea.innerHTML = ''

        const postsCollectionRef = collection(db, "posts");

        const sortedQuery = query(postsCollectionRef, orderBy("time", "desc"));

        // Fetch the documents based on the sorted query
        const querySnapshot = await getDocs(sortedQuery);

        querySnapshot.forEach(async (doc) => {

            let blogId = doc.id
            const { authorId, postContent, time, title } = doc.data()
            console.log(doc.data())
           

        

            const authorDetails = await getAuthorData(authorId)
            const { firstname, lastname } = authorDetails;
            const date = new Date(time.seconds * 1000 + time.nanoseconds / 1000000);


            const day = ('0' + date.getDate()).slice(-2);
            const month = date.toLocaleString('default', { month: 'short' });
            const year = date.getFullYear();
            const tyme = date.toLocaleTimeString([], { hour12: false });
            // Format the date string
            const formattedDate = `${day} ${month} ${year}`;


            const blogElement = document.createElement('div')
            blogElement.setAttribute('class', 'blog-container')
            const blogContent = `<div class="top">
            <img class="user-img" src="../user.jpg" alt="">
            <div class="user-data">
                <h2 class="blog-title">${title}</h2>
                <p class="user-name">${firstname} ${lastname}</p>
                <span>${formattedDate}</span>
            </div>
        </div>
        <div class="blog-space">
        ${postContent}
        </div>
        <div class="controls">
            <button onclick="deleteBlog('${blogId}')" class="delete">Delete</button>
            <button onclick="editBlog('${blogId}')" class="edit">Edit</button>
        </div>`

            blogElement.innerHTML = blogContent
            blogArea.appendChild(blogElement)
        });
    }
    catch (error) {
        console.log(error, "==>>error in get Posts")
    }
}

window.deleteBlog = deleteBlog;
window.editBlog = editBlog;