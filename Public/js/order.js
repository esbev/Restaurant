
$(document).ready(function(){
  $(".modal").modal();
});

$(document).ready(function(){
  $('.tooltipped').tooltip();
});

let elems = "";
let orderInstance = M.Modal.getInstance(elems);

const updateItemQty = (buttonId) => {
  if (buttonId.includes("incrementer") || buttonId.includes("decrementer")) {
    let stringArr = buttonId.split("-");//split element id into string array
    let itemId = parseInt(stringArr[1]);
    let itemName = $("#item-name-" + itemId).text();
    let itemPrice = parseFloat($("#item-price-" + itemId).text().slice(1));
    let itemQuantity = parseInt($("#item-qty-" + itemId).text());//get the value of the current quantity
    if (buttonId.includes("incrementer")) {//if the incrementer button is clicked
      $("#item-qty-" + itemId).text(itemQuantity + 1);//add 1 and display the new quantity
      itemQuantity++;
      updateOrder(itemId, itemName, itemPrice, itemQuantity);
    } else if (buttonId.includes("decrementer") && itemQuantity > 0) {//if the decrementer is clicked and the quantity is not 0
      $("#item-qty-" + itemId).text(itemQuantity - 1);//subtract 1 and display the new quantity
      if (itemQuantity - 1 === 0){
        removeFromOrder(itemId, itemPrice);
      } else {
        itemQuantity--;
        updateOrder(itemId, itemName, itemPrice, itemQuantity);
      }
    }
  }
};

const updateOrder = (itemId, itemName, itemPrice, itemQuantity) => {
  
  if ($("#" + itemId).attr("id") == itemId) {
    $("#price-" + itemId).text(itemPrice);
    $("#quantity-" + itemId).text(itemQuantity);
    $("#total-" + itemId).text(itemPrice * itemQuantity);
    updateTotal(itemPrice, "add");
  } else {
    let itemRowEl = `<tr id="${itemId}">`
    + `<td id="name-${itemId}">${itemName}</td>`
    + `<td id="price-${itemId}">$${itemPrice}</td>`
    + `<td id="quantity-${itemId}">${itemQuantity}</td>`
    + `<td id="total-${itemId}">$${itemQuantity * itemPrice}</td>`
    + `<//tr>`;

    $("#order-body").append(itemRowEl);//add row to Order table
    updateTotal(itemPrice, "add");
  }
};

const updateTotal = (itemPrice, operation) => {
  let currentTotal = parseInt($("#order-total-amt").text().slice(1));
  let newTotal = 0;
  switch (operation) {
    case "subtract":
      newTotal = currentTotal - itemPrice;
      break;
    default:
      newTotal = currentTotal + itemPrice;
      break;
  }
  
  $("#order-total-amt").text("$" + newTotal);
  $("#current-total").text("Order Total: $ " + newTotal);
  
};

const removeFromOrder = (itemId, itemPrice) => {
  updateTotal(itemPrice, "subtract");
  $("#" + itemId).remove();
};

const clearOrderTable = () => {//change this to clear rows that have a number
  //start while last row has a number for the id
  let isANumber = true;
  while (isANumber) {
    let lastOrderItem = parseInt($("#order-body").children().last().attr("id"));//get last row id

    if (!isNaN(lastOrderItem)) {//if last row id is a number
      $("#" + i).remove();
    } else {
      isANumber = false;
    };
  };
};

const resetQuantities = () => {
  let doesExist = true;
  let index = 1;

  while (doesExist) {
    if ($("#item-qty-" + index).text()) {//if element exists
      $("#item-qty-" + index).text("0");//then change the value to 0.
      index++;
    } else { doesExist = false; }
  };
}

$("#menu-container").on("click", (event) => {
  let buttonId = $(event.target).attr("id");
  if (buttonId) {
    updateItemQty(buttonId);
  }
});

$("#place-order").on("click", () => {
  resetQuantities();
  clearOrderTable();
})