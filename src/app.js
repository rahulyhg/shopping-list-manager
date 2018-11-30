import { api } from './api';
import { ui } from './ui';


class App {
  constructor() {
    this.loadEventListeners();
  }

  loadEventListeners() {
    // DOM Load, get all items
    document.addEventListener('DOMContentLoaded', this.getItems);
    // Click event on actions on Checkbox and Delete (shopping-items ul)
    document.querySelector('#shopping-items').addEventListener('click', this.handleItemsClickEvent);
    // Submit new item event (enter key)
    document.getElementById('add-form').addEventListener('keyup', this.submitNewItemEvent);
    // Init side nav (materializeCss)
    document.addEventListener('DOMContentLoaded', this.initSidenav);
  }

  getItems() {
    api.get('http://localhost:3000/items')
    .then(items => ui.showItems(items))
    .catch(error => console.log(error));
  }

  // TODO Refactor
  handleItemsClickEvent(e) {
      if(e.target.classList.contains('checkbox')) {
      // Set setpoint status we want
      let checked = false;
      // We want to invert checked status, click means we want to invert it
      if (e.target.hasAttribute('checked')) {
        checked = false;
      } else {
        checked = true;
      }

      // Get ID
      const listIdArr = e.target.parentElement.parentElement.parentElement.id.split('-');
      const id = listIdArr[1];

      // GET from API and UPDATE checkbox
      api.get('http://localhost:3000/items/' + id)
      .then(item => {
        item.inCart = checked;
        api.put('http://localhost:3000/items/' + id, item);
      })
      .catch(error => console.log(error));
      // Checkbox UI is already done by materialize
    }

    /**
     * Delete item from API and UI
     */
    if (e.target.classList.contains('material-icons')) {
      // Get ID
      const item = e.target.parentElement.parentElement.parentElement.parentElement;
      const itemIdArr = item.id.split('-');
      const id = itemIdArr[1];
      // Delete from API
      api.delete('http://localhost:3000/items/' + id);
      // Delete from UI
      item.remove();
    }
  }

  ChangeSetPointStatusInApi() {
    
  }

  /**
   * Add new Item Event (Enter keydown)
   */
  submitNewItemEvent(e) {
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
        ui.UISelectors.itemInput.value = '';
      }

      e.preventDefault();
    }
  }

  initSidenav() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});
  }
}

// Initialize App
const app = new App();


// TODO Move to somewhere else
class ItemModel {
  constructor(name, amount, owner, inCart) {
    this.name = name;
    this.amount = amount;
    this.owner = owner;
    this.inCart = inCart;
  }
}


// Api Test
// function getFoodNames(toSearch) {
//   api.get('https://fineli.fi/fineli/api/v1/foods?q=omena')
//     .then(data => console.log(data))
//     .catch(error => console.log(error));
// }

// getFoodNames('omena');