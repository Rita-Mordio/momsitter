import axios from "axios";
import SETTING from "./setting.js";

require("./common.css");

//API , Local 탭 클릭시
//탭 변경 이벤트 처리

const getUsersByAPI = (searchText) => {
  return axios.get(`${SETTING.apiUrl}/search/users`, {
      params: {
        q: searchText,
        page: 1,
        per_page: 100,
      },
    })
    .then((response) => {
      return response.data.items;
    })
    .catch((error) => {
      console.log(error);
    });
};

const getUsersBySession = (searchText) => {};

const renderUsers = (users) => {};

const searchUsers = async () => {
  let users;
  const searchText = document.querySelector(".searchInput").value;
  const activeButton = document.querySelector(".active").id;

  if (activeButton === "apiButton") users = await getUsersByAPI(searchText);
  else users = getUsersBySession(searchText);

  console.log(users)

  renderUsers(users);
};

const toggleTabButton = (buttonId) => {
  const tabButtonElements = document.querySelectorAll(".tabButton");
  tabButtonElements.forEach((item) => {
    item.classList.remove("active");
  });
  document.querySelector(`#${buttonId}`).classList.add("active");

  searchUsers();
};

document.querySelector("#apiButton").onclick = () => {
  toggleTabButton("apiButton");
};

document.querySelector("#localButton").onclick = () => {
  toggleTabButton("localButton");
};

document.querySelector(".searchButton").onclick = () => {
  searchUsers();
};

document.querySelector(".searchInput").onkeypress = (event) => {
  if (event.code === "Enter" || event.code === "NumpadEnter") searchUsers();
};
