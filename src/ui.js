class Ui {
  constructor() {
    this.UISelectors = {
      itemInput: document.querySelector('#item-input'),
      shoppingItems: document.querySelector('#shopping-items')
    };
  }

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

  addItem(item) {
    // TODO: THIS DO NOT WORK. It created ID in UI, that is not correct, but in the API correct ID is still created
    // It dosent really matter, on refresh its all ok, but still its wrong
    const shoppingItems = this.UISelectors.shoppingItems;
    const id = shoppingItems.childElementCount + 1;

    let newItem = `
      <li id="item-${id}">
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

      shoppingItems.innerHTML += newItem;
  }
}

export const ui = new Ui(); 