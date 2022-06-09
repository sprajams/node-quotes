const update = document.querySelector("#update-btn");

update.addEventListener("click", (_) => {
  fetch("/quotes", {
    method: "put",
    headers: { "Content-type": "application/jscon" },
    body: JSON.stringify({
      name: "Walter White",
      quote: "Say my name.",
    }),
  });
  console.log("clicked");
});
