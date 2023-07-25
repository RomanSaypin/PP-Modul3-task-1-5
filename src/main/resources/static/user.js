//получение user'а
const url = "http://localhost:8080/api/user/"

//для проверки
// user = fetch(url).then((responce) => console.log(responce.json()))
console.log("Hello!")

currentUser = fetch(url).then((responce) => responce.json())

// Заполнение шапки
currentUser.then((user) => {
    let roles = "";
    user.roles.forEach((name) => {
        roles += " ";
        roles += name.role.replace("ROLE_", "");
    });
    document.getElementById("navbar-email").innerHTML = user.email;
    document.getElementById("navbar-roles").innerHTML = roles;
});
// Заполнение таблицы
currentUser.then((user) =>{
    let roles = "";
    user.roles.forEach((name) => {
        roles += " ";
        roles += name.role.replace("ROLE_", "");
    });

    let result = "";
    result += `<tr>
                    <td>${user.id}</td>
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                    <td>${user.email}</td>
                    <td>${roles}</td>
                   </tr>`;
    document.getElementById("user-info-table").innerHTML = result;
})

