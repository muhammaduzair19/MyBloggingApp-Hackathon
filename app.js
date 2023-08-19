import { serverTimestamp, query, orderBy, getDoc, db, collection, getDocs, doc } from './firebaseConfig.js'



const blogArea = document.getElementById('blogArea')
const sellAll = document.querySelector('.seeAll')

getBlog();

async function getAuthorData(authorUid) {
    console.log(authorUid, "=>authorUid")


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


async function getBlog() {

    try {

        const postsCollectionRef = collection(db, "posts");

        const sortedQuery = query(postsCollectionRef, orderBy("time", "desc"));

        // Fetch the documents based on the sorted query
        const querySnapshot = await getDocs(sortedQuery);

        querySnapshot.forEach(async (doc) => {

            let blogId = doc.id
            const { authorId, postContent, time, title } = doc.data()
            console.log(doc.data())
            console.log(authorId, " ID")
            console.log(postContent, "postContent")
            console.log(title, "title")
            console.log(time, "time")



            const authorDetails = await getAuthorData(authorId)
            console.log(authorDetails)
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
            <a  href="../UserProfile/userprofile.html" onclick="localSave('${authorId}')" class="seeAll">See all from this user</a>
        </div>`

            blogElement.innerHTML = blogContent

            console.log(blogElement)

            blogArea.appendChild(blogElement)
        });
    }
    catch (error) {
        console.log(error, "==>>error in get Posts")
    }
}

function localSave(uid){
    console.log('working')
   localStorage.setItem("id", uid)
}


window.localSave = localSave;