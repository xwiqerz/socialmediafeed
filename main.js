const postTitle = document.querySelector(".post-title")
const postBody = document.querySelector(".post-body")
const commentBtn = document.querySelector(".comment-button")
const authorBtn = document.querySelector(".author-button")
const allPosts = document.querySelector(".posts")
const printAuthor = document.querySelector(".user")

url = "https://jsonplaceholder.typicode.com/posts"
userUrl = "https://jsonplaceholder.typicode.com/users"

//här fetchas url:en. gör sedan nya html tags som har samma klass som de som redan finns i html koden.
window.onload = async () => {
fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {
          let posts = data;
          return posts.map(function(post) {
            let divPost = createNode("div");
            divPost.className = "post";
            
       			let divTitle = createNode("h3");
            let divBody = createNode("div");
            let divComments = createNode("button");
            divComments.className = "comment-button"
            let divAuthor = createNode("button");
            divAuthor.className = "author-button"
               
       			divTitle.innerHTML = `${post.title}`;
       			divBody.innerHTML = `${post.body}`;
            divPost.appendChild(divTitle);
            divPost.appendChild(divBody);
            divPost.appendChild(divComments);
            divPost.appendChild(divAuthor);
            allPosts.appendChild(divPost);
            
            //fyller knapparna med text
            divComments.innerHTML = "Read comments";
            divAuthor.innerHTML = "View Author"

            divAuthor.addEventListener("click", function() {
              //här hämtar jag alla users och sätter sedan user id:t till samma som post id:t. sedan skirvs det ut
              //när man klickar på View Author knappen
              fetch(userUrl)
                .then((resp) => resp.json())
                .then(function(users) {
                  let user = users.find(user => user.id === post.id);
                  console.log(user);
                  printAuthor.innerHTML = `${user.name}`;
                });
            });
          });
        });
};

function createNode(element) {
  return document.createElement(element);
}


