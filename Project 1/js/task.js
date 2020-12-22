let studentArray = [];
let i;

function init() {
    document.getElementById("tablerows").innerHTML = "";
    if (localStorage.employeRecord) {
        studentArray = JSON.parse(localStorage.employeRecord);
        for (let i = 0; i < studentArray.length; i++) {
            let firstName = studentArray[i].firstname;
            let Email = studentArray[i].email;
            let PhoneNo = studentArray[i].phoneNo;
            let Salary = studentArray[i].salary;

            let Gender = studentArray[i].gender;
           
            prepareTableCell(i, firstName, Email, PhoneNo, Salary, Gender);
        }
    }
}
function registered() {

    let firstName = document.getElementById("firstname").value;

    let Email = document.getElementById("email").value;
    let PhoneNo = document.getElementById("phoneNo").value;
    let Salary = document.getElementById("salary").value;

    let Gender = document.getElementById("gender").value;

    let addingelement = { firstname: firstName, email: Email, phoneNo: PhoneNo, salary: Salary, gender: Gender };

    if (selectedindex === -1) {
        studentArray.push(addingelement);
    }
    else {
        studentArray.splice(selectedindex, 1, addingelement);
    }
   
    localStorage.employeRecord = JSON.stringify(studentArray);

    init();

    resetbtn();

}

function prepareTableCell(index, firstName, Email, PhoneNo, Salary, Gender) {
    let table = document.getElementById("tablerows");
    let Newrow = table.insertRow();
    let firstNameCell = Newrow.insertCell(0);
    let EmailNameCell = Newrow.insertCell(1);
    let PhoneNoCell = Newrow.insertCell(2);
    let SalaryCell = Newrow.insertCell(3);

    let GenderCell = Newrow.insertCell(4);
    let actionCell = Newrow.insertCell(5);


    firstNameCell.innerHTML = firstName;
    EmailNameCell.innerHTML = Email;
    PhoneNoCell.innerHTML = PhoneNo;
    SalaryCell.innerHTML = Salary;
    GenderCell.innerHTML = Gender;
    actionCell.innerHTML = '<button onclick = "EditBtn(' + index + ')" >Edit</button><br/><button onclick = "deletebtn(' + index + ')">Delete</button>';

}


function deletebtn(index) {

    studentArray.splice(index, 1);
    localStorage.employeRecord = JSON.stringify(studentArray);
    init();

}

function resetbtn() {
    selectedindex = -1;
    document.getElementById("firstname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phoneNo").value = "";
    document.getElementById("salary").value = "";
    document.getElementById("gender").value = "";
    document.getElementById("submit").innerHTML = "Register";

}

let selectedindex = -1;
function EditBtn(index) {
    selectedindex = index;
    let addingelement = studentArray[index];
    document.getElementById("firstname").value = addingelement.firstname;
    document.getElementById("email").value = addingelement.email;
    document.getElementById("phoneNo").value = addingelement.phoneNo;
    document.getElementById("salary").value = addingelement.salary;
    document.getElementById("gender").value = addingelement.gender;
    document.getElementById("submit").innerHTML = "Update";
}


function sorttable(n) {

    let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;

        }
        else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

$(document).ready(function(){
    $('#myTable').after('<div id="pagi"></div>');
    var rowsShown = 5;
    var rowsTotal = $('#myTable tbody tr').length;
    var numPages = rowsTotal/rowsShown;
    for(i = 0; i < numPages; i++) {
        var pageNum = i + 1;
        $('#pagi').append('<a href="#" rel="'+i+'">'+pageNum+'</a>');
    }
    $('#myTable tbody tr').hide();
    $('#myTable tbody tr').slice(0, rowsShown).show();
    $('#pagi a:first').addClass('active');
    $('#pagi a').bind('click', function(){
        $('#pagi a').removeClass('active');
        $(this).addClass('active');
        var currPage = $(this).attr('rel');
        var startItem = currPage * rowsShown;
        var endItem = startItem + rowsShown;
        $('#myTable tbody tr').css('opacity','0.0','font-size','25px',).hide().slice(startItem, endItem).
        css('display','table-row').animate({opacity:1}, 300);
    });
});
