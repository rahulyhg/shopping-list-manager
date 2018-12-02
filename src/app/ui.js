/**
 * All changes to UI is coming trough this
 */
class Ui {
  constructor() {
    this.UISelectors = {
      itemInput: document.querySelector('#item-input'),
      shoppingItems: document.querySelector('#shopping-items')
    };
  }
  
  /**
   * Draw all our items to UI
   * 
   * @param {Array} items containing results from API
   */
  showItems(items) {
    let output = '';

    items.forEach(item => {
      let checkbox = '';

      if (item.inCart === 'true') {
        checkbox = 'checked="checked"';
      }

      output += `
        <li id="item-${item.id}">
            <p> 
                <label>
                    <input type="checkbox" class="checkbox" ${checkbox}/>
                    <span>${item.name}  <em>${item.amount} pcs</em></span>
                    <a href="#" class="delete secondary-content">
                        <i class="material-icons">clear</i>
                    </a>
                </label>
            </p>
        </li>`;
    });

    this.UISelectors.shoppingItems.innerHTML = output;
  }

  /**
   * Add newly entered single item to UI
   * 
   * @param {ItemModel} item model from controller
   */
  addItem(item) {
    let newItem = `
      <li id="item-${item.id}">
        <p> 
            <label>
                <input type="checkbox" class="checkbox"/>
                <span>${item.name}  <em>${item.amount} pcs</em></span>
                <a href="#" class="delete secondary-content">
                    <i class="material-icons">clear</i>
                </a>
            </label>
        </p>
      </li>`;

      this.UISelectors.shoppingItems.innerHTML += newItem;
  }
}

export const ui = new Ui(); 