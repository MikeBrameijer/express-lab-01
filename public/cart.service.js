// how to use the api.
function CartService($http, $q) {
    const service = this;

    service.getCart = () => {
        return $q(function (resolve, reject) {
            $http.get('/cart-items')
                .then((response) => {
                    console.log("got it")
                    console.log(response.data);
                    resolve(response.data);
                })
                .catch((err) => {
                    console.error(err);
                    reject(err);
                })
        })
    }

    service.removeItem = (id) => {
        return $http({
            url: "/cart-items/" + id,
            method: "DELETE"
        }).then((response) => {
            return response.data;
        });
    }

    service.addItem = (item) => {
        return $http({
            url: "/cart-items",
            method: "POST",
            data: item
        }).then((response) => {
            return response.data;
        });
    }

    service.updateItem = (item, id) => {
        return $http({
          url: "/cart-items/" + id,
          method: "PUT",
          data: item
        }).then((response) => {
          return response.data;
        });
      }

}

angular
    .module("CartApp")
    .service("cartService", ["$http", "$q", CartService])