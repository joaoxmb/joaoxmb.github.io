const download = {
  fechar: () => {
    $('#aba-download').css({'top': '100%'});
    $('#aba-inicio').css({transform: 'translate(-50%, -0%) scale(1)',filter: 'brightness(1)', padding: '0', overflow: 'unset'});
    $('body').css({background: ''});

    setTimeout(function() {
      $('#aba-download').css('display', 'none');
    }, 200);
  },

  compartilhar: async () => {
    const base64url = $('.image-minuta').attr('src')
    const blob = await (await fetch(base64url)).blob();
    const file = new File([blob], 'fileName.png', { type: blob.type });
    navigator.share({
      files: [file],
    });
  }
};
