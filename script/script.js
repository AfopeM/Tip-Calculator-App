"use strict";

const bill = document.querySelector(".input--bill");
const custom = document.querySelector(".input--custom");
const numberOfPeople = document.querySelector(".input--people");
const selectTip = document.querySelector(".calculator__tips");
const tipAmount = document.getElementById("tip-amount");
const totalAmount = document.getElementById("total-amount");
const resetBtn = document.querySelector(".btn--reset");

let people = Number(numberOfPeople.value);
let fullBill = 0;
let fullTip = 0;

// RESET & RESET BUTTON
const reset = function () {
  tipAmount.textContent = "$0.00";
  totalAmount.textContent = "$0.00";
  bill.value = "";
  numberOfPeople.value = "";
  custom.value = "";
  fullBill = 0;
  fullTip = 0;
};

reset();
resetBtn.addEventListener("click", reset);

//CALCULATE TOTAL/PERSON
const calcBill = function () {
  fullBill = Number(perPerson(bill.value) + fullTip);
  totalAmount.textContent = `$${fullBill.toFixed(2)}`;
};

// BILL
bill.addEventListener("keyup", function () {
  calcBill();
  calcTip(custom.value);
});
bill.addEventListener("click", function () {
  bill.value = "";
});

// TIP & CALCULATE TIP
const calcTip = function (tip) {
  if (bill.value == "" || people == "") {
    return (tipAmount.textContent = "$0.00");
  }

  fullTip = bill.value * (tip / 100);
  fullTip = Number(perPerson(fullTip));
  tipAmount.textContent = `$${fullTip.toFixed(2)}`;
};

selectTip.addEventListener("click", function (e) {
  e.preventDefault();
  const select = e.target.dataset.tip;
  if (!select) return;

  calcTip(select);
  calcBill();
});

// CUSTOM TIP
custom.addEventListener("keyup", function () {
  calcTip(custom.value);
  calcBill();
});
custom.addEventListener("click", function () {
  custom.value = "";
});

// NUMBER OF PEOPLE
numberOfPeople.addEventListener("keyup", function () {
  if (numberOfPeople.value > 0) {
    people = Number(numberOfPeople.value);
    calcBill();

    numberOfPeople.classList.remove("warning");
    document.querySelector(".warning--text").style.display = "none";
  } else {
    numberOfPeople.classList.add("warning");
    document.querySelector(".warning--text").style.display = "block";
  }
});
numberOfPeople.addEventListener("click", function () {
  numberOfPeople.value = "";
});

// PER PERSON
const perPerson = function (value) {
  if (people === 0) {
    return "0.00";
  }

  return value / people;
};
