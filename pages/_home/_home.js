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

var fecharModal;

$('#modal-bottom').swipe( {
    //Generic swipe handler for all directions
    swipe:function(event, direction, distance, duration, fingers, fingerData, currentDirection) {

      if (direction == 'up') {
        $('#modal-bottom').transition({y: '-300px'}, 600, 'ease');
        fecharModal = false;
      } else if (direction == 'down') {
        if (!fecharModal) {
          $('#modal-bottom').transition({y: '-60px'}, 600, 'ease');
          fecharModal = true;
        } else {
          $('#modal-bottom').transition({y: '70px'}, 600, 'ease');
          fecharModal = false;
        }

      }

    },
    threshold:50,
    fingers:'all'
  });

  function abrirModalBottom(marcador) {

    if (marcador == 'user') {
      $('#modal-bottom').transition({y: '-60px'}, 300, 'ease');
      fecharModal = true;
    }
    console.log(marcador)
  }
