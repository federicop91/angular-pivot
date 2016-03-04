(function(){
    var module = angular.module('angular-pivottable', []);
// Inyect a $timeout function
    module.directive('ngPivot', ['$timeout', function($timeout ){
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {

                // Build Pivot
                var render = function(data, config){
                    if(data !== undefined){
                        jQuery(element).pivotUI(data, scope[attrs.options]);
                     }else{
                        throw "Invalid data input on angular-pivot directive :) -"
                    }
                }

                //Attempt to load google charts
                if(typeof google != 'undefined') {
                    google.load('visualization', '1.0', {
                        packages: ['corechart','charteditor'],
                        callback: function() {

                            var derivers = $.pivotUtilities.derivers;
                            var renderers = $.extend($.pivotUtilities.renderers, $.pivotUtilities.gchart_renderers);
                            var config = {
                                renderers : renderers
                            };
                            // First render
                            //pruebo esto
                            $timeout (function (){render(scope.$eval(attrs.ngPivot), config)},1000);
                        }
                    });
                }else{
                    // First render
                    $timeout (function (){render(scope.$eval(attrs.ngPivot), config)},1000);
                    var config = {};
                }

                // Data binding
                scope.$watch(attrs.ngPivot, function(value){
                    // Reload pivot
                    render(value, config);
                })

            }
        }
    }])
})();