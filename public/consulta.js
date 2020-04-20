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

    for (let i = 0; i < data.length; i++) {
      const element = array[i];
    }
  });
});
