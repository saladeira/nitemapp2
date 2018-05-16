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
      modalAnimate('full', direction);
    } else if (direction == 'down') {
      if ($('#modal-content').hasClass('tease')) {
        modalAnimate('close', direction);
      } else if ($('#modal-content').hasClass('stop')){
        modalAnimate('close', direction);
      } else if ($('#modal-content').hasClass('full')) {
        modalAnimate('tease', direction);
      }
    }

  },
  threshold:50,
  fingers:'all'
});

$('.auxiliar').on('click', function () {
  let clicado = $(this).attr('data-target');
  console.log(clicado);

  $('.auxiliar').each(function () {
    $(this).find('p').removeClass('aux-ativo')
  })

  $(this).find('p').addClass('aux-ativo')

  $('.'+clicado).css({display: 'block'});

  modalAnimate('tease','up');

  if (clicado == 'add-local') {
    $('#novoEnd').val($('.local-endereco').html());
    $('#novoLat').val(meuMarcadorClicado.position.lat());
    $('#novoLng').val(meuMarcadorClicado.position.lng());
    $('#userID').val(localStorage.getItem('id'));
    console.log(meuMarcadorClicado.position.lat())
  }

  if (clicado == 'add-registro') {
    registrarLocal($('.form').serialize())
  }

  //
})
