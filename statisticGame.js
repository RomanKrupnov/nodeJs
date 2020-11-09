const fs = require('fs');
const minimist =require('minimist');
const readline = require('readline');
let argv = require('minimist')(process.argv.slice(2)); // Получаем ввод параметров при запуске приложения
let path = argv._.join();//Преобразуем ввод параметров при запуске приложения в имя файла
let maxWin=0; //Переменная максимальных побед подряд
let maxLoss=0; //Переменная максимальных проигрышей подряд
let win = 0; //Счётчик побед
let loss = 0 ; //Счётчик поражений
let scoreWin = 0; //Счетчик предварительных побед
let scoreLoss = 0; //Счётчик предварительных поражений
fs.access(path, function(error) //Проверяем наличие файла указанного пользователем
{
    if (error) {
        console.log('Ошибка чтения файла ' + error); //Ошибка чтения файла
    } else {
        let fileContent = fs.readFileSync(path, "utf8");
        let arr = fileContent.split('\n');
        let allGames = arr.length;
        for(let i=0;i<arr.length;i++){
            if(arr[i] === 'Победа'){
                if(maxLoss < scoreLoss){
                    maxLoss = scoreLoss;
                }
                scoreLoss=0;
                scoreWin++;
                win++;
            } else {
            if(maxWin < scoreWin){
                maxWin = scoreWin;
            }
                scoreWin=0;
                scoreLoss++;
                loss++;
            }
        }
        console.log('Всего партий сыграно ' + allGames);
        console.log('Проиграно ' + loss);
        console.log('Выиграно ' + win);
        console.log('Подряд выиграно' + maxWin);
        console.log('Подряд проигрышей' + maxLoss);
    }
});