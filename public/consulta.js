$("#Consultar").click(function () {
  const timeMargin = {
    initTime: new Date($("#init-date").val()).getTime() / 1000,
    finalTime: new Date($("#final-date").val()).getTime() / 1000,
  };
  console.log(timeMargin.initTime);
  console.log(timeMargin.finalTime);

  // cambio
  $.get("/search", timeMargin).done(function (data) {
    console.log(data);
    data.forEach((element) => {
      $("#tbody1").append(
        `<tr> <th>${element.classes}</th> <th>${element.scores}</th> <th>${element.formatTime}</th>  </tr>`
      );
    });
  });
});

