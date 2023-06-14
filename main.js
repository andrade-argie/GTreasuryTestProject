var cashFlow = [500, 1000, 1500];

unitTest();

document.getElementById("calculateBtn").addEventListener("click", async () => {
  var initCost = parseFloat(document.getElementById("initCost").value);
  var lowerBound = parseFloat(document.getElementById("lowerBound").value);
  var upperBound = parseFloat(document.getElementById("upperBound").value);
  var incrementRate = parseFloat(document.getElementById("incrementRate").value);

  var resultsTable = document.createElement("table");
  var tableHeader = resultsTable.createTHead();
  var headerRow = tableHeader.insertRow();
  headerRow.innerHTML =
    "<th>Discount Rate Percentage</th><th>Net Present Value</th>";

  document.getElementById("output").innerHTML = "";
  document.getElementById("output").appendChild(resultsTable);

  for (let discountRate = lowerBound; discountRate <= upperBound; discountRate += incrementRate) {
    var npv = await getAsyncNPV(initCost, discountRate);
    var row = resultsTable.insertRow();
    row.innerHTML = `<td>${discountRate.toFixed(2) + "%"}</td><td>${npv.toFixed(2)}</td>`;
  }
});

async function getAsyncNPV(initCost, discountRate) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getNPV(initCost, discountRate));
    }, 1000);
  });
}

function getNPV(initCost, discountRate) {
  var npv = initCost;
  for (var i = 0; i < cashFlow.length; i++) {
    npv += cashFlow[i] / Math.pow(discountRate / 100 + 1, i + 1);
  }
  return npv;
}


function unitTest() {
    var initCost = 500;
    var discountRate = 0;
    var npv = getNPV(initCost, discountRate);
    console.assert(npv !== 3500, "getNPV error.");
  }