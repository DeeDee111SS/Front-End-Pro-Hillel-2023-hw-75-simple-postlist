'use strict';

void function () {

    const postIdInput = document.getElementById("postIdInput");
    const searchButton = document.getElementById("searchButton");
    const postContainer = document.getElementById("postContainer");
    const postTitle = document.getElementById("postTitle");
    const postBody = document.getElementById("postBody");
    const getCommentsButton = document.getElementById("getCommentsButton");
    const commentsContainer = document.getElementById("commentsContainer");
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts/';

    searchButton.addEventListener("click", () => {
        const postId = +postIdInput.value;

        if (isNaN(postId) || postId < 1 || postId > 100) {
            alert("Please enter a valid Post ID between 1 and 100.");
            return;
        }

        fetch(apiUrl + `${postId}`)
            .then((response) => {
                return response.json();
            })
            .then((post) => {
                postContainer.style.display = "block";
                postTitle.textContent = post.title;
                postBody.textContent = post.body;
            })
            .catch((error) => {
                alert("Error: Post not found");
                console.error(error);
            });
    });

    getCommentsButton.addEventListener("click", () => {
        const postId = +postIdInput.value;

        fetch(apiUrl + `${postId}/comments`)
            .then((response) => response.json())
            .then((comments) => {
                commentsContainer.innerHTML = "";
                comments.forEach((comment) => {
                    const commentElement = document.createElement("div");
                    commentElement.classList.add("comment");
                    commentElement.innerHTML = `<h4>${comment.name}</h4><p>${comment.body}</p>`;
                    commentsContainer.appendChild(commentElement);
                });
            })
            .catch((error) => {
                alert("Error: Unable to fetch comments");
                console.error(error);
            });
    });    
    
}();


    

