"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const section = document.querySelector('section');
function renderFunction(data) {
    let table = document.createElement('table');
    table.style.border = '1px solid black';
    table.style.borderCollapse = 'collapse';
    let trHeader = document.createElement('tr');
    let idTh = document.createElement('th');
    let nameTh = document.createElement('th');
    let emailTh = document.createElement('th');
    let addressTh = document.createElement('th');
    let actionTh = document.createElement('th');
    idTh.classList.add('id');
    actionTh.classList.add('actions');
    idTh.textContent = 'ID';
    nameTh.textContent = 'NAME';
    emailTh.textContent = 'EMAIL';
    addressTh.textContent = 'ADDRESS';
    actionTh.textContent = 'ACTIONS';
    trHeader.appendChild(idTh);
    trHeader.appendChild(nameTh);
    trHeader.appendChild(emailTh);
    trHeader.appendChild(addressTh);
    trHeader.appendChild(actionTh);
    table.appendChild(trHeader);
    for (let i = 0; i < data.length; i++) {
        let tr = document.createElement('tr');
        let tdId = document.createElement('td');
        let tdName = document.createElement('td');
        let tdEmail = document.createElement('td');
        let tdAddress = document.createElement('td');
        let tdAction = document.createElement('td');
        let spanDelete = document.createElement('span');
        let spanSymptoms = document.createElement('span');
        spanDelete.className = 'material-symbols-outlined delete';
        spanSymptoms.className = 'material-symbols-outlined eye';
        spanDelete.textContent = 'delete';
        spanSymptoms.textContent = 'symptoms';
        tdId.textContent = data[i].id.toString();
        if (parseInt(tdId.innerText) % 2 === 0) {
            tdId.style.backgroundColor = 'rgb(225, 225, 225)';
            tdName.style.backgroundColor = 'rgb(225, 225, 225)';
            tdEmail.style.backgroundColor = 'rgb(225, 225, 225)';
            tdAction.style.backgroundColor = 'rgb(225, 225, 225)';
            tdAddress.style.backgroundColor = 'rgb(225, 225, 225)';
        }
        tdName.textContent = data[i].name;
        tdEmail.textContent = data[i].email;
        tdAddress.textContent = data[i].address.street + ', ' + data[i].address.city;
        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdEmail);
        tr.appendChild(tdAddress);
        tr.appendChild(tdAction);
        tdAction.appendChild(spanDelete);
        tdAction.appendChild(spanSymptoms);
        table.appendChild(tr);
    }
    section === null || section === void 0 ? void 0 : section.appendChild(table);
}
function getDataFromAPI() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://jsonplaceholder.typicode.com/users');
            if (response) {
                const data = yield response.json();
                return data;
            }
        }
        catch (err) {
            alert('Error❌');
        }
    });
}
getDataFromAPI()
    .then((data) => {
    renderFunction(data);
});
