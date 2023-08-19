import { serverTimestamp, where, query, orderBy, getDoc, db, collection, getDocs, doc } from '../firebaseConfig.js'



const blogArea = document.getElementById('blogArea')
const username = document.getElementById('username')
const user_name = document.getElementById('user-name')
const mailto = document.getElementById('Email')
const sellAll = document.querySelector('.seeAll')

const id = localStorage.getItem('id')
console.log(id)

getBlog(id);

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


async function getBlog(uid) {

    try {

        const q = query(collection(db, "posts"), where("authorId", "==", uid));

        const querySnapshot = await getDocs(q);

        // Fetch the documents based on the where query

        querySnapshot.forEach(async (doc) => {

            let blogId = doc.id
            const { authorId, postContent, time, title } = doc.data()


            const authorDetails = await getAuthorData(authorId)
            const { firstname, lastname, email } = authorDetails;
            console.log(firstname, lastname, email)
            user_name.innerHTML = `${firstname} ${lastname}`
            username.innerHTML = `${firstname} ${lastname}`
            mailto.innerHTML = email

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
        </div>`

            blogElement.innerHTML = blogContent

            console.log(blogElement)

            blogArea.appendChild(blogElement)
            localStorage.removeItem('id')

        });
    }
    catch (error) {
        console.log(error, "==>>error in get Posts")
    }
}



