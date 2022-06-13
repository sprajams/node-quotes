const updateBtn = document.querySelector("#update-btn");
// use fetch to send PUT request when use clicks button
updateBtn.addEventListener("click", (_) => {
  fetch("/quotes", {
    method: "put",
    // tell server we're sending JSON data
    headers: { "Content-type": "application/json" },
    // convert data we send into JSON and pass data via body property
    body: JSON.stringify({
      name: "Walter White",
      quote: "Say my name.",
    }),
  })
    //handle response from server
    .then((res) => {
      if (res.ok) return res.json();
    })
    // refresh page to see changes
    .then((response) => {
      window.location.reload(true);
    });
});

const deleteBtn = document.querySelector("#delete-btn");
const messageDiv = document.querySelector("#message");
// use fetch but with delete as a method
deleteBtn.addEventListener("click", (_) => {
  fetch("/quotes", {
    method: "delete",

    // tell server we are sending JSON data
    headers: {
      "Content-Type": "application/json",
    },

    // convert data we send into JSON
    body: JSON.stringify({
      name: "Walter White",
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((res) => {
      // render a diff message depending on what the server responds with
      if (res === "No quote to delete") {
        messageDiv.textContent = "No sign of Walt";
      } else {
        window.location.reload();
      }
    });
});
