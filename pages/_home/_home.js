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
    modalAnimate2(direction, meuMarcadorClicado.marcador)
  },
  threshold:50,
  fingers:'all'
});

$('select').on('focus', function () {
  $(this).removeClass('alert')
});

$('input').on('focus', function () {
  $(this).removeClass('alert')
});

$('.auxiliar').on('click', function () {

  $('.retorno').each(function () {
    $(this).find('p').removeClass('aux-ativo');
  });

  openFormAuxiliar($(this).attr('data-target'));
});

function openFormAuxiliar(clicado) {
  modalAnimate('reload','');
  $('.'+clicado).find('.modal-form').addClass('aberto');

  modalAnimate('reload','');
  console.log($('.'+clicado).find('.modal-form').outerHeight());
}

// $('.auxiliar').on('click', function (e) {
//   let clicado = $(this).attr('data-target');
//   console.log(clicado);
//
//   $('.retorno').each(function () {
//     $(this).find('p').removeClass('aux-ativo');
//     $('[data-target=' + clicado +'].retorno').find('p').addClass('aux-ativo');
//   });
//
//
//   if (clicado == 'add-local') {
//     if ($('.'+clicado).hasClass('hide')) {
//       console.log('fechado');
//       $('.'+clicado).removeClass('hide').find('form').addClass('aberto');
//     } else {
//       $('.'+clicado).addClass('hide').find('form').removeClass('aberto');
//     }
//     $('#novoEnd').val($('.local-endereco').html());
//     $('#novoLat').val(meuMarcadorClicado.position.lat());
//     $('#novoLng').val(meuMarcadorClicado.position.lng());
//     $('#userID').val(localStorage.getItem('id'));
//
//     modalAnimate('reload','', function () {
//       if ($('.modal-image').is(':offscreen')) {
//         console.log('saiu')
//       }
//     });
//   }
//
//   if (clicado == 'add-registro') {
//
//     $('.first').children().children().each(function () {
//       if ($(this).val() == '') {
//         $(this).addClass('alert')
//       }
//     });
//
//     if ($('#novoNome').val() != '' )
//
//     if ($('#novoNome').val() == '') {
//       $('#novoNome').addClass('alert');
//     } else if ($('#novoTipo').val() == '') {
//       $('#novoTipo').parent().addClass('alert');
//     } else {
//       console.log($('.first').serialize());
//       modalTrasit();
//       //registrarLocal($('.form').serialize());
//     }
//   }
//
//   //
// })
