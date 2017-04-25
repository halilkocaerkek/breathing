angular.module('starter.services', [])

.factory('Stages', function($rootScope) {

    //var storage = window.localStorage;
    //storage.removeItem('stages');
    //var sStages = storage.getItem('stages');
    var stages;

    //if (sStages === null || typeof sStages === 'undefined' || sStages == 'undefined') {
    stages = [{
            id: 0,
            name: 'Inhale',
            length: new Number(10),
            color: '#CDDC39'
        },
        {
            id: 1,
            name: 'Retain',
            length: new Number(10),
            color: '#FFB300'
        },
        {
            id: 2,
            name: 'Exhale',
            length: new Number(10),
            color: '#4FC3F7'
        },
        {
            id: 3,
            name: 'Sustain',
            length: new Number(11),
            color: '#FF7043'
        }

    ];

    saveStages();
    //} else {
    //    stages = JSON.parse(sStages);
    //}

    function getStages() {
        //var jstring = storage.getItem('stages');
        //stages = JSON.parse(jstring);
        stages = $rootScope.stages;
    }

    function saveStages() {
        //storage.setItem('stages', JSON.stringify(stages));
        $rootScope.stages = stages;
    }

    return {
        all: function() {
            getStages();
            return stages;
        },

        count: function() {
            getStages();
            var total = new Number(0);
            for (i = 0; i < stages.length; i++) {
                total += new Number(stages[i].length);
            }
            return total;
        },

        majorTics: function() {
            getStages();
            // 0 20 40 60 80 100 120 140 160 180 200 220
            var c = this.count();
            var tics = "0 ";
            //for (i = 0; i < c; i += 20) {
            //    tics += i + " ";
            //}
            for (i = 0; i < stages.length; i++) {
                tics += stages[i].length + " ";
            }
            tics += c;
            return "";
        },

        highlights: function() {
            getStages();
            var s = "";
            var start = Number(0);
            var comma = "";
            for (i = 0; i < stages.length; i++) {
                var e = parseInt(stages[i].length) + parseInt(start);
                stages[i].start = start;
                stages[i].end = e;
                s += comma + start + " " + e + " " + stages[i].color;
                start += parseInt(stages[i].length);
                comma = ", ";
            }
            return s;
        },

        remove: function(stage) {
            getStages();
            stages.splice(chats.indexOf(stage), 1);
            saveStages();
        },

        get: function(stageId) {
            getStages();
            for (var i = 0; i < stages.length; i++) {
                if (stages[i].id === parseInt(stageId)) {
                    return stages[i];
                }
            }
            return null;
        },

        save: function(stage) {
            for (var i = 0; i < stages.length; i++) {
                if (stages[i].id === parseInt(stage.id)) {
                    stages[i] = stage;
                    saveStages();
                    return;
                }
            }
            return null;
        }
    };
});