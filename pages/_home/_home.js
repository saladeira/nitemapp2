$(function () {
  console.log('aqui')
  $('#modal-upper').removeClass('closed').addClass('opened')
})

$('.sair').on('click', function () {
  localStorage.clear();
  loadView('nm-header', '', 'none')
  loadView('nm-content', 'index_valida-logado', 'none');
});

//Arrumando display com teclado
$('#gmap').css({
  height: $(window).height()
})
//
$('#_home').css({
  height: $(window).height()
});


//Estudar melhor e usar um drag swipe
$('#modal-bottom').swipe( {
    //Generic swipe handler for all directions
    swipe:function(event, direction, distance, duration, fingers, fingerData, currentDirection) {
      var estado;
      if (direction == 'up') {
        modalFull();
      } else if (direction == 'down') {
        modalTease();
      }

    },
    threshold:50,
    fingers:'all'
  });
