window.addEventListener('load',function(){

    



    var imgs =document.querySelectorAll('.imagen');

imgs.forEach(function (elem) {
    elem.addEventListener('click', function () {
        window.location.href = `/descripcion/?producto=${elem.getAttribute('data-titulo')}`
    });
});


var productosCarrito = JSON.parse(localStorage.getItem('carrito'));
    if(productosCarrito == null){
        productosCarrito = [];
    }
    
    function renderCarrito(){
        let total = 0;
        productosCarrito.forEach(function(elem){
            total += parseInt(elem.price);
        });
        document.querySelector('.carrito').innerText = 'Total: $' + total + ' - ' + productosCarrito.length;
    }

    renderCarrito();


    document.querySelectorAll('.products__list__container__info__boton').forEach(function(elem){
        elem.addEventListener('click', function(event){
            event.preventDefault();
            let parent = elem.parentElement.parentElement;
            
            let obj = {
                titulo: parent.querySelector('products__list__container__info__titulo').innerText,
                img: parent.querySelector('imagen').getAttribute('src'),
                precio: elem.getAttribute('products__list__container__info__precio').getAttribute('data-price'),
            };

            productosCarrito.push(obj);
            
            localStorage.setItem('carrito', JSON.stringify(productosCarrito));

            renderCarrito();


            let variables = new URLSearchParams();
            variables.append('titulo', obj.titulo);

            fetch('/api/Carrito', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: variables.toString(),
                })
                .then(function(respuesta) {
                    return respuesta.text();
                })
                .catch(function(error){
                    console.error(error);
                })
                .then(function(mensaje){
                    console.log(mensaje);
                });
        });
    });


});


