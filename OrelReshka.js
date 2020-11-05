const fs = require('fs');
const minimist =require('minimist');
const readline = require('readline');
let result;
let rand = Math.round(1 - 0.5 + Math.random() * (2 - 1 + 1)); // Переменная для случайного выбора 1 или 2
let argv = require('minimist')(process.argv.slice(2)); // Получаем ввод параметров при запуске приложения
let path = argv._.join();//Преобразуем ввод параметров при запуске приложения в имя файла
let rl = readline.createInterface({
    input: process.stdin, // ввод из стандартного потока
    output: process.stdout // вывод в стандартный поток
});
rl.question('Введите цифру 1, если выпадет Орел, и цифру 2 если выпадет решка?  ', function(answer) {
    answer = Number.parseInt(answer); // Преобразуем ответ пользователя в число
    if (rand === answer){
        result = 'Победа';
        console.log('Монетка ' + rand);
        console.log('Ваш вариант ' + answer);
    }
    else {
        result ='Поражение';
        console.log('Монетка ' + rand);
        console.log('Ваш вариант ' + answer);
    }
    fs.access(path, function(error) //Проверяем наличие файла указанного пользователем
    {
        if (error) {
            fs.writeFileSync(path, result + '\n'); //Создаём файл логирования
        } else {
            fs.appendFileSync(path,'\n' + result); //Дописываем результат игры в файл логирования
        }
    });
    console.log(result);
    rl.close();

});