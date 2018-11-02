var imgs =document.querySelectorAll('.imagen');

imgs.forEach(function (elem) {
    elem.addEventListener('click', function () {
        window.location.href = `/descripcion/?producto=${elem.getAttribute('data-titulo')}`
    });
});