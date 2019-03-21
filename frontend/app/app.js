var app = angular.module('app', [    
    'ngMaterial',    
    'ngRoute',    
    'ngResource',   
    'ngMessages',
    'service',        
    'clienteController'
    'ui.mask',
]);     

app.config (function ($routeProvider, $mdIconProvider) {    
    $routeProvider    
    .when("/clientes", {
        controller: "clientesController",
        templateUrl: "app/views/clientes.html"       
    })      
    .otherwise({redirectTo: "/"});
    $mdIconProvider.icon('md-close', 'img/icons/ic_close_24px.svg', 24);
    $mdIconProvider.fontSet('md', 'material-icons');
});

