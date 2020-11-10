<!DOCTYPE html>
<html lang="en">
    <head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script>
    window.addEventListener("DOMContentLoaded", function() {
        var btn = document.querySelector("#btn"),
            txt = document.querySelector("#en"),
            ru = document.querySelector("#ru") ;
        btn.addEventListener("click", function() {
            var request = new XMLHttpRequest();
            var text = encodeURIComponent(txt.value);
            var key = "t1.9f7L7euelZrKkomRx4-Ox4vPi8bKnpmMj-Xz9xocXAL673coOkv-3fP3WkpZAvrvdyg6S_4.61-WTrj7gpLU7Vf02QpBzI68g3Z1j1Eo10xCsGUl4JNpSvbeyR7nvFOzDCje3C4lRnpRSmRR2dFtiFKVnm4uAQ";
            var url = "https://translate.yandex.net/api/v1.5/tr.json/translate?key="+key+"&text="+text+"&lang=en-ru&format=plain&options=1"
            request.open('GET', url, true);
            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                    var data = JSON.parse(request.responseText);
                    ru.value = data.text;
                }
            };
            request.send();
        });
    });
</script>
</head>
<body>
<textarea id="en" name="">word</textarea>
    <input id="btn" name="" type="button" value="translate">
    <textarea id="ru" name=""></textarea>


    </body>
    </html>