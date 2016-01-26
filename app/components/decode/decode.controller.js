;(function() {
    'use strict';

    //@TODO RXJS rx-angular
    angular
        .module('morsecode.decode.controller',['rx', 'morsecode.decode.morse.service','commons.directives.marbleDiagram.directive'])
        .controller('DecodeController', DecodeController);

    //@TODO Morse Service
    DecodeController.$inject = ['$scope','MorseService','rx'];
    function DecodeController (  $scope,  MorseService,  rx) {

        var vm = this;

        //@TODO https://github.com/Reactive-Extensions/rx.angular.js/tree/master/docs
        /**
         *
         * mdStream: A stream of mouseDown events
         *
         * mdStream:    ---d----d--d----d------d-->
         *
         **/
            //@TODO test stream
        vm.mdStream = $scope
            .$createObservableFunction('mouseDown');


        /**
         *
         * mdtStream: A stream of mouseDown events mapped to timestamp of event
         *
         * mdStream:    ---d----d--d----d------d--->
         *              vvvvv map(d becomes Date.now()) vvvv
         * mdtStream:    ---t----t--t----t------t-->
         *
         **/
        vm.mdtStream = vm.mdStream
            .map(function (d) { return Date.now(); });

        /*
         * mutStream: A stream of mouseUp events mapped to timestamp of event
         *
         * mutStream:    ---u----u--u----u------u--->
         *              vvvvv map(u becomes Date.now()) vvvv
         * mutStream:    ---t----t--t----t------t-->
         *
         **/
        vm.mutStream = $scope
            .$createObservableFunction('mouseUp')
            .map(function (u) { return Date.now(); });

        //@TODO chain rx operators

        /*
         * mtdStream: A stream of the mouse down and up milliseconds generated from mdtStream and mutStream
         *
         * mdtStream:    --d---------d------------->
         * mutStream:    ------u-------------u----->
         *              vvvvv combineLatest(d and u becomes [d,u]) vvvv
         *              -------a-----a-------a----->
         *              vvvvv map(a to time between t) vvvv
         * mtdStream:    ------t------t------t----->
         *
         **/
        vm.mtdStream =  rx.Observable
            .combineLatest(vm.mdtStream, vm.mutStream)
            .map(MorseService.mapCalcDiff);


        /*
         * mcStream: A stream of mours characters ("." for short and "_" for long )
         *
         *
         * mtdStream:   ---t----t---t----t------t-->
         *              vvvvv map(t becomes one of 4 morse chars) vvvv
         * mcStream:    ---c--c--c--c--c--c--c----c--->
         *              vvvvv filter(c by all but short break) vvvv
         * mcStream:    ---c-----c-----c-----c-------->
         **/
        vm.mcStream = vm.mtdStream
            .map(MorseService.mapMsToMorseChar)
            .filter(MorseService.filterByCharNotShortBreak);


        /*
         * msStream: A stream of strings representing morse symbols
         *
         * mcStream:    ---c-----c-----c-----c-------->
         *              vvvvv window( emit windows when one of c is long break char ) vvvv
         * mcStream:    ---------w-----------w-------->
         *              vvvvv flatMap(w to [ccc] ) vvvv
         * mcStream:    ---------a-----------a-------->
         *              vvvvv map(a to string of morse chars) vvvv
         * mcStream:    ---------s-----------s-------->
         *
         **/
        //@TODO look for operator => https://github.com/Reactive-Extensions/RxJS/tree/master/doc/api/core/operators
        vm.msStream = vm.mcStream
            //assemble until we get a long break or time for long break is past while mouse up
            .window(vm.mcStream.filter(MorseService.filterByCharLongBreak))
            //window returns a stream
            .flatMap(function (w) { return w.toArray(); })
            //create morse symbol from array
            .map(MorseService.mapCharArrayToSymbol);

        /**
         * cStream: A stream of characters translated from a morsesymbol)
         *
         * msStream:    ---s--s--s--s--s--s--s-->
         *              vvvvv filter(by existing morse symbol) vvvv
         * msStream:    ---s-----s--s-----s--s-->
         *              vvvvv map(s to a real character c ) vvvv
         * msStream:    ---c-----c--c-----c--c-->
         **/
        vm.cStream = vm.msStream
            //filter by valid morse symbol
            .filter(MorseService.filterExistingMorseSymbol)
            .map(MorseService.mapSymbolToChar);

        //@TODO chain methods

        //@TODO Extra challenge
        // group morse chars not only after long break is emitted, also group if the time of a mouse up is longer then a long break




    };

})();
