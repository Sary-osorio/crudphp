
$(document).ready(function () {


    function cargarTabla() {
        $.ajax({
            url: "/crudphp/controllers/HomeController.php",
            method: "GET",
            dataType: "json",
            success: function (response) {

                dropTable();

                new DataTable("#table", {
                    data: response,
                    columns: [
                        { data: "id" },
                        { data: "nombre" },
                        { data: "apellido" },
                        { data: "direccion" },
                        {
                            data: null,
                            render: function (data, type, row) {
                                return `
                                    <button class="btn btn-primary btn-sm actualizar-btn" data-data='${JSON.stringify(data)}')">Editar</button>
                                    <button class="btn btn-danger btn-sm eliminar-btn" data-id="${data.id}">Eliminar</button>`;
                            }

                        }
                    ]

                });


            }
        });
    }

    $('#table').on('click', '.eliminar-btn', function () {
        var id = $(this).data('id');
        eliminarPersona(id);
    });

    $('#table').on('click', '.actualizar-btn', function () {
        var data = $(this).data('data');
        editarPersona(data);
    });


    $('#formPersona').submit(function (e) {
        e.preventDefault();

        var data = {
            nombre: $('#name').val(),
            apellido: $('#apellido').val(),
            direccion: $('#direccion').val(),
        }

        id = $('#id').val();

        if (id != '') {


            console.log(id);
            $.ajax({
                url: `/crudphp/controllers/HomeController.php/${id}`,
                method: "PATCH",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(data),
                success: function (response) {
                    cargarTabla();
                },
                error: function (xhr, status, error) {
                    console.error("Error en la solicitud PUT:", status, error);
                }
            });

        } else {

            $.ajax({
                url: "/crudphp/controllers/HomeController.php",
                method: "POST",
                dataType: "json",
                data: data,
                success: function (response) {
                    cargarTabla();
                },
                error: function (xhr, status, error) {
                    console.error("Error en la solicitud POST:", status, error);
                }
            });
        }
        limpiarFormulario();

    });


    function eliminarPersona(id) {
        console.log(id);
        $.ajax({
            url: `/crudphp/controllers/HomeController.php/${id}`,
            method: "DELETE",
            dataType: "json",

            success: function (response) {
                cargarTabla();
            }
        });
    }

    function editarPersona(data) {
        $('#id').val(data.id);
        $('#name').val(data.nombre);
        $('#apellido').val(data.apellido);
        $('#direccion').val(data.direccion);
        $('#btnsubmit').text('Editar');
    }


    function limpiarFormulario() {
        $('#btnsubmit').text('Submit');
        $('#id').val('');
        $('#name').val('');
        $('#apellido').val('');
        $('#direccion').val('');
    }



    function dropTable() {
        if ($.fn.DataTable.isDataTable("#table")) {
            $("#table").DataTable().destroy();
            $("#table tbody").empty();
        }
    }

    cargarTabla();

});



