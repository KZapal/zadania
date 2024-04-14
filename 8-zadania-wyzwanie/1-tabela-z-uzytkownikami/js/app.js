const table = document.querySelector(".tab tbody");
const nextBtn = document.querySelector(".tab-buttons #next");
const prevBtn = document.querySelector(".tab-buttons #prev");
const arrows = document.querySelectorAll(".arrow");
let currentPage = 1;

function getUsers(page) {
  return fetch(`http://localhost:3000/users?_page=${page}&_limit=10`)
    .then((response) => response.json())
    .then((data) => {
      const usersArray = data;
      console.log(usersArray);
      return usersArray;
    })
    .catch((error) => {
      console.error("Błąd pobierania danych:", error);
    });
}

function updateTable(usersArray) {
  table.innerHTML = "";

  usersArray.forEach((item) => {
    const row = document.createElement("tr");
    Object.keys(item).forEach((key) => {
      const cell = document.createElement("td");
      cell.textContent = item[key];
      row.appendChild(cell);
    });
    table.appendChild(row);
  });
}

nextBtn.addEventListener("click", () => {
  if (currentPage < 10) {
    currentPage++;
    getUsers(currentPage).then((usersArray) => {
      updateTable(usersArray);
    });
  } else {
    alert("Jesteś na ostatniej stronie");
  }
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    getUsers(currentPage).then((usersArray) => {
      updateTable(usersArray);
    });
  }
});

getUsers(currentPage)
  .then((usersArray) => {
    updateTable(usersArray);
  })
  .catch((error) => {
    console.error("Błąd pobierania danych:", error);
  });
