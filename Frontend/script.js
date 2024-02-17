document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("login-form").addEventListener("submit", login);
  document.getElementById("register-form").addEventListener("submit", register);
  document.getElementById("get-blogs-btn").addEventListener("click", getAllBlogs);
  document.getElementById("create-blog-form").addEventListener("submit", createBlog);
});

function createBlog(event) {
  event.preventDefault();
  const title = document.getElementById("blog-title").value;
  const content = document.getElementById("blog-content").value;
  const authToken = localStorage.getItem('token');
  
  fetch("http://localhost:5500/blogs", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`
      },
      body: JSON.stringify({ title, content }),
  })
  .then(response => response.json())
  .then(data => {
      console.log(data);
      document.getElementById("message").innerText = "Blog created successfully";
      // Optionally clear form fields and fetch all blogs to update the list
      document.getElementById("blog-title").value = '';
      document.getElementById("blog-content").value = '';
      getAllBlogs(); // Refresh the blogs list
  })
  .catch(error => {
      console.error("Error:", error);
      document.getElementById("message").innerText = "Failed to create blog";
  });
}

// Modify the getAllBlogs function's fetch headers to include the Bearer token correctly
function getAllBlogs() {
  const authToken = localStorage.getItem('token');
  fetch("http://localhost:5500/blogs", {
      method: "GET",
      headers: {
          "Authorization": `Bearer ${authToken}`,
          "Content-Type": "application/json",
      },
  })
  .then(response => response.json())
  .then(data => {
      const blogsContainer = document.getElementById("blogs-list");
      blogsContainer.innerHTML = ''; // Clear existing blogs
      data.forEach(blog => {
          const blogElement = document.createElement("div");
          blogElement.innerText = `${blog.title}: ${blog.content}`;
          blogsContainer.appendChild(blogElement);
      });
  })
  .catch(error => console.error("Failed to fetch blogs", error));
}

// function getAllBlogs(){
//     const authToken = localStorage.getItem('token');
//     console.log(authToken)
//     fetch("http://localhost:5500/blogs", {
//       method: "GET",
//       headers: {
//         Authorization: "Bearer",
//         authToken,
//         "Content-Type": "application/json",
//       },
//     })
//     .then((response) => {
//     if (response.ok) {
//         return response.json();
//     } else {
//         throw new Error("Failed to fetch blogs");
//     }
//     })
//     .then((data) => {
//     console.log(data);
//     });
// }

function login(event) {
  event.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  // Perform login API request
  // Example using fetch API
  fetch("http://localhost:5500/auth/login", {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Login failed");
      }
    })
    .then((data) => {
      console.log(data);
      localStorage.setItem('token',data.token);
      document.getElementById("message").innerText = "Login successful!";
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("message").innerText =
        "Login failed. Please try again.";
    });
}

function register(event) {
  event.preventDefault();
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  // Perform register API request
  fetch("http://localhost:5500/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Registration failed");
      }
    })
    .then((data) => {
      
      document.getElementById("message").innerText = "Registration successful!";
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("message").innerText =
        "Registration failed. Please try again.";
    });
}
