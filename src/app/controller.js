import { httplib } from './httplib';
import { ui } from './ui';

/**
 * Apps controller
 * Makes changes to backend API and frontend UI
 */
class Controller {
  constructor() {
    this.apiUrl = '';
  }
  
  /**
   * Gets all items from API and adds to UI
   */
  getItems() {
    httplib.request('GET', this.apiUrl)
      .then(items => ui.showItems(items))
      .catch(error => console.log(error));
  }

  /**
   * Adds new item to backend API, that returns full item with created ID
   * Returned item will be added to UI
   */
  addNewItem() {
    const itemName = ui.UISelectors.itemInput.value;

    if (itemName === '') {
      alert("Item input cannot be empty");
      location.reload();
    }

    const itemName = this._setItemName();
    let item = new ItemModel(itemName, 1, "false", 2);

    httplib.request('POST', this.apiUrl, item)
      .then(returnedJson => {
        item.id = returnedJson.id;
        ui.addItem(item);
        ui.UISelectors.itemInput.value = '';
      })
      .catch(error => console.log(error));
  }

  /**
   * Deletes item from backend API and removes it from UI
   * 
   * @param {event} e click event containing clicked element
   */
  deleteItem(e) {
    const item = e.target.parentElement.parentElement.parentElement.parentElement;
    const itemIdArr = item.id.split('-');
    const id = itemIdArr[1];
    httplib.request('DELETE', this.apiUrl, { id : id});
    item.remove();
  }

  /**
   * Checkbox status (inCart) on the backend API when item is clicked
   * 
   * @param {event} e click event containing clicked element
   */
  setItemCheckbox(e) {
    const listIdArr = e.target.parentElement.parentElement.parentElement.id.split('-');
    const id = listIdArr[1].toString();

    httplib.request('GET', this.apiUrl + '?id=' + id)
      .then(item => {
        // We want to reverse it after we have clicked
        if (item.inCart === 'true') {
          item.inCart = 'false';
        } else if (item.inCart === 'false') {
          item.inCart = 'true';
        }

        httplib.request('PUT', this.apiUrl, item);
      })
      .catch(error => console.log(error));
  }
}

/**
 * We are using this to pass our item to API
 */
class ItemModel {
  constructor(name, amount, inCart, userId) {
    this.name = name;
    this.amount = amount;
    this.inCart = inCart;
    this.userId = userId;
  }
}

export const controller = new Controller();