import { api } from './api';
import { ui } from './ui';

const apiUrl = "http://shopping.test/api/items.php";

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
    api.get(apiUrl)
    .then(items => ui.showItems(items))
    .catch(error => console.log(error));
  }

  // TODO Refactor
  handleItemsClickEvent(e) {
      /**
       * Checkbox Click
       */
      if(e.target.classList.contains('checkbox')) {

        // Get ID
        const listIdArr = e.target.parentElement.parentElement.parentElement.id.split('-');
        const id = listIdArr[1].toString();

        // Change Checkbox
        // GET from API and UPDATE item back

        // Get item to update
        api.get(apiUrl + '?id=' + id)
          .then(item => {
            // We want to reverse it after we have clicked
            if (item.inCart === 'true') {
              item.inCart = 'false';
            } else if (item.inCart === 'false') {
              item.inCart = 'true';
            }

            // Update item back to API
            api.put(apiUrl, item);
          })
          .catch(error => console.log(error));
    }

    /**
     * Delete item from API and UI
     */
    if (e.target.classList.contains('material-icons')) {
      // Get ID
      const item = e.target.parentElement.parentElement.parentElement.parentElement;
      const itemIdArr = item.id.split('-');
      const id = itemIdArr[1];

      // Delete from API (only id is needed)
      api.delete(apiUrl, { id : id});
      // Delete from UI
      item.remove();
    }
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
        let item = new ItemModel(itemInput.value, 1, 2, "false");

        console.log(item);

        api.post(apiUrl, item);

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
  constructor(name, amount, inCart, userId) {
    this.name = name;
    this.amount = amount;
    this.inCart = inCart;
    this.userId = userId;
  }
}


// Api Test
// function getFoodNames(toSearch) {
//   api.get('https://fineli.fi/fineli/api/v1/foods?q=omena')
//     .then(data => console.log(data))
//     .catch(error => console.log(error));
// }

// getFoodNames('omena');