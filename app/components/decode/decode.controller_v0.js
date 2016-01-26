;(function() {
    'use strict';

    //@TODO RX
    angular
        .module('morsecode.decode.controller',['rx', 'morsecode.decode.morse.service','commons.directives.marbleDiagram.directive'])
        .controller('DecodeController', DecodeController);

    //@TODO look at Morse Service
    //Try to use the functions of the MorseService
    DecodeController.$inject = ['$scope','MorseService','rx'];

    function DecodeController (  $scope,  MorseService,  rx) {

        var vm = this;

        //@TODO https://github.com/Reactive-Extensions/rx.angular.js/tree/master/docs
        /**
         *
         * mdStream: A stream of mouseDown events form the ng-moundown directive
         *
         * mdStream:    ---d----d--d----d------d-->
         *
         **/
        //@TODO test stream

        /**
         *
         * mdtStream: A stream of mouseDown events mapped to timestamp of event
         *
         * mdStream:    ---d----d--d----d------d--->
         *              vvvvv map(d to timestamp) vvvv
         * mdtStream:    ---t----t--t----t------t-->
         *
         **/


        /*
         * mutStream: A stream of mouseUp events form the ng-mounup directive mapped to timestamp of event
         *
         * mutStream:    ---u----u--u----u------u--->
         *              vvvvv map(u to timestamp) vvvv
         * mutStream:    ---t----t--t----t------t-->
         *
         **/


        //@TODO chain rx operators


        /*
         * mtdStream: A stream of the mouse down and up milliseconds generated from mdtStream and mutStream
         *
         * mdtStream:    --d---------d------------->
         * mutStream:    ------u-------------u----->
         *              vvvvv combine the two steams and cals time for mouse up and down (d and u becomes positive and negative numbers) vvvv
         * mtdStream:    ------t------t------t----->
         *
         **/
        //@TODO look at http://rxmarbles.com



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


        /*
         * msStream: A stream of strings representing morse symbols
         *
         * mcStream:    ---c-----c-----c-----c-------->
         *              vvvvv group chars to string whenever a long break occurs (s to string of morse chars) vvvv
         * mcStream:    ---------s-----------s-------->
         *
         **/
        //@TODO look for operator => https://github.com/Reactive-Extensions/RxJS/tree/master/doc/api/core/operators


        /**
         * cStream: A stream of characters translated from a morseesymbol)
         *
         * msStream:    ---s--s--s--s--s--s--s-->
         *              vvvvv filter(by existing morse symbol) vvvv
         * msStream:    ---s-----s--s-----s--s-->
         *              vvvvv map(s to a real character c ) vvvv
         * msStream:    ---c-----c--c-----c--c-->
         **/
        //@TODO chain rx operators


        //@TODO Extra challenge
        // group morse chars not only after long break is emitted, also group if the time of a mouse up is longer then a long break







    };

})();
