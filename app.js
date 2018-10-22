class Item
{
    constructor(name, amount, status)
    {
        this.name = name;
        this.amount = amount;
        this.status = status;
    }
}

class UI
{
    static CheckIfEmpty()
    {
        const items = document.getElementById('items');
        if (items.children.length === 0)
        {
            items.innerHTML = "<div id='empty'>No results to show...</div>"
        }
        else
        {
            const empty = document.getElementById('empty');
            if (empty != null)
            {
                empty.remove();
            }
        }
    }

    AddItemToList(item)
    {
        const button = document.createElement('a');
        if (item.status === false)
        {
            button.className = 'btnDisabled';
        }
        else
        {
            button.className = 'btnEnabled';
        }
        
        button.innerHTML = item.name;

        const amount = document.createElement('div');
        amount.className = 'txtAmount';
        amount.innerHTML = item.amount;

        const btnDelete = document.createElement('a');
        btnDelete.className = 'btnDelete';
        btnDelete.innerHTML = 'X';
        
        const row = document.createElement('div');
        row.className = 'row';
        row.appendChild(button);
        row.appendChild(amount);
        row.appendChild(btnDelete);
    
        const list = document.getElementById('items');
        list.appendChild(row);
    }

    ShowAlert(message, className)
    {
        const isAlert = document.querySelector('.alert');
        console.log(isAlert);
        if (isAlert === null)
        {
            const alert = document.createElement('div');
            alert.className = `alert ${className}`;
            alert.appendChild(document.createTextNode(message));
    
            const alertRow = document.createElement('div');
            alertRow.className = "row";
            alertRow.appendChild(alert);
    
            const content = document.querySelector('.content');
            const items = document.querySelector('#items');
            content.insertBefore(alertRow, items);
            setTimeout(function() {
                document.querySelector('.alert').remove();
            }, 3000);
        }
    }

    SetStatus(e)
    {
        if (e.target.className === 'btnEnabled')
        {
            e.target.className = 'btnDisabled';
        }
        else if (e.target.className === 'btnDisabled')
        {
            e.target.className = 'btnEnabled';
        }
    }

    DeleteItem(target)
    {
        if (target.className === 'btnDelete') 
        {
            target.parentElement.remove();
        }
    }

    clearFields() 
    {
        document.getElementById('name').value = '';
        document.getElementById('amount').value = '';
    }
}

class LocStorage
{
    static GetItems()
    {
        let items;
        if (localStorage.getItem('items') === null)
        {
            items = [];
        }
        else
        {
            items = JSON.parse(localStorage.getItem('items'));
        }
        return items;
    }

    static DisplayItems()
    {
        const items = LocStorage.GetItems();
        items.forEach(item => {
            const ui = new UI();
            ui.AddItemToList(item);
        });
        UI.CheckIfEmpty();
    }

    static SetStatus(e)
    {
        const items = LocStorage.GetItems();
        items.forEach(item => {
            if (item.name === e.target.parentElement.firstChild.textContent)
            {
                if (item.status === true)
                {
                    item.status = false;
                }
                else
                {
                    item.status = true;
                }
            }
        });
        localStorage.setItem('items', JSON.stringify(items));
    }

    static AddItem(item)
    {
        const items = LocStorage.GetItems();
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
    }

    static RemoveItem(name)
    {
        const items = LocStorage.GetItems();
        items.forEach(function(item, index) 
        {
            if (item.name === name)
            {
                items.splice(index, 1);
            }
        });
        localStorage.setItem('items', JSON.stringify(items));
    }
}

/*
    DOM EVENTS
*/

// DOM Load Event
document.addEventListener('DOMContentLoaded', LocStorage.DisplayItems);

// Event Listener for items Click
document.getElementById('items').addEventListener('click', function(e) 
{ 
    const ui = new UI();

    // Delete
    if (e.target.className === 'btnDelete')
    {
        ui.DeleteItem(e.target);
        LocStorage.RemoveItem(e.target.parentElement.firstChild.textContent);
        ui.ShowAlert('Item Deleted Successfully!', 'success');
    }

    // Status 
    ui.SetStatus(e);
    LocStorage.SetStatus(e);

    UI.CheckIfEmpty();
    e.preventDefault();
});

// Event Listeners for Add Item
document.getElementById('add-form').addEventListener('keyup', 
function(e) 
{
    if (e.keyCode === 13) // If enter
    {
        // Get form values
        const name = document.getElementById('name').value,
        amount = document.getElementById('amount').value

        const item = new Item(name, amount, false)

        // Instantiate UI
        const ui = new UI();

        // Validate
        if (name === '' || amount === '') 
        {
            ui.ShowAlert('Please fill in all fields', 'error');
        } 
        else 
        {
            ui.AddItemToList(item);
            LocStorage.AddItem(item)
            ui.ShowAlert('Item added successfully!', 'success');
            ui.clearFields();
        }
        UI.CheckIfEmpty();
    }
    e.preventDefault();
});