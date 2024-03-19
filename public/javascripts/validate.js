// Validate Name
function validateName() {
    let name = document.getElementById("name").value;
    let pattern = /^[a-zA-Z\s]+$/;
    let resultElement = document.getElementById("errName");

    if (name.length >= 2 && pattern.test(name)) {
       resultElement.innerHTML = "";
       return true;
    } else {
       resultElement.innerHTML = "Name needs to be at least 2 characters and cannot contain numbers or special characters!";
       return false;
    }
}

// Validate Email
function validateEmail() {
    let email = document.getElementById('email').value;
    let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
    let resultElement = document.getElementById("errEmail");
    if (pattern.test(email)) {
       resultElement.innerHTML = "";
       return true;
    } else {
       resultElement.innerHTML = "Invalid Email!";
       return false;
    }
}

// Validate Password
function validatePassword() {
    let password = document.getElementById("password").value;
    let uppercaseRegex = /[A-Z]/;
    let resultElement = document.getElementById("errPassword");

    if (password.length >= 8 && uppercaseRegex.test(password)) {
       resultElement.innerHTML = "";
       return true;
    } else {
       resultElement.innerHTML = "Password must at least 8 characters and at least 1 capital letter!";
       return false;
    }
}

// Validate Confirm Password
function validateConfirmPassword() {
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let passwordMatchElement = document.getElementById("errConfirmPassword");
    if (password === confirmPassword) {
        passwordMatchElement.innerHTML = "";
        return true;
    } else {
        passwordMatchElement.innerHTML = "Password Incorrect!";
        return false;
    }
}

// Kiểm tra trạng thái của các trường thông tin và vô hiệu hóa nút Create nếu có trường hợp không hợp lệ
function validateForm() {
    if (validateName() && validateEmail() && validatePassword() && validateConfirmPassword()) {
        document.getElementById("submitButton").disabled = false;
        return true;
    } else {
        document.getElementById("submitButton").disabled = true;
        return false;
    }
}

function formatId(idValue) {
    let subjectID = idValue.toString();
    let resultElement = document.getElementById("errID");
    if (/^P\d{2,4}$/.test(subjectID)) {
        return true;
    } else {
        resultElement.innerHTML = "Subject ID must be Pxx or Pxxxx!";
        return false;
    }
}

// Sắp xếp danh sách sản phẩm từ thấp đến cao
function sortAscending() {
    const table = document.querySelector('.table tbody');
    Array.from(table.children)
      .sort((a, b) => parseFloat(a.children[3].textContent) - parseFloat(b.children[3].textContent))
      .forEach(row => table.appendChild(row));
  }

  // Sắp xếp danh sách sản phẩm từ cao đến thấp
  function sortDescending() {
    const table = document.querySelector('.table tbody');
    Array.from(table.children)
      .sort((a, b) => parseFloat(b.children[3].textContent) - parseFloat(a.children[3].textContent))
      .forEach(row => table.appendChild(row));
  }