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

    if (direction == 'up') {
      modalAnimate($('#modal-content').attr('class'), direction);
    } else if (direction == 'down') {
      modalAnimate($('#modal-content').attr('class'), direction);
    }

  },
  threshold:50,
  fingers:'all'
});

$('select').on('focus', function () {
  $(this).removeClass('alert')
});

$('input').on('focus', function () {
  $(this).removeClass('alert')
})

$('.auxiliar').on('click', function (e) {
  let clicado = $(this).attr('data-target');
  console.log(clicado);

    //$('.'+clicado).addClass('max-height');

  modalAnimate('reload','', function () {
    $('.'+clicado).addClass('max-height');
  });


  $('.retorno').each(function () {
    $(this).find('p').removeClass('aux-ativo');
    $('[data-target=' + clicado +'].retorno').find('p').addClass('aux-ativo');
  });


  if (clicado == 'add-local') {
    $('#novoEnd').val($('.local-endereco').html());
    $('#novoLat').val(meuMarcadorClicado.position.lat());
    $('#novoLng').val(meuMarcadorClicado.position.lng());
    $('#userID').val(localStorage.getItem('id'));
  }

  if (clicado == 'add-registro') {

    $('.first').children().children().each(function () {
      if ($(this).val() == '') {
        $(this).addClass('alert')
      }
    });

    if ($('#novoNome').val() != '' )

    if ($('#novoNome').val() == '') {
      $('#novoNome').addClass('alert');
    } else if ($('#novoTipo').val() == '') {
      $('#novoTipo').parent().addClass('alert');
    } else {
      console.log($('.first').serialize());
      modalTrasit();
      //registrarLocal($('.form').serialize());
    }
  }

  //
})
