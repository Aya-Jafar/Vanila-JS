
const filter = document.getElementById('filter')
const loader = document.querySelector('.loader')

const postsList = document.getElementById('post-list')

var limit = 5; // number of posts to fetch in each call
var page = 1;


function getPosts() {
    fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data)

            data.forEach(post => {
                const postElement = document.createElement('li')

                postElement.innerHTML = `
                    <div class="post-container">
                        <h3>
                            <span class="post-id">${post.id} - </span>
                            <span class="post-title">${post.title}</span>
                        </h3>
                        <p class="post-body">${post.body}</p>
                    </div>
                    `
                postsList.appendChild(postElement)
            })
        });
    

}
getPosts() 

window.addEventListener('scroll',()=>{
    const {scrollTop , scrollHeight , clientHeight} = document.documentElement;

    console.log(scrollTop,scrollHeight,clientHeight)

    if (scrollTop + clientHeight >= scrollHeight - 5){
        loader.classList.add('show')

        setTimeout(() =>{
            page += 1
            getPosts()
        } , 1000)
    } 
})

filter.addEventListener('input',(e)=>{
    const searchTerm = e.target.value.toLowerCase();
    
    Array.from(postsList.children).forEach(post => {
        const title = post.querySelector('.post-title').innerHTML
        const body = post.querySelector('.post-body').innerHTML

        if (title.toLowerCase().includes(searchTerm) || body.toLowerCase().includes(searchTerm)) {
            post.style.display = 'flex'
        }else{
            post.style.display = 'none'
        }
    });

})