$(document).ready(function() {

  // 1-е задание

  // загрузка данных при выборе 2-ой опции в первом поле
  $('#exampleFormControlSelect1').on('change', function() {
    if ($(this).val() === '2') {
      // имитируем загрузку с сервера... и заполняем 2-е поле опциями, пришедшими с сервера
      let data = ['1string', '2string', 'morestring...'];
      $.each(data, function(index, value) {
        $('<option>'+value+'</option>').appendTo('#exampleFormControlSelect2');
      });
      $('#exampleFormControlSelect2').css('display', 'block');
    } else {
      // удаляем все элементы и скрываем
      $('#exampleFormControlSelect2').empty().css('display', 'none');
    }
     
  });

  // нажатие на кнопку submit
  $("#testForm").on('submit', function(e) {
    e.preventDefault();
    // проверка на заполненное поле(в нашем случае это лишь поле 2)
    if ($('#exampleFormControlSelect2').val()) {
      // отправка данных методом POST
      let select2 = $('#exampleFormControlSelect2').val();
      $.ajax({
        type: "POST",
        url: "mail.php",
        data: {"event":{"select2": select2}},
        success: function(response) {
          // в случае успешного ответа делаем кнопку снова активной
          $('#button').attr('disabled', false);
        },
        error: function(error){
          console.log("Something went wrong", error);
          // в случае неуспешного ответа так же делаем кнопку снова активной
          // при этом можно указать клиенту об этом, дописав нужный функционал...
          $('#button').attr('disabled', false);
        }
      });
      // пока идет ассинхронный запрос делаем кнопку не активной
      $('#button').attr('disabled', true);
    };
	});


  /* ответ на 2-е задание 

  Работаем с "компонентом" (элемент li) у которого нет класса current и нет класса left,
  который находиться в списке ul с классом tabs который находится в элементе с классом section. 
  при клике на такой "компонент" li, срабатывает ф-я, которая проверяет: если у данного li атрибут
  'data-href' не равен undefined, то устанавливает в адресной строке браузера значение его атрибута
  и переходит на этот адрес.

  иначе (если атрибута нет): создаем переменную в которую записываем элемент li на котором сработала 
  ф-я при клике. И создаем переменную куда записываем индекс(порядковый номер ноды) этого li.

  далее добавляем класс(current) к нашему li, а у соседних элементов li удаляем класс current, далее 
  у родителя с классом section находим все вложенные div с классом box, далее из них тот div с классом 
  box который соответствует позиции в dom дереве которая равна той переменной которую объявляли 
  выше(в ней записан номер позиции нашего li на которое изначально сработало событие click) и далее это div 
  появляться в течении 150 мс а после срабатывает ф-я, которая: создает переменную в которой лежит ф-я 
  с аргументами(наших 2-х переменных) в виде строки, затем пытаемся запустить данную функцию которая 
  представлена как строка, перехватываем ошибки(если будут), после чего скрываем все соседские элементы div.box */


  // 3-е задание

  // появление попапа при клике на кнопку Add Companies filter
  $(".filter__btn").on('click', function() {
    $(".popup-filter").fadeIn( {
      duration: 800,
      start: function() {
        $(this).css('display', 'flex')
      }
    });
  })
  // закрытие попапа при клике на крестик
  $(".popup-filter__cross").on('click', function() {
    // $(".popup-filter").css('display', 'none');
    $(".popup-filter").fadeOut(500, function() {
        $(this).css('display', 'none')
    });
  })

  // добавляем в правую колонку элементы которые соответствуют активному элементу в левом блоке
  let firstLiLoad = $.trim($(".popup-filter__subjects li.active").text());
  $(".popup-filter__items .popup-filter__list[data-atr='"+firstLiLoad+"']").css('display', 'block');

  // проходимся циклом и навешиваем событие клие для всех элементов в левом списке
  $.each($(".popup-filter__subjects li"), function(index, value) {
    $(value).on('click', function() {
      // при клике по любому элементу из левого списка, сначала скрываем все поля в правом списке
      $(".popup-filter__items .popup-filter__list").css('display', 'none');
      // затем удаляем у всех элементов левого меню класс который отвечает за его подсветку
      $(".popup-filter__subjects li").removeClass('active');
      // добавляем класс с подсветкой именно на тот элемент на который кликнули
      $(this).addClass('active');
      // справа появляться тот список который соответствует элементу на который кликнули через атрибут
      $(".popup-filter__items .popup-filter__list[data-atr='"+$.trim($(this).text())+"']").css('display', 'block');
    })
  })

  // закрыть попап при клике на любой элемент в правом блоке
  $.each($(".popup-filter__items li"), function(index, value) {
    $(value).on('click', function() {
      $(".popup-filter").fadeOut(500, function() {
        $(this).css('display', 'none')
      });
    })
  })

  // переключение класса на стрелках фильтра
  $.each($(".popup-filter__btn"), function(index, value) {
    $(value).on('click', function() {
      $(".popup-filter__btn").removeClass('disabled')
      $(this).addClass('disabled')
    })
  });


});



