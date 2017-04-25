angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $interval, Stages, $ionicPlatform) {
    var h = window.screen.height - 300;
    $scope.repeatCount = new Number(5);
    var stages;
    var max;
    var min;
    var timer;

    stages = Stages.all();
    max = Stages.count();
    min = 0;

    init();

    function init() {
        $scope.gauge = null;
        $scope.counter = $scope.repeatCount;
        $scope.gauge = {
            value: 0,
            minValue: 0,
            maxValue: Stages.count(),
            width: h,
            height: h,
            units: $scope.counter,
            dataTitle: "Nefes Al",
            majorTics: Stages.majorTics(),
            highlights: Stages.highlights()
        };
    };

    $scope.start = function() {
        // Don't start a new fight if we are already fighting
        if (angular.isDefined(timer)) return;
        init();
        //vm.play('Tick');
        timer = $interval(function() {
            var v = $scope.gauge.value;
            v++;
            if (v > max) {
                v = min;
                $scope.counter--;
                if (new Number($scope.counter) == 0) {
                    $scope.counter = $scope.repeatCount;
                    $scope.stop();
                }
            }
            $scope.gauge.value = v;
            stages = Stages.all();
            for (i = 0; i < stages.length; i++) {
                if (v > stages[i].start && v < stages[i].end)
                    $scope.gauge.dataTitle = stages[i].name;

            }
        }, 100);
    };

    $scope.stop = function() {
        if (angular.isDefined(timer)) {
            $interval.cancel(timer);
            timer = undefined;
        }
        $scope.gauge.value = 0;
    };
})

.controller('ChatsCtrl', function($scope, Stages) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //   var a = 1;
    //   $scope.stages = Stages.all();
    //});


    $scope.remove = function(stage) {
        Stages.remove(stage);
    };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Stages) {
    $scope.stage = Stages.get($stateParams.chatId);

    $scope.$watch('stage', function() {
        Stages.save($scope.stage);
    }, true);
})

.controller('AccountCtrl', function($scope) {
    $scope.settings = {
        enableFriends: true
    };
});