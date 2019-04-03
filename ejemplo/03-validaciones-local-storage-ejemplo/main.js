import Agenda from "./Agenda.js";
import Employee from "./Employee.js";

class Main {
  constructor() {
    let agenda = new Agenda(
      document.querySelector("#agenda"),
      document.querySelector("#info")
    );

    document.querySelector("#btnAdd").addEventListener("click", () => {
      let form = document.querySelector("#form");

      if (form.checkValidity() === true) {
        let name = document.querySelector("#name").value;
        let email = document.querySelector("#email").value;
        let sBirthday = document.querySelector("#birthday").value;
        sBirthday = sBirthday.split("-");

        let birthday = new Date(sBirthday[0], sBirthday[1] - 1, sBirthday[2]);

        let objEmployee = {
          name: name,
          email: email,
          birthday: birthday
        };

        let employee = new Employee(objEmployee);

        agenda.addEmployee(employee);
      }

      form.classList.add("was-validated");
    });
  }
}

let m = new Main();
