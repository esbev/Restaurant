
$(document).ready(function(){
  $(".modal").modal();
});

let orderInstance = M.Modal.getInstance(elem);

const clearOrderTable = () => {
  let lastOrderItem = $("#order-body").children().last().attr("id");//get last row id
  if (!isNaN(lastOrderItem)) {//if last row id is a number
    for (let i = 0; i <= lastOrderItem; i++) {//then loop through each item row
      $("#" + i).remove();//and remove item row
    };
  };
};

const resetQuantities = () => {
  let doesExist = true;
  let index = 1;

  while (doesExist) {
    if ($("#item-count-" + index).val()) {//if element exists
      $("#item-count-" + index).val("0");//then change the value to 0
      index++;
    } else { doesExist = false; }
  };
}

const getOrderItems = () => {

  let nameArr = [];
  let priceArr = [];
  let quantityArr = [];
  let itemCounter = 0;
  let doesExist = true;
  let index = 1;
  //get all items with value greater than 0 and push them to respective arrays
  while (doesExist) {

    if ($("#item-count-" + index).val()) {//check if row exists
      if ($("item-count-" + index).val() >= 0) {//if value is greater than 0 then push to arrays
        nameArr.push($("item-name-" + index).val());
        priceArr.push(parseFloat($("item-price-" + index).val().slice(1)));
        quantityArr.push(parseInt($("item-count-" + index).val()));
        itemCounter++;
        index++;
      }
    } else { doesExist = false; }

  };
  return nameArr, priceArr, quantityArr;
};

const populateOrder = (nameArr, priceArr, quantityArr) => {
  
  clearOrderTable();

  for (i in nameArr) {//build table row for each item
    let itemRowEl = `<tr id="${i}">`
    + `<td>${nameArr[i]}</td>`
    + `<td>${priceArr[i]}</td>`
    + `<td>${quantityArr[i]}</td>`
    + `<//tr>`;

    $("#order-body").append(itemRowEl);//add row to Order table
  }

  let orderTotal = priceArr.reduce(function (x, y) { return x + y; }, 0);//get order total
  let orderTotalEl = `<td><strong>$${orderTotal}</strong><td>`;//build order total element
  $("#order-total-row").append(orderTotalEl);//add order total to modal

};

//plus or minus buttons
$("#card-container").on("click", (event) => {
  let buttonId = $(event.target).attr("id");//get element id string
  let idIndex = buttonId.split("-");//split element id into string array
  let quantity = parseInt($("#item-count-" + idIndex[1]).val());//get the value of the current quantity

  if (buttonId.includes("incrementer")) {//if the incrementer button is clicked
    $("#item-count-" + idIndex[1]).text(quantity + 1);//add 1 and display the new quantity
  } else if (buttonId.includes("decrementer") && quantity > 0) {//if the decrementer is clicked and the quantity is not 0
    $("#item-count-" + idIndex[1]).text(quantity - 1);//subtract 1 and display the new quantity
  }
});

$("#create-order").on("click", async () => {
  getOrderItems(nameArr, priceArr, quantityArr);
  populateOrder(nameArr, priceArr, quantityArr);
  orderInstance.open();
});

$("#confirm-order").on("click", () => {
  resetQuantities();
})