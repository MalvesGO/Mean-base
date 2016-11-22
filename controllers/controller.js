
angular.module('pdApp')
    
    .controller('IndexController', IndexController);
     console.log('Ola do meu controlador')

function IndexController($scope, $http) {
    
    var atualizar = function () {
        $http.get('http://localhost:3000/listadeContatos').success(function (response) {
            //console.log(response)
            $scope.lista = response
            $scope.contato = '';
        });
    };

    atualizar();
    
    $scope.inserir = function () {
        //console.log($scope.contato)
        $http.post('http://localhost:3000/listadeContatos', $scope.contato).success(function (response) {
            //console.log(response);
            atualizar();
        });
    };
    
    $scope.remover = function (id) {
        //console.log(id)
        $http.delete('http://localhost:3000/listadeContatos/' + id).success(function (response) {
            atualizar();
        });
    };

    $scope.editar = function (id) {
        //console.log(id)
        $http.get('http://localhost:3000/listadeContatos/' + id).success(function (response) {
            $scope.contato = response
        });
    };
    
    $scope.atualizar = function () {
        $http.put('http://localhost:3000/listadeContatos/' +  $scope.contato._id, $scope.contato).success(function (response) {
            atualizar();
        });
    }
    
    $scope.limpar = function () {
        $scope.contato = '';
    }

}
