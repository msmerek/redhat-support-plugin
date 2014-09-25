
/*angular.module('RedhatAccess.common').directive('showtab',
    function () {
        return {
            link: function (scope, element, attrs) {
                element.click(function(e) {
                    e.preventDefault();
                    $(element).tab('show');
                });
            }
        };
    });*/


angular.module('RedhatAccess.common').run(
        ['SECURITY_CONFIG', function (SECURITY_CONFIG) { SECURITY_CONFIG.forceLogin = true; }
]);

angular.module('RedhatAccess.customCaseView', ['RedhatAccess.cases'])
        .controller('customCase', ['$scope', '$location', 'securityService', 'NEW_DEFAULTS', function($scope, $location, securityService, NEW_DEFAULTS) {
            NEW_DEFAULTS.product = "Red Hat JBoss Enterprise Application Platform";
            NEW_DEFAULTS.version = "6.2.0";
            $scope.selected = 'search';
            $scope.openSearchClick = function(){
                $location.path('search');
            };
            $scope.openCaseClick = function(){
                $location.path('case/new');
            };
            $scope.modifyCaseClick = function(){
                $location.path('case/list');
            };
            $scope.init = function () {
                securityService.validateLogin(true);
                if($location.$$path == '/case/list'){
                    $scope.selected = 'modify-case';
                }
                else if($location.$$path == '/case/new'){
                    $scope.selected = 'open-case';
                }
                else{
                    $scope.selected = 'search';
                    $location.path('search');
                }
            };
        }]);