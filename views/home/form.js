
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

    });


    $('#formPersona').submit(function (e) {
        e.preventDefault();

        var data = {
            nombre: $('#name').val(),
            apellido: $('#apellido').val(),
            direccion: $('#direccion').val(),
        }


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
        console.log(data);
    }


    function limpiarFormulario() {
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



