

const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e.target)
        }
    })
}


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
                        <button type="button" class="btn btn-info btn-sm text-white" id="editUserBtn">Edit</button>
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

//Роли=======================================================================
const urlRole = "http://localhost:8080/api/admin/roles"
const listRoles = fetch(urlRole).then(responce => responce.json())
const fillRole = function (elementId) {
    listRoles.then(roles => {
        let result = ''
        for (const i in roles) {
            result += `<option value=${roles[i].id}>${roles[i].role.replace("ROLE_", "")}
                       </option>`
        }
        document.getElementById(elementId).innerHTML = result
    })
}

fillRole("role_select")
//=============================================================================



//Добавление(сохранение) user'a=================================================
const urlPost = "http://localhost:8080/api/admin/add"

const newUserForm = document.getElementById("newUserForm")
document.getElementById("newUserForm")
    .addEventListener("submit", (e) => {
        e.preventDefault()
        let nameRole = document.getElementById("role_select")
        let listRoles = []
        let roleValue = ""
        for (let i = 0; i < nameRole.options.length; i++) {
            if (nameRole.options[i].selected) {
                listRoles.push({
                    id: nameRole.options[i].value,
                    role: "ROLE_" + nameRole.options[i].innerHTML
                })
                roleValue += nameRole.options[i].innerHTML + ''
            }
        }
        fetch(urlPost, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                firstName: document.getElementById("firstName").value,
                lastName: document.getElementById("lastName").value,
                email: document.getElementById("email").value,
                password: document.getElementById("password").value,
                roles: listRoles
            })
        }).then(() => {
            newUserForm.reset()
        })
        document.getElementById("all-users-tab").click()
    })
//==============================================================================

//Страница user'a с таблицей====================================================
pageUser = fetch(urlAdmin).then(responce => responce.json())
pageUser.then((user) =>{
    let rol = "";
    user.roles.forEach((name) => {
        rol += " ";
        rol += name.role.replace("ROLE_", "");
    });

    let result = "";
    result += `<tr>
                    <td>${user.id}</td>
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                    <td>${user.email}</td>
                    <td>${rol}</td>
                   </tr>`;
    document.getElementById("user-table").innerHTML = result;
})
//==============================================================================

//изменение user'a==============================================================
const urlPATCH = "http://localhost:8080/api/admin/up"

const editUserModel =  new bootstrap.Modal(document.getElementById("editUserModal"))


const editId = document.getElementById("id_edit")
const editFirstName = document.getElementById("firstName_edit")
const editLastName = document.getElementById("lastName_edit")
const editEmail = document.getElementById("email_edit")
const editPassword = document.getElementById("password_edit")
const editRole = document.getElementById("role_edit")

const formEdit = document.getElementById("edit_user_form")

//модальное окно Edit
on(document, 'click', '#editUserBtn', e => {
    const fila = e.parentNode.parentNode
    let option = ''
    editId.value = fila.children[0].innerHTML
    editFirstName.value = fila.children[1].innerHTML
    editLastName.value = fila.children[2].innerHTML
    editEmail.value = fila.children[3].innerHTML
    editPassword.value = fila.children[4].innerHTML
    listRoles.then(rolList => {
        rolList.forEach(name => {
            let selected = fila.children[5].innerHTML.includes(name.role.replace('ROLE_','')) ? 'selected' : ''
            option += `
                <option value="${name.id}" ${selected}>${name.role.replace('ROLE_', '')}</option>`

        })
        editRole.innerHTML = option
    })
    editUserModel.show()
})

formEdit.addEventListener('submit', e => {
    e.preventDefault()
    let nameRoleEdit = document.getElementById("role_edit")
    let listRoleEdit = []
    let roleValueEdit = ''

    for (let i = 0; i < nameRoleEdit.options.length; i++) {
        if (nameRoleEdit.options[i].selected) {
            listRoleEdit.push({id: nameRoleEdit.options[i].value, role: 'ROLE_' + nameRoleEdit.options[i].innerHTML})
            roleValueEdit += nameRoleEdit.options[i].innerHTML + ' '
        }
    }

    fetch(urlPATCH, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: editId.value,
            firstName: editFirstName.value,
            lastName: editLastName.value,
            email: editEmail.value,
            password: editPassword.value,
            roles: listRoleEdit
        })
    })
    editUserModel.hide()
})
//==============================================================================

//удаление user'a===============================================================
const urlDelete = "http://localhost:8080/api/admin/"

const deleteModalBtn = new bootstrap.Modal(document.getElementById("deleteUserModal"))



let rowDelete = null
on(document, 'click', '#deleteUserBtn', e => {
    rowDelete = e.parentNode.parentNode
    document.getElementById('id_delete').value = rowDelete.children[0].innerHTML
    document.getElementById('firstName_delete').value = rowDelete.children[1].innerHTML
    document.getElementById('lastName_delete').value = rowDelete.children[2].innerHTML
    document.getElementById('email_delete').value = rowDelete.children[3].innerHTML

    let option = ''
    listRoles.then(roles => {
        roles.forEach(role => {
            if (rowDelete.children[4].innerHTML.includes(role.role.replace('ROLE_', ''))) {
                option += `<option value="${role.id}">${role.role.replace('ROLE_', '')}</option>`
            }
        })
        document.getElementById('role_delete').innerHTML = option
    })
    deleteModalBtn.show()
})

document.getElementById('delete_user_form').addEventListener('submit', (e) => {
    e.preventDefault()
    fetch(urlDelete + rowDelete.children[0].innerHTML, {
        method: 'DELETE'
    }).then(() => {
        deleteModalBtn.hide()
        rowDelete.parentNode.removeChild(rowDelete)
    })
})

//==============================================================================