const getOrderItems = () => {
  let nameArr = [];
  let priceArr = [];
  let itemCountArr = [];
  let itemCounter = 0;
  let doesExist = true;
  let index = 1;
//get all items with value greater than 0 and push them to respective arrays
  while (doesExist) {

    if ($("#item-count-" + index).val()) {
      if ($("item-count-" + index).val() >= 0) {
        nameArr.push($("item-name-" + index).val());
        priceArr.push(parseFloat($("item-price-" + index).val().slice(1)));
        itemCountArr.push(parseInt($("item-count-" + index).val()));
        itemCounter++;
        index++;
      }
    } else { doesExist = false;}

  };
};

//when any plus or minus button is clicked, the subsequent item-count is updated
$("#card-container").on("click", (event) => {

  let buttonId = $(event.target).attr("id");//get element id
  let idIndex = buttonId.split("-");//split element id into string array
  let amount = parseInt($("#item-count-" + idIndex[1]).val());//convert element id array object containing numbers into integer

  if (buttonId.includes("incrementer")) {//if the incrementer button is clicked
    $("#item-count-" + idIndex[1]).text(amount + 1);//add 1 and display the amount
  } else if (buttonId.includes("decrementer") && amount > 0) {//if the decrementer is clicked and the amount is not 0
    $("#item-count-" + idIndex[1]).text(amount - 1);//subtract 1 and display the amount
  }

});

$("#create-order").on("click", getOrderItems());