const container = document.getElementById('container');
const selectSeason = document.getElementById('season');
selectSeason.addEventListener('change', displayItDOM);

var productsList;
var categoryList;

function dataRequestFailed(e) {
    console.log('dataRequestFailed');
}

var productsJSON = new XMLHttpRequest();

productsJSON.addEventListener('load', productsDataRequestComplete);
productsJSON.addEventListener('error', dataRequestFailed);

productsJSON.open('GET', 'products.json');
productsJSON.send();

function productsDataRequestComplete(e) {
    console.log('Data Request Complete');
    productsList = JSON.parse(e.target.responseText).products;

    var categoriesJSON = new XMLHttpRequest();

    categoriesJSON.addEventListener('load', categoryDataRequestComplete);
    categoriesJSON.addEventListener('error', dataRequestFailed);

    categoriesJSON.open('GET', 'categories.json');
    categoriesJSON.send();

}

function categoryDataRequestComplete(e) {
    console.log('Data Request Complete');
    categoryList = JSON.parse(e.target.responseText).categories;
    displayItDOM();
}

function displayItDOM() {
    var holdData = '';
    var seasonDiscount = selectSeason.value;
    for (var i = 0; i < categoryList.length; i++) {
        holdData += `<div><h2>${categoryList[i].name}</h2>`;
        for (var j = 0; j < productsList.length; j++) {
            var discount = ((productsList[j].price) * (1 - categoryList[i].discount)).toFixed(2);

            if ((categoryList[i].id == selectSeason.value) && (productsList[j].category_id == categoryList[i].id)) {
                holdData += `<p>${productsList[j].name}: <strong>$${discount}</strong></p>`;
            } else if (productsList[j].category_id == categoryList[i].id) {
                holdData += `<p>${productsList[j].name}: <strong>$${productsList[j].price}</strong></p>`;
            }

        }
        holdData += `</div>`;

    }
    container.innerHTML = holdData;
}