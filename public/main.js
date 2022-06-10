const updateBtn = document.querySelector("#update-btn");

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
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((response) => {
      window.location.reload(true);
    });
  console.log("updatee");
});

const deleteBtn = document.querySelector("#delete-btn");
deleteBtn.addEventListener("click", (_) => {
  fetch("/quotes", {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Walter White",
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((data) => {
      window.location.reload();
    });
  console.log("deleteeee");
});
