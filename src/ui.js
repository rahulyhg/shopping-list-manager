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

      if (item.inCart) {
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
    // Figure out new ID for new UI item, so we dont have to fetch newly added item from API.
    // When page is refreshed, then ID is from API, but when adding then new UI element
    // gets id from here, but again when refresh then from API :)
    // Maybe better solution, in some other time :)
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