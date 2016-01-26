;(function() {
    'use strict';

    angular
        .module('commons.directives.marbleDiagram.directive', [])
        .directive('marbleDiagram', marbleDiagram);

    //marbleDiagram.$inject = [];

    function marbleDiagram() {

        var diagram =
            '<div class="marble-diagram row">'+
                '<div class="title col-sm-12" ng-bind="title"></div>'+
                '<div class="marbles col-sm-12">'+
                    '<div ' +
                        'class="marble" ng-class="{{marbleClass}}" ' +
                        'ng-repeat="marble in marbles track by $index"' +
                        'ng-bind="marble" >' +
                    '</div>'+
                '</div>'+
            '</div>';

        return {
            // restrict to an element type.
            restrict: 'E',
            replace: true,
            template: diagram,
            scope : {
                title : '@',
                marbleClass : '@',
                staticSymbol : '@',
                stream : '='
            },
            link : function linkFunction(scope, el, attrs) {

                scope.marbles = [];

                init();

                ///////////////////////////////

                function init() {
                    scope.stream
                        .subscribe(
                            function(results) {
                                    scope.marbles.push((scope.staticSymbol)?scope.staticSymbol:results);
                            },
                            function(error) {

                            }
                    );
                }
            }


        };

    };



})();