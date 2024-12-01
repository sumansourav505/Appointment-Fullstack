let currentUserId = null; // Store the user's id if editing

const API_URL = 'http://localhost:4000/api/users'; // Backend endpoint

function handleFormSubmit(event) {
  event.preventDefault();

  const userDetails = {
    username: event.target.username.value,
    email: event.target.email.value,
    phone: event.target.phone.value,
  };

  if (currentUserId) {
    // Update existing user with PUT request
    axios
      .put(`${API_URL}/${currentUserId}`, userDetails)
      .then(response => {
        refreshUserList(); // Refresh the list after editing
        currentUserId = null; // Reset the ID after update
        event.target.reset(); // Clear the form
      })
      .catch(error => console.log("Error updating user:", error));
  } else {
    // Add new user with POST request
    axios
      .post(API_URL, userDetails)
      .then(response => {
        displayUserOnScreen(response.data);
        event.target.reset(); // Clear the form after adding
      })
      .catch(error => console.log("Error adding user:", error));
  }
}

function displayUserOnScreen(userDetails) {
  const userItem = document.createElement("li");
  userItem.appendChild(
    document.createTextNode(
      `${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`
    )
  );

  const deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("Delete"));
  userItem.appendChild(deleteBtn);

  const editBtn = document.createElement("button");
  editBtn.appendChild(document.createTextNode("Edit"));
  userItem.appendChild(editBtn);

  const userList = document.querySelector("ul");
  userList.appendChild(userItem);

  // Delete Button Event
  deleteBtn.addEventListener("click", function () {
    axios
      .delete(`${API_URL}/${userDetails.id}`)
      .then(() => {
        userList.removeChild(userItem); // Remove item from the DOM if delete was successful
      })
      .catch(error => console.log("Error deleting user:", error));
  });

  // Edit Button Event
  editBtn.addEventListener("click", function () {
    currentUserId = userDetails.id; // Store the user's id for update
    document.getElementById("username").value = userDetails.username;
    document.getElementById("email").value = userDetails.email;
    document.getElementById("phone").value = userDetails.phone;

    // Remove the item from the DOM to avoid duplicates
    userList.removeChild(userItem);
  });
}

function refreshUserList() {
  const userList = document.querySelector("ul");
  userList.innerHTML = ""; // Clear the current list

  // Fetch and display all users again
  axios.get(API_URL)
    .then(response => {
      response.data.forEach(user => displayUserOnScreen(user));
    })
    .catch(error => console.log("Error fetching users:", error));
}

// Fetch and display all users on page load
window.onload = refreshUserList;

// Do not touch code below
module.exports = handleFormSubmit;
