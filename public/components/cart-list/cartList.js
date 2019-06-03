function CartListController(cartService) {

    const ctrl = this;
    
    ctrl.getItems = () => {
        cartService.getCart()
            .then((data) => {
                ctrl.cartItems = data;
            })
            .catch((err) => {
                console.log(err);
            })
    }

    ctrl.addItem = (addId, addProduct, addPrice, addQuantity) => {
        let itemToAdd = {
            id: addId,
            product: addProduct,
            price: addPrice,
            quantity: addQuantity
        }

        cartService.addItem(itemToAdd)
            .then((data) => {
                ctrl.getItems();
                //resetting
                ctrl.addProduct = '';
                ctrl.addPrice = '';
                ctrl.addQuantity = '';
            })
            .catch((err) => {
                console.log(err);
            })
    }

    ctrl.removeItem = (id) => {
        cartService.removeItem(id)
            .then((data) => {
                ctrl.cartItems = data;
                ctrl.getItems();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    ctrl.updateItem = (addQuantity, id) => {
        let itemToUpdate = {
            quantity: addQuantity,
        }
        cartService.updateItem(itemToUpdate, id)
            .then((data) => {
                ctrl.getItems();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    ctrl.getItems();
}

angular
    .module('CartApp')
    .component('cartList', {
        template: `
        <div class="container">
        <h2>Currently in your Cart</h2>
        <p ng-repeat="item in $ctrl.cartItems">
          Id#: {{item.id}}, name: {{item.product}}, price: {{item.price}}, quantity: {{item.quantity}}
        </p>
        </div>
      
        <div class="container">
        add item:
        <input ng-model="$ctrl.addId" type="number" placeholder="enter an unused ID#">
        <input ng-model="$ctrl.addType" type="text" placeholder="product name">
        <input ng-model="$ctrl.addCost" type="number" min="0.00" step=".01" placeholder="item cost">
        <input ng-model="$ctrl.addNumber" type="number" min="1" step="1" placeholder="how many?">
        <button ng-click="$ctrl.addItem($ctrl.addId, $ctrl.addType,$ctrl.addCost,$ctrl.addNumber)">Add</button>
        </div>

        <div container="container">
        remove item:
            <input ng-model="$ctrl.removedId" type="number" min="1" step="1" placeholder="Id#">
            <button ng-click="$ctrl.removeItem($ctrl.removedId)">Remove</button>
        </div>

        <div container="container">update quantity of item:
            <input ng-model="$ctrl.updatedId" type="number" min="1" step="1" placeholder="item id #">
            <input ng-model="$ctrl.updatedQuantity" type="number" min="0" step="1" placeholder="new amount">
            <button ng-click="$ctrl.updateItem($ctrl.updatedQuantity, $ctrl.updatedId)">Update</button>
        </div>
      `,
        controller: CartListController
    });