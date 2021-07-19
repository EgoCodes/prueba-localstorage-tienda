const carrito = {}
let arrPdt = JSON.parse(localStorage.getItem('carrito'))

carrito.agregar = (req)=>{
    let repetido = 0
    for(let i = 0; i < arrPdt.length; i++){
        if(arrPdt[i]['id'] === req['id']){
            arrPdt[i]['cantidad'] = arrPdt[i]['cantidad'] + 1;
            repetido++;
            if(repetido > 1){
                arrPdt.splice(i, 1);
            }
        }
    }if(repetido === 0){
        arrPdt.push(req)
    }
    localStorage.setItem('carrito', JSON.stringify(arrPdt))
    cargar()
}
carrito.eliminar = (id) =>{
    for(let i = 0; i < arrPdt.length; i++){
        if(arrPdt[i]['id'] === id){
            arrPdt.splice(i, 1);
        }
    }
    localStorage.setItem('carrito', JSON.stringify(arrPdt))
    carrito.actualizar();
}
carrito.editar = (id, op)=>{
    switch (op) {
        case 'mas':
            for(let i = 0; i < arrPdt.length; i++){
                if(arrPdt[i]['id'] === id){
                    arrPdt[i]['cantidad'] = arrPdt[i]['cantidad'] + 1;
                }
            }
            break;
        case 'menos':
            for(let i = 0; i < arrPdt.length; i++){
                if(arrPdt[i]['id'] === id && arrPdt[i]['cantidad'] > 1){
                    arrPdt[i]['cantidad'] = arrPdt[i]['cantidad'] - 1;
                }
            }
            break;
    }
    localStorage.setItem('carrito', JSON.stringify(arrPdt))
    carrito.actualizar();
}
carrito.limpiar = () => {
    localStorage.clear()
    carrito.actualizar();
}
carrito.actualizar = () => {
    cargar()
}
$.ajax({
    type: "GET",
    url: 'public/php/productos.php',
    success: function (response) {
        let data = JSON.parse(response)
        $('#productos').empty();
        for (i = 0; i < data.length; i++) {
            $('#productos').append(`<div class="tarjeta col-lg-4 col-md-6 col-sm-6">
            <section class="card">
                <img src="public/img/${data[i]['img']}" alt="${data[i]['nombre']}" title="${data[i]['nombre']}">
                <h2 class="tituloProducto">${data[i]['nombre']}</h2>
                <p class="descripcionProducto">${data[i]['descripcion']}</p>
                <div class="row">
                    <section class="col-6"><p class="descripcionProducto">cantidad: ${data[i]['cantidad']}</p></section>
                    <section class="col-6"><p class="descripcionProducto">Precio: ${data[i]['precio']}</p></section>
                </div>
                <button class="btn btn-primary btn-block botonAgregar" data-id="${data[i]['id']}">Agregar al carrito</button>
            </section>
            </div>`);
        }
    }
});
$(document).ready(function () {
    $('#formularios').empty();
    $('#formularios').append(`
    <div class="col-md-6">
        <label for="nombre" class="form-label">Nombre</label>
        <input type="text" class="form-control" id="nombre" placeholder="Pepito Perez" required>
    </div>
    <div class="col-md-6">
        <label for="cedula" class="form-label">Cedula</label>
        <input type="number" class="form-control" id="cedula" placeholder="123456" required>
    </div>
    <div class="col-12">
        <label for="direccion" class="form-label">Direccion</label>
        <input type="text" class="form-control" id="direccion" placeholder="Calle 5ta" required>
    </div>
    <div class="col-12">
        <button class="btn btn-link" id="heComprado">He comptrado antes</button>
    </div>
    <input type="hidden" value="N" id="checador">
    `);
    cargar()
});
$(document).on('click', '.botonAgregar', (e)=> {
    e.preventDefault();
    let id = $(e.currentTarget).data('id');
    $.ajax({
        type: "POST",
        url: 'public/php/producto.php',
        data: {id},
        success: function (response) {
            let datos = JSON.parse(response);
            switch (datos['std']) {
                case 200:
                    carrito.agregar(datos['producto']);
                    alert(datos['msj'])
                    break;
                case 403:
                    alert(datos['msj'])
                    break;
                default:
                    alert(datos['msj'])
                    break;
            }
            
        }
    });
})
$(document).on('click', '#opcion', (e)=> {
    e.preventDefault();
    let op = $(e.currentTarget).data('op');
    let id = $(e.currentTarget).data('id');
    carrito.editar(id, op)
})
$(document).on('click', '#eliminarProducto', (e)=> {
    e.preventDefault();
    let id = $(e.currentTarget).data('id');
    carrito.eliminar(id)
})
$(document).on('click', '#limpieza', (e)=> {
    e.preventDefault();
    carrito.limpiar()
})
$(document).on('keyup', '#cedula', (e)=> {
    let ced = $.trim($('#cedula').val())
    op = 'busUsu'
    $.ajax({
        type: "POST",
        url: 'public/php/compra.php',
        data: {op, ced},
        success: function(res){
            if(res.length > 0){
                $('#cedula').addClass('is-invalid');
            }else{
                $('#cedula').removeClass('is-invalid');
            }
        }
    });
});
$(document).on('keyup', '#cedulaH', (e)=> {
    let ced = $.trim($('#cedulaH').val())
    op = 'busUsu'
    $.ajax({
        type: "POST",
        url: 'public/php/compra.php',
        data: {op, ced},
        success: function(res){
            if(res.length > 0){
                $('#cedulaH').addClass('is-valid');
            }else{
                $('#cedulaH').removeClass('is-valid');
            }
        }
    });
});
$(document).on('submit', '#pagar', (e)=> {
    e.preventDefault();
    let cargandoCarrito = JSON.parse(localStorage.getItem('carrito'));
    let check = $.trim($('#checador').val())
    if (check === 'N') {
        let nom = $.trim($('#nombre').val())
        let ced = $.trim($('#cedula').val())
        let dir = $.trim($('#direccion').val())
        let classes = $('#cedula').attr('class').split(' ');
        classes = classes[classes.length-1]
        if(cargandoCarrito.length > 0 && classes !== 'is-invalid'){
            if (ced > 0 && nom.length > 0 && dir.length > 0) {
                let op = 'desc'
                for (let i = 0; i < cargandoCarrito.length; i++) {
                    let cnt = cargandoCarrito[i]['cantidad'];
                    let id = cargandoCarrito[i]['id'];
                    $.ajax({
                        type: "POST",
                        url: 'public/php/compra.php',
                        data: {op, cnt, id}
                    });
                }
                op = 'regUsu'
                $.ajax({
                    type: "POST",
                    url: 'public/php/compra.php',
                    data: {op, nom, ced, dir}
                });
                op = 'busUsu'
                let per = ''
                $.ajax({
                    type: "POST",
                    url: 'public/php/compra.php',
                    data: {op, ced},
                    success: function(res){
                        per = res
                        op = 'regCom'
                        for (let i = 0; i < cargandoCarrito.length; i++) {
                            let cnt = cargandoCarrito[i]['cantidad'];
                            let pdt = cargandoCarrito[i]['id'];
                            let pag = cargandoCarrito[i]['precio']*cnt;
                            $.ajax({
                                type: "POST",
                                url: 'public/php/compra.php',
                                data: {op, per, cnt, pag, pdt},
                                success: function(){
                                    location.href = '../camilo/index.php';
                                }
                            });
                        }
                        carrito.limpiar()
                    }
                });
            }
        }else if(cargandoCarrito.length === 0){
            alert('No tienes nada en el carrito')
        }else if(classes === 'is-invalid'){
            alert('Ya se encuentra un usuario registrado con esa cedula')
        }if (ced < 0) {
            $('#cedula').val(0);
        }
    } else {
        let cedH = $.trim($('#cedulaH').val())
        let classes = $('#cedulaH').attr('class').split(' ');
        classes = classes[classes.length-1]
        if(cargandoCarrito.length > 0 && classes === 'is-valid'){
            if (cedH > 0) {
                let op = 'desc'
                for (let i = 0; i < cargandoCarrito.length; i++) {
                    let cnt = cargandoCarrito[i]['cantidad'];
                    let id = cargandoCarrito[i]['id'];
                    $.ajax({
                        type: "POST",
                        url: 'public/php/compra.php',
                        data: {op, cnt, id}
                    });
                }
                op = 'busUsuH'
                let per = ''
                $.ajax({
                    type: "POST",
                    url: 'public/php/compra.php',
                    data: {op, cedH},
                    success: function(res){
                        per = res
                        op = 'regCom'
                        for (let i = 0; i < cargandoCarrito.length; i++) {
                            let cnt = cargandoCarrito[i]['cantidad'];
                            let pdt = cargandoCarrito[i]['id'];
                            let pag = cargandoCarrito[i]['precio']*cnt;
                            $.ajax({
                                type: "POST",
                                url: 'public/php/compra.php',
                                data: {op, per, cnt, pag, pdt},
                                success: function(){
                                    location.href = '../camilo/index.php';
                                }
                            });
                        }
                        carrito.limpiar()
                    }
                });
            }
        }else if(cargandoCarrito.length === 0){
            alert('No tienes nada en el carrito')
        }else if(classes !== 'is-valid'){
            alert('No se encuentra un usuario registrado con esa cedula')
        }if (cedH < 0) {
            $('#cedulaH').val(0);
        }
    }
    

})
$(document).on('click', '#heComprado', (e)=> {
    $('#formularios').empty();
    $('#formularios').append(`
    <div class="col-md-12">
        <label for="cedula" class="form-label">Cedula</label>
        <input type="number" class="form-control" id="cedulaH" placeholder="123456" required>
    </div>
    <div class="col-12">
        <button class="btn btn-link" id="noHeComprado">Soy nuevo en esta página</button>
    </div>
    <input type="hidden" value="S" id="checador">
    `);
});
$(document).on('click', '#noHeComprado', (e)=> {
    $('#formularios').empty();
    $('#formularios').append(`
    <div class="col-md-6">
        <label for="nombre" class="form-label">Nombre</label>
        <input type="text" class="form-control" id="nombre" placeholder="Pepito Perez" required>
    </div>
    <div class="col-md-6">
        <label for="cedula" class="form-label">Cedula</label>
        <input type="number" class="form-control" id="cedula" placeholder="123456" required>
    </div>
    <div class="col-12">
        <label for="direccion" class="form-label">Direccion</label>
        <input type="text" class="form-control" id="direccion" placeholder="Calle 5ta" required>
    </div>
    <div class="col-12">
        <button class="btn btn-link" id="heComprado">He comptrado antes</button>
    </div>
    <input type="hidden" value="N" id="checador">
    `);
});
function cargar(){
    if (!localStorage.getItem('carrito')) {
        localStorage.setItem('carrito', '[]')
    }
    let cargandoCarrito = JSON.parse(localStorage.getItem('carrito'));
    $('#compras').empty();
    if(cargandoCarrito.length > 0){
        for (i = 0; i < cargandoCarrito.length; i++) {
            $('#compras').append(`<tr>
            <th scope="row">${i+1}</th>
            <td><p>${cargandoCarrito[i]['nombre']}</p></td>
            <td><section class="scCarrito">
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-primary scCarrito__cant" id="opcion" data-op="menos" data-id="${cargandoCarrito[i]['id']}">-</button>
                    <p class="scCarrito__cant" id="cantidades">${cargandoCarrito[i]['cantidad']}</p>
                    <button type="button" class="btn btn-primary scCarrito__cant" id="opcion" data-op="mas" data-id="${cargandoCarrito[i]['id']}">+</button>
                </div>
                <button class="scCarrito__btnElimiar" data-id="${cargandoCarrito[i]['id']}" id="eliminarProducto">Eliminar</button>
            </section></td>
            <td><p>$${cargandoCarrito[i]['precio'] * cargandoCarrito[i]['cantidad']}</p></td>
            </tr>`);
        }
    }else{
        $('#compras').append('<tr><td colspan="4" class=""><p class="advertencias">No se encuentra ningún articulo en el carrito</p></td></tr>');
    }
}