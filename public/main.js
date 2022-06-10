const update = document.querySelector("#update-btn");

update.addEventListener("click", (_) => {
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
      console.log(response);
    });
  console.log("clicked");
});
