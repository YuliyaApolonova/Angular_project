 /**
 * Created by jull on 09.04.2017.
 */
 function isVisible(elem) {

    var coords = elem.getBoundingClientRect();

    var windowHeight = document.documentElement.clientHeight;

    // верхняя граница elem в пределах видимости ИЛИ нижняя граница видима
    var topVisible = coords.top > 0 && coords.top < windowHeight;
    var bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

    return topVisible || bottomVisible;
 }

var numbers = document.getElementById('numbers-container');
document.addEventListener('scroll', numbersHandler);
//f каждый раз с разным параметром
 var animation2 = document.getElementById("animation2");
 var animation1 = document.getElementById('animation1');
 var animation3 = document.getElementById('animation3');
 var animation4 = document.getElementById('animation4');

function numbersHandler(){
   if(isVisible(numbers)) {
      var interval2 = setInterval(f, 150);
      var i = 0;
      var j = 0;
      var k = 0;
      var l = 0;

      function f() {
         animation2.innerHTML = i;
         i = i + 160;

         animation1.innerHTML = j;
         j = j + 80;

         animation3.innerHTML = k;
         k = k + 2;

         animation4.innerHTML = l;
         l = l + 100;
         if (i >= 3360) {
            clearInterval(interval2);
            document.removeEventListener('scroll', numbersHandler);
         }
      }
   }
}

//один интервал, но разные шаги
