;(function() {
    'use strict';

    angular
        .module('morsecode.decode.morse.service', [])
        .factory('MorseService', MorseService);

    //MorseService.$inject = ['$scope', 'rx'];

    function MorseService() {

        //object of morse characters
        var morseCharacters = {
                short : '.',
                long  : "-",
                shortBreak : "|",
                longBreak  : "_"
            },
        //object of morse time ranges
            morseTimeRanges = {
                short : 200,//0ms to 200ms
                long  : 400,//201ms to 400ms
                shortBreak : -550,//-1ms to -450
                longBreak  : -1000//-450 to -1000
            },
         morseTranslationArray = [
            //letters
            {symbol: ".-", char: "A"},
            {symbol: "-...,", char: "B"},
            {symbol: "-.-.", char: "C"},
            {symbol: "-..", char: "D"},
            {symbol: ".", char: "E"},
            {symbol: "..-.", char: "F"},
            {symbol: "--.", char: "G"},
            {symbol: "....", char: "H"},
            {symbol: "..", char: "I"},
            {symbol: ".---", char: "J"},
            {symbol: "-.-", char: "K"},
            {symbol: ".-..", char: "L"},
            {symbol: "--", char: "M"},
            {symbol: "-.", char: "N"},
            {symbol: "---", char: "O"},
            {symbol: ".--.", char: "P"},
            {symbol: "--.-", char: "Q"},
            {symbol: ".-.", char: "R"},
            {symbol: "...", char: "S"},
            {symbol: "-", char: "T"},
            {symbol: "..-", char: "U"},
            {symbol: "...-", char: "V"},
            {symbol: ".--", char: "W"},
            {symbol: "-..-", char: "X"},
            {symbol: "-.--", char: "Y"},
            {symbol: "--..", char: "Z"},
            //numbers
            {symbol: "-----", char: "0"},
            {symbol: ".----", char: "1"},
            {symbol: "..---", char: "2"},
            {symbol: "...--", char: "3"},
            {symbol: "....-", char: "4"},
            {symbol: ".....", char: "5"},
            {symbol: "-....", char: "6"},
            {symbol: "--...", char: "7"},
            {symbol: "---..", char: "8"},
            {symbol: "----.", char: "9"},
            //specialsigns
            {symbol: ".--.-", char: "À"},//À,Å
            {symbol: ".-.-", char: "Ä"},
            {symbol: ".-..-", char: "È"},
            {symbol: "..-..", char: "É"},
            {symbol: "---.", char: "Ö"},
            {symbol: "..--", char: "Ü"},
            {symbol: "...--..", char: "ß"},
            {symbol: "----", char: "CH"},
            {symbol: "--.--", char: "Ñ"},
            {symbol: ".-.-.-", char: "."},//(AAA)
            {symbol: "--..--", char: ","},//(MIM)
            {symbol: "---...", char: ":"},  //(OS)
            {symbol: "-.-.-.", char: ";"},//(NNN)
            {symbol: "..--..", char: "?"},//(IMI)
            {symbol: "-....-", char: "-"},
            {symbol: "..--.-", char: "_"},//(UK)
            {symbol: "-.--.", char: "("},//(KN)
            {symbol: "-.--.-", char: ")"},//(KK)
            {symbol: ".----.", char: "'"},
            {symbol: "-...-", char: "="},
            {symbol: ".-.-.", char: "+"},//(AR)
            {symbol: "-..-.", char: "/"},//(DN)
            {symbol: ".--.-.", char: "@"}//(AC)
        ],
            morseSymbolsArray = [
                ".-",
                "-...,",
                "-.-.",
                "-..",
                ".",
                "..-.",
                "--.",
                "....",
                "..",
                ".---",
                "-.-",
                ".-..",
                "--",
                "-.",
                "---",
                ".--.",
                "--.-",
                ".-.",
                "...",
                "-",
                "..-",
                "...-",
                ".--",
                "-..-",
                "-.--",
                "--..",
                "-----",
                ".----",
                "..---",
                "...--",
                "....-",
                ".....",
                "-....",
                "--...",
                "---..",
                "----.",
                ".--.-",
                ".-.-",
                ".-..-",
                "..-..",
                "---.",
                "..--",
                "...--..",
                "----",
                "--.--",
                ".-.-.-",
                "--..--",
                "---...",
                "-.-.-.",
                "..--..",
                "-....-",
                "..--.-",
                "-.--.",
                "-.--.-",
                ".----.",
                "-...-",
                ".-.-.",
                "-..-.",
                ".--.-."
            ],
            charsArray = [
                "A",
                "B",
                "C",
                "D",
                "E",
                "F",
                "G",
                "H",
                "I",
                "J",
                "K",
                "L",
                "M",
                "N",
                "O",
                "P",
                "Q",
                "R",
                "S",
                "T",
                "U",
                "V",
                "W",
                "X",
                "Y",
                "Z",
                "0",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "À",
                "Ä",
                "È",
                "É",
                "Ö",
                "Ü",
                "ß",
                "CH",
                "Ñ",
                ".",
                ",",
                ":",
                ";",
                "?",
                "-",
                "_",
                "(",
                ")",
                "'",
                "=",
                "+",
                "/",
                "@"
            ];

/////////////////////

        var morseService = {
            getMorseCharacters : getMorseCharacters,
            getMorseTimeRanges : getMorseTimeRanges,
            //mapper
            mapCharArrayToSymbol : mapCharArrayToSymbol,
            mapSymbolToChar : mapSymbolToChar,
            mapCalcDiff : mapCalcDiff,
            mapMsToMorseChar : mapMsToMorseChar,
            //filter
            filterByTimeLongBreak : filterByTimeLongBreak,
            filterByCharLongBreak : filterByCharLongBreak,
            filterByCharNotShortBreak : filterByCharNotShortBreak,
            filterByTimeNotShortBreak : filterByTimeNotShortBreak,
            filterExistingMorseSymbol : filterExistingMorseSymbol

        };

        return morseService;


        /////////////////////////////////


        function getMorseCharacters() {
            return morseCharacters;
        };

        function getMorseTimeRanges() {
            return morseTimeRanges;
        };

        //mapper
        //__________________________________________________________

        function mapSymbolToChar(symbol){
            var vs =  morseTranslationArray.filter(function(obj){ return obj.symbol == symbol}).pop();

            return (vs.char);
        };

        function mapCharArrayToSymbol(ca){
            ca.splice(-1, 1);
            return ca.join('');
        }

        function mapCalcDiff(arr) {
            return arr[1]-arr[0];
        };

        function mapMsToMorseChar(ms){
            var char = '';

            if(ms > 0)
                char = (ms < morseTimeRanges.long)?morseCharacters.short:morseCharacters.long;
            else
                char = (ms > morseTimeRanges.shortBreak)?morseCharacters.shortBreak:morseCharacters.longBreak;

            return char;
        };

        //filter (return boolean)
        //__________________________________________________________

        function filterExistingMorseSymbol(symbol){
            return morseSymbolsArray.filter(function(str){ return str == symbol}).length == 1;
        };

        function filterByTimeNotShortBreak(timeDiff) {
            return timeDiff > 0 || timeDiff > morseTimeRanges.longBreak;
        };

        function filterByTimeLongBreak(timeDiff) {
            return timeDiff <= morseTimeRanges.longBreak;
        };

        function filterByCharNotShortBreak(char) {
            return char !== morseCharacters.shortBreak;
        };

        function filterByCharLongBreak(char) {
            return char == morseCharacters.longBreak;
        };


    };

})();
