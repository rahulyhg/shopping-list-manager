import { api } from './api';
import { ui } from './ui';

/*
    DOM EVENTS
*/

/**
 * MaterializeCSS Side Nav
 */
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {});
});

/**
 * Get shopping items from API on DOM load
 */
document.addEventListener('DOMContentLoaded', function () {
  api.get('http://localhost:3000/items')
  .then(items => ui.showItems(items))
  .catch(error => console.log(error));
});

/**
 * Listen Click event on Shopping Items
 * Handles Checkbox and Delete
 * Updates API and UI
 */
document.querySelector('#shopping-items').addEventListener('click', function(e) {
  // Handle Checkbox (note UI updates with Materialize CSS)
  if(e.target.classList.contains('checkbox')) {
    let checked = false;
    // We want to invert checked status, click means we want to invert it
    if (e.target.hasAttribute('checked')) {
      checked = false;
    } else {
      checked = true;
    }

    // Update API, new item with new Checkbox status
    const listId = e.target.parentElement.parentElement.parentElement.id;
    const listIdArr = listId.split('-');
    const id = listIdArr[1];

    api.get('http://localhost:3000/items/' + id)
    .then(item => {
      item.inCart = checked;
      api.put('http://localhost:3000/items/' + id, item);
    })
    .catch(error => console.log(error));
  }


  // Handle Delete


});

// TODO Move to somewhere else
class ItemModel {
  constructor(name, amount, owner, inCart) {
    this.name = name;
    this.amount = amount;
    this.owner = owner;
    this.inCart = inCart;
  }
}

/**
 *  Listen for Add New Item event (ENTER Key)
 * 
 */
document.getElementById('add-form').addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
      const itemInput = ui.UISelectors.itemInput;

      if (itemInput.value === '') {
        alert("Item input cannot be empty");
      } else {
        // Post new item to Api
        let item = new ItemModel(itemInput.value, 1, "Meelis", false);
        api.post('http://localhost:3000/items', item);

        // Add new item to Ui
        ui.addItem(item);
        ui.clearItemInput();
      }

      e.preventDefault();
    }
});

// Api Test
// function getFoodNames(toSearch) {
//   api.get('https://fineli.fi/fineli/api/v1/foods?q=omena')
//     .then(data => console.log(data))
//     .catch(error => console.log(error));
// }

// getFoodNames('omena');