/* global angular */
(function () {
    'use strict';

    function Controller() {
        var ctrl = this;

        function loadCallback() {
            var loadingPromise = ctrl.bbListbuilderOnLoadMore();

            if (loadingPromise && angular.isFunction(loadingPromise.then)) {
                loadingPromise.then(function () {
                    ctrl.listbuilderCtrl.highlightLastSearchText();
                });
            } else {
                ctrl.listbuilderCtrl.highlightLastSearchText();
            }

            return loadingPromise;
        }

        ctrl.loadCallback = loadCallback;
    }

    angular.module('sky.listbuilder.footer.component', ['sky.resources', 'sky.infinitescroll'])
        .component('bbListbuilderFooter', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.footer.component.html',
            bindings: {
                bbListbuilderOnLoadMore: '&?',
                bbListbuilderShowLoadMore: '<?'
            },
            controller: Controller,
            transclude: true,
            require: {
                listbuilderCtrl: '^bbListbuilder'
            }
        });
}());