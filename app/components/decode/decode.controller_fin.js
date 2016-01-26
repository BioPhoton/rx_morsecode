;(function() {
    'use strict';

    angular
        .module('morsecode.decode.controller',['rx', 'morsecode.decode.morse.service','commons.directives.marbleDiagram.directive'])
        .controller('DecodeController', DecodeController);


    DecodeController.$inject = ['$scope','MorseService','rx'];
    function DecodeController (  $scope,  MorseService,  rx) {

        var vm = this;

        vm.mdtStream = $scope
            .$createObservableFunction('mouseDown')
            .map(function (d) { return Date.now(); });

        vm.mutStream = $scope
            .$createObservableFunction('mouseUp')
            .map(function (u) { return Date.now(); });

        vm.mcStream = rx.Observable
            .combineLatest(vm.mdtStream, vm.mutStream)
            .map(MorseService.mapCalcDiff)
            .map(MorseService.mapMsToMorseChar)
            .filter(MorseService.filterByCharNotShortBreak);

        vm.cStream = vm.mcStream
            .window(vm.mcStream.filter(MorseService.filterByCharLongBreak))
            .flatMap(function (w) { return w.toArray(); })
            .map(MorseService.mapCharArrayToSymbol)
            .filter(MorseService.filterExistingMorseSymbol)
            .map(MorseService.mapSymbolToChar);

        //@TODO Extra challenge
        // group morse chars not only after long break is emitted, also group if the time of a mouse up is longer then a long break
        // ;-)


    };

})();
