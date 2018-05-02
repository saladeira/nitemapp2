$('.sair').on('click', function () {
  localStorage.clear();
  loadView('nm-header', '', 'none')
  loadView('nm-content', 'index_valida-logado', 'none');
})

$('#userid').val(localStorage.getItem('id'));

$('.check-holder').on('click', function () {
  if($(this).hasClass('checado')) {
    $('.bt-aceito').prop('disabled', true);
    $(this).removeClass('checado').find('.checkbox').prop('checked', false);
  } else {
    $('.bt-aceito').prop('disabled', false);
    $(this).addClass('checado').find('.checkbox').prop('checked', true);
  }
});

$('.bt-aceito').on('click', function (e) {
  var dataTermos = $('#formulario-termos').serialize();

  termosAceito($(this), dataTermos, function () {
    localStorage.setItem('first', false)
    loadView('nm-content', '_home', 'none');
  })
})
