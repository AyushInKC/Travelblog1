document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("blogContainer").style.display = "none"; // Hide blogs initially

    document.getElementById("seeBlogsBtn").addEventListener("click", function () {
        fetchBlogs(); 
    });

    document.getElementById("showCreateBlogFormBtn").addEventListener("click", function () {
        document.getElementById("createBlogForm").style.display = "block";
    });
});

function fetchBlogs() {
    fetch("https://bloggapp-0mdl.onrender.com/blog/listAll")
        .then(response => response.json())
        .then(blogs => {
            document.getElementById("blogContainer").style.display = "flex"; // Show blogs
            displayBlogs(blogs);
        })
        .catch(error => console.error("Error fetching blogs:", error));
}

function displayBlogs(blogs) {
    const blogContainer = document.getElementById("blogContainer");
    blogContainer.innerHTML = ""; 

    blogs.forEach(blog => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const title = document.createElement("h2");
        title.textContent = blog.title;
        blogCard.appendChild(title);

        if (blog.image) {
            const img = document.createElement("img");
            img.src = blog.image;
            img.alt = "Blog Image";
            img.classList.add("blog-image");
            blogCard.appendChild(img);
        }

        const description = document.createElement("p");
        description.textContent = blog.description;
        blogCard.appendChild(description);

        blogContainer.appendChild(blogCard);
    });
}

function searchBlog() {
    const searchTitle = document.getElementById("searchTitle").value.toLowerCase();

    fetch("https://bloggapp-0mdl.onrender.com/blog/listAll")
        .then(response => response.json())
        .then(blogs => {
            const filteredBlogs = blogs.filter(blog =>
                blog.title.toLowerCase().includes(searchTitle)
            );
            displayBlogs(filteredBlogs);
        })
        .catch(error => console.error("Error searching blogs:", error));
}
