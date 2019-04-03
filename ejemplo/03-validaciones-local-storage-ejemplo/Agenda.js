import Employee from "./Employee.js";

export default class Agenda {
  constructor(tableAgenda, tableInfo) {
    this._tableAgenda = tableAgenda;
    this._tableInfo = tableInfo;
    this._numEmployees = 0;
    this._sumAge = 0;
    this._employees = [];

    this._initTables();
  }

  _initTables() {
    let lsEmployees = JSON.parse(localStorage.getItem("employees"));

    if (lsEmployees === null) {
      return;
    }
    lsEmployees.forEach( (e, index) => {
      e.birthday = new Date(e.birthday);
      this._addToTable(new Employee(e));
    });
  }

  _addToTable(employee) {
    let row = this._tableAgenda.insertRow(-1);

    let cellName = row.insertCell(0);
    let cellEmail = row.insertCell(1);
    let cellBirthday = row.insertCell(2);
    let cellAge = row.insertCell(3);
    let cellEdit = row.insertCell(4);
    let cellDelete = row.insertCell(5);

    let btnEdit = document.createElement("input");
    btnEdit.type = "button";
    btnEdit.value = "Editar";
    btnEdit.className = "btn btn-success";

    let btnDelete = document.createElement("input");
    btnDelete.type = "button";
    btnDelete.value = "Eliminar";
    btnDelete.className = "btn btn-danger";

    cellName.innerHTML = employee.name;
    cellEmail.innerHTML = employee.email;
    cellBirthday.innerHTML = employee.getBirthdayAsString();
    cellAge.innerHTML = employee.getAge();
    cellEdit.appendChild(btnEdit);
    cellDelete.appendChild(btnDelete);

    this._numEmployees++; // this._numEmployees = this._numEmployees + 1
    this._sumAge += employee.getAge(); // this._sumAge = this._sumAge + employee.getAge()

    this._tableInfo.rows[0].cells[1].innerHTML = this._numEmployees;

    this._tableInfo.rows[1].cells[1].innerHTML =
      this._sumAge / this._numEmployees;

    let objEmployee = {
      name: employee.name,
      email: employee.email,
      birthday: employee.birthday
    };

    this._employees.push(objEmployee);
  }

  _findEmployee(email) {
    let foundAt = -1;

    this._employees.forEach((e, index) => {
      if(e.email === email){
      foundAt = index;
      return;
      }
    });
    return foundAt;
  }

  addEmployee(employee) {
    let found = this._findEmployee(employee.email);

    if (found >= 0) {
      Swal.fire({
        type: "error",
        title: "Error",
        text: "el usario ya esta registrado"
      });
      return;
    }

    this._addToTable(employee);
    localStorage.setItem("employees", JSON.stringify(this._employees));
  }
}