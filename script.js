const bills = document.querySelector(".bill");
const tipButtons = document.querySelectorAll(".selection");
const peopleNumber = document.querySelector(".person-no");
const totalAmount = document.querySelector("#total-amount");
const totalPerPerson = document.querySelector("#total-per-person");
const reset = document.querySelector(".reset");
const customInput = document.querySelector(".custom");
const error = document.querySelector(".error");

const calculateTip = () => {
    tipButtons.forEach((btn) => {
        if (bills.value && peopleNumber.value && btn.value){
            btn.addEventListener("click", () => {
                handleActiveTip(btn);
                calculateAndHandleError();
                reset.classList.add("show-clicked")
            })
        }
    })   
}

customInput.addEventListener("keypress", (event) => {
    tipButtons.forEach((btn) => {
        btn.classList.remove("show-clicked");
    })

    if (event.which === 13) {
        customInput.classList.add("show-clicked");
        let activeElement = event.currentTarget;
        calculation(bills, peopleNumber, activeElement);
        calculateAndHandleError();
    }
})

const handleActiveTip = (btn) => {
    tipButtons.forEach((item) => {
        if (item !== btn) {
            item.classList.remove("show-clicked");
        }
    })

    btn.classList.toggle("show-clicked");
}


const calculateAndHandleError = () => {
    if (peopleNumber.value == 0) {
        error.classList.add("show-error")
        peopleNumber.classList.add("show-border");
        totalAmount.textContent = "0.00";
        totalPerPerson.textContent = "0.00";
    } else {
        peopleNumber.classList.remove("show-border");
        error.classList.remove("show-error")
        const activeElement = document.querySelector(".show-clicked")
        calculation(bills, peopleNumber, activeElement);
    }
}


const calculation = (a, b , c) => {
    const billValue = parseFloat(a.value);
    const peopleNumberValue = parseFloat(b.value);
    const tip = c.value;

    const totalAmountResult = parseFloat((billValue / peopleNumberValue) * (tip / 100)).toFixed(2);
    const totalPerPersonResult = parseFloat(totalAmountResult * 5).toFixed(2);

    totalAmount.textContent = totalAmountResult;
    totalPerPerson.textContent = totalPerPersonResult;
}

   
reset.addEventListener("click", () => {
    totalAmount.textContent = "0.00";
    totalPerPerson.textContent = "0.00";
    bills.value = 0;
    peopleNumber.value = 0;
    customInput.value = "";
    peopleNumber.classList.remove("show-border");
    reset.classList.remove("show-clicked")
    error.classList.remove("show-error")
    tipButtons.forEach((btn) => {
        btn.classList.remove("show-clicked");
    })
})



calculateTip()

