
import { controller } from './app/controller';

/**
 * Api URL Here!
 */
const apiUrl = "http://shopping.test/api/items.php";
controller.apiUrl = apiUrl;


/**
 * On DOM Load, get all items and initialize Materialize mobile side nav
 */
document.addEventListener('DOMContentLoaded', function() {
  controller.getItems();
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {});
});


/**
 * Click event on list item. Checkbox and Delete (shopping-items ul)
 */
document.querySelector('#shopping-items').addEventListener('click', function(e) {
  if(e.target.classList.contains('checkbox')) {
    controller.setItemCheckbox(e);
    }
  else if (e.target.classList.contains('material-icons')) {
    controller.deleteItem(e);
  }
});


/**
 * Submit Event. On add new Item (Enter keyup)
 */
document.getElementById('add-form').addEventListener('keyup', function(e) {
  if ((e.key === 'Enter') === false) {
    return;
  }
  
  controller.addNewItem();
  e.preventDefault();
});


// Api Test
// function getFoodNames(toSearch) {
//   api.get('https://fineli.fi/fineli/api/v1/foods?q=omena')
//     .then(data => console.log(data))
//     .catch(error => console.log(error));
// }

// getFoodNames('omena');