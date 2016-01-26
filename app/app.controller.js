(function() {
    'use strict';

	angular
	    .module('morsecode.app.controller', [])
	    .controller('AppController', AppController);
	
	AppController.$inject = ['$state'];

	function AppController($state) {

		var vm = this;
		
		vm.navCollapsed = true;
		vm.$state = $state;
	};



})();
