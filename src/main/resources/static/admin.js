
// Заполнение шапки========================================================
//получение admin'а
const urlAdmin = "http://localhost:8080/api/admin/adminUser"
currentUser = fetch(urlAdmin).then((responce) => responce.json())

currentUser.then((user) => {
    let roles = "";
    user.roles.forEach((name) => {
        roles += " ";
        roles += name.role.replace("ROLE_", "");
    });
    document.getElementById("nav-email").innerHTML = user.email;
    document.getElementById("nav-roles").innerHTML = roles;
});
//=========================================================================

// Заполнение таблицы========================================================
const urlAllUser = "http://localhost:8080/api/admin/users"

const allUser = fetch(urlAllUser)
    .then((responce) => responce.json())

allUser.then(listUsers => {
        let result = ''
        for (const i in listUsers) {
            let roles = ''
            listUsers[i].roles.forEach(name => {
                roles += ' '
                roles += name.role.replace("ROLE_", "")
            })
            result += `<tr>
                    <td>${listUsers[i].id}</td>
                    <td>${listUsers[i].firstName}</td>
                    <td>${listUsers[i].lastName}</td>
                    <td>${listUsers[i].email}</td>
                    <td>${roles}</td>
                    <td>
                        <button type="button" class="btn btn-info btn-sm text-white" id="editUserBtn"}">Edit</button>
                    </td>
                    <td>
                        <button type="button" class="btn btn-danger btn-sm" id="deleteUserBtn">Delete</button>
                    </td>
                    </tr>`
        }
        document.getElementById("users-table").innerHTML = result
    }
)
// Заполнение таблицы========================================================