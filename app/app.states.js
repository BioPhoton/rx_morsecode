;(function() {
    'use strict';

angular
    .module('morsecode.states', ['ui.router', 'morsecode.app.controller', 'morsecode.decode.controller'])
    .config(configFunction);

	configFunction.$inject = ['$stateProvider', '$urlRouterProvider'];

	/** @ngInject */ 
	function configFunction($stateProvider, $urlRouterProvider) 
	{ 
		
		//routing configurations
		$urlRouterProvider.otherwise('/app/decode');
	    
	    $stateProvider
	
	    //holds the navigation and toggled state of menu
	    .state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "app/app.view.html",
            controller: 'AppController',
            controllerAs : 'app'
        })

        .state('app.decode', {
	        url: '/decode',
			templateUrl: './app/components/decode/decode.view.html',
			controller: 'DecodeController',
			controllerAs : 'decode'
	    })

		;

	};

})();



