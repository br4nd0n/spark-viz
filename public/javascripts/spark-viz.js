/**
 * Created by brobrien on 10/26/16.
 */
'use strict';

var sparkVizModule = angular.module('sparkviz', ['btford.socket-io']);

sparkVizModule.factory('socket', function ($rootScope) {
    var socket = io('/');
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
});

sparkVizModule.controller('SparkVizController', ['$scope', '$http', 'socket', function ($scope, $http, socket) {

    socket.on('spark-metrics', function (msg) {
        //var data = JSON.parse(msg);
        console.log(msg);
        $scope.data = msg;
    });

    socket.on('time', function (msg) {
        $scope.time = msg;
    });
}])
;