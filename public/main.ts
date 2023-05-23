const section = document.querySelector('section')
const info = document.querySelector('.info') as HTMLDivElement;
const btn = document.querySelector('.toSayt') as HTMLButtonElement;
const infoId = document.querySelector('.infoId') as HTMLSpanElement;
const infoName = document.querySelector('.infoName') as HTMLSpanElement;
const infoUserName = document.querySelector('.infoUserName') as HTMLSpanElement;
const infoEmail = document.querySelector('.infoEmail') as HTMLSpanElement;
const infoAddress = document.querySelector('.infoAddress') as HTMLSpanElement;
const infoPhone = document.querySelector('.infoPhone') as HTMLSpanElement;
const infoWebsite = document.querySelector('.infoWebsite') as HTMLSpanElement;
const infoCompany = document.querySelector('.infoCompany') as HTMLSpanElement;
const animations = document.querySelector(".lds-facebook") as HTMLDivElement
let table: HTMLTableElement;
function renderFunction(data: any) {
  table = document.createElement('table');
  table.style.border = '1px solid black';
  table.style.borderCollapse = 'collapse';

  let trH = document.createElement('tr');
  let idTh = document.createElement('th');
  let nameTh = document.createElement('th');
  let emailTh = document.createElement('th');
  let adrssTh = document.createElement('th');
  let actionTh = document.createElement('th');

  idTh.classList.add('id');
  actionTh.classList.add('actions');

  idTh.textContent = 'ID';
  nameTh.textContent = 'NAME';
  emailTh.textContent = 'EMAIL';
  adrssTh.textContent = 'ADDRESS';
  actionTh.textContent = 'ACTIONS';

  trH.appendChild(idTh);
  trH.appendChild(nameTh);
  trH.appendChild(emailTh);
  trH.appendChild(adrssTh);
  trH.appendChild(actionTh);

  table.appendChild(trH);

  for (let i = 0; i < data.length; i++) {
    let tr = document.createElement('tr');
    let tdId = document.createElement('td');
    let tdName = document.createElement('td');
    let tdEmail = document.createElement('td');
    let tdAddress = document.createElement('td');
    let tdAction = document.createElement('td');
    let spanDelete = document.createElement('span');
    let spanKorish = document.createElement('span');

    spanDelete.className = 'material-symbols-outlined delete';
    spanKorish.className = 'material-symbols-outlined eye';
    spanDelete.textContent = 'delete';
    spanKorish.textContent = 'symptoms';

    spanDelete.addEventListener('click', function () {
      table.removeChild(tr);
    });

    spanKorish.addEventListener('click', function () {
      let id = tdId.textContent;

      table.style.display = 'none';
      info.style.display = 'flex';
      btn.addEventListener('click', function () {
        info.style.display = 'none';
        table.style.display = 'block';

      });
      function infos(data: any) {
        infoId.textContent = data.id;
        infoName.textContent = data.name;
        infoUserName.textContent = data.username;
        infoEmail.textContent = data.email;
        infoAddress.textContent = data.address.city
        infoPhone.textContent = data.phone;
        infoWebsite.textContent = data.website;
        infoCompany.textContent = data.company.name
      }

      async function getDataFromAPI() {
        info.style.display = "none";
        animations.style.display = "inline-block";
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
          if (response) {
            const data = await response.json();
            info.style.display = "flex";
            animations.style.display = "none";
            // console.log(data);
            return data;
          }

        }
        catch (err) {
          alert('Error❌')
        }
      }

      getDataFromAPI()
        .then((data) => {
          infos(data);
        });
    }
    );

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
    tdAction.appendChild(spanKorish);

    table.appendChild(tr);
  }

  section?.appendChild(table);
}

async function getDataFromAPI() {
  // table.style.display = 'none';
  // animations.style.display = 'inline-block';

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (response) {
      const data = await response.json();
      // table.style.display = "block";
      // animations.style.display = "none";
      return data;
    }

  }
  catch (err) {
    alert('Error❌')
  }
}

getDataFromAPI()
  .then((data) => {
    renderFunction(data);
  });