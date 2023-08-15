const getItemCounts = () => {

};

//when any plus or minus button is clicked, the subsequent itme-count is updated
$("#card-container").on("click", (event) => {

  let buttonId = $(event.target).attr("id");
  let index = buttonId.split("-");
  let amount = parseInt($("#item-count-" + index[1]).val());

  if (buttonId.includes("incrementer")) {
    $("#item-count-" + index[1]).text(amount + 1);
  } else if (buttonId.includes("decrementer") && amount > 0) {
    $("#item-count-" + index[1]).text(amount - 1);
  }

});

$("#create-order").on("click", getItemCounts());