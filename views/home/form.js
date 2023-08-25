

$(function () {

    $.ajax({
        url: "/crudphp/controllers/HomeController.php/?type=dpto",
        method: "GET",
        dataType: "json",
        success: function (response) {
            var select = $('#dpto');
            $.each(response, function (index, option) {
                select.append($('<option>', {
                    value: option.ID,
                    text: option.DepName
                }));
            });
        }
    });

    $('#dpto').on('change', function () {
        var dpto = $(this).val();
        cargarMunicipios(dpto);

    });

    function cargarMunicipios(dpto, muni = "") {
        console.log(muni);
        $.ajax({
            url: `/crudphp/controllers/HomeController.php/?id=${dpto}&type=muni`,
            method: "GET",
            dataType: "json",
            success: function (response) {
                console.log(response);
                var select = $('#idmuni');
                select.empty();
                $.each(response, function (index, option) {
                    select.append($('<option>', {
                        value: option.ID,
                        text: option.MunName
                    }));
                });
                if (muni != "") {
                    $('#dpto').val(dpto);
                    $('#idmuni').val(muni);
                }
            }
        });
    }


    function cargarTabla() {

        $.ajax({
            url: "/crudphp/controllers/HomeController.php",
            method: "GET",
            dataType: "json",
            // data: {
            //     page: 1,
            //     limit: 10
            // },
            success: function (response) {
                dropTable();
                new DataTable("#table", {
                    // paging: true,
                    // pageLength: 10,
                    language: {
                        "decimal": "",
                        "emptyTable": "No hay información",
                        "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
                        "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
                        "infoFiltered": "(Filtrado de _MAX_ total entradas)",
                        "infoPostFix": "",
                        "thousands": ",",
                        "lengthMenu": "Mostrar _MENU_ Entradas",
                        "loadingRecords": "Cargando...",
                        "processing": "Procesando...",
                        "search": "Buscar:",
                        "zeroRecords": "Sin resultados encontrados",
                        "paginate": {
                            "first": "Primero",
                            "last": "Ultimo",
                            "next": "Siguiente",
                            "previous": "Anterior"
                        }
                    },
                    data: response,
                    columns: [
                        { data: "id" },
                        { data: "dui" },
                        { data: "nombre" },
                        { data: "apellido" },
                        { data: "direccion" },
                        { data: "sexo" },
                        { data: "fecha_nacimiento" },
                        { data: "municipio" },
                        { data: "nombredpto" },
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
        Swal.fire({
            title: 'Seguro que deseas eliminar a esta persona?',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',

        }).then((result) => {
            if (result.isConfirmed) {
                var id = $(this).data('id');
                eliminarPersona(id);
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })

    });

    $('#table').on('click', '.actualizar-btn', function () {
        var data = $(this).data('data');
        console.log(data);
        editarPersona(data);
    });

    $('#datepicker').datepicker({
        format: "dd/mm/yyyy",
        startDate: "01/01/1958",
        endDate: "31/12/2006",
        language: "es",
        orientation: "bottom auto",
        autoclose: true,
        locale: 'es',
    });

    $('#dui').mask('99999999-9');
    $('#formPersona').validate();


    // require(["validate.js"], function (validate) {
    //     var constraints = {
    //         name: {
    //             presence: true,
    //             length: {
    //                 minimum: 2,
    //                 message: "Debe tener al menos 2 caracteres"
    //             }
    //         },
    //     }
    // });




    $(document).on('submit', '#formPersona', function (e) {
        e.preventDefault();
        if ($('#formPersona').valid()) {
            var sexo = '';

            if ($('#femenino').is(':checked')) {
                sexo = 'Femenino'
            } else {
                sexo = 'Masculino'
            }

            var data = $(this).serialize();

            id = $('#id').val();


            Swal.fire({
                title: 'Seguro que deseas registrar los datos de esta persona?',
                showCancelButton: true,
                confirmButtonText: 'Aceptar',

            }).then((result) => {
                if (result.isConfirmed) {

                    $.ajax({
                        url: "/crudphp/controllers/HomeController.php",
                        method: "POST",
                        dataType: "json",
                        data: data,
                        success: function (response) {

                            cargarTabla();
                        },
                        complete: function (response) {
                            if (response.status === 200) {

                                limpiarFormulario();
                                exito();
                            } else {

                                limpiarFormulario();
                                error();
                            }
                        },
                        error: function (xhr, status, error) {
                            console.error("Error en la solicitud POST:", status, error);
                        }
                    });
                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            })



        }



    });


    // $('#formPersona').submit(function (e) {
    //     e.preventDefault();

    //     var sexo = '';

    //     if ($('#femenino').is(':checked')) {
    //         sexo = 'Femenino'
    //     } else {
    //         sexo = 'Masculino'
    //     }

    //     var data = {
    //         dui: $('#dui').val(),
    //         nombre: $('#name').val(),
    //         apellido: $('#apellido').val(),
    //         sexo: sexo,
    //         direccion: $('#direccion').val(),
    //         fecha_nacimiento: $('#datepicker').val(),


    //     }

    //     id = $('#id').val();

    //     if (id != '') {
    //         Swal.fire({
    //             title: 'Seguro que deseas modificar los datos de esta persona?',
    //             showCancelButton: true,
    //             confirmButtonText: 'Aceptar',

    //         }).then((result) => {
    //             if (result.isConfirmed) {
    //                 $.ajax({
    //                     url: `/crudphp/controllers/HomeController.php/${id}`,
    //                     method: "PATCH",
    //                     dataType: "json",
    //                     contentType: "application/json",
    //                     data: JSON.stringify(data),
    //                     success: function (response) {
    //                         cargarTabla();
    //                     },
    //                     error: function (xhr, status, error) {
    //                         console.error("Error en la solicitud PUT:", status, error);
    //                     }
    //                 });

    //             } else if (result.isDenied) {
    //                 Swal.fire('Changes are not saved', '', 'info')
    //             }
    //         })





    //     } else {

    //         $.ajax({
    //             url: "/crudphp/controllers/HomeController.php",
    //             method: "POST",
    //             dataType: "json",
    //             data: data,
    //             success: function (response) {
    //                 cargarTabla();
    //             },
    //             error: function (xhr, status, error) {
    //                 console.error("Error en la solicitud POST:", status, error);
    //             }
    //         });
    //     }
    //     limpiarFormulario();

    // });


    function eliminarPersona(id) {

        $.ajax({
            url: `/crudphp/controllers/HomeController.php/${id}`,
            method: "DELETE",
            dataType: "json",

            success: function (response) {
                cargarTabla();
            },
            complete: function (response) {
                if (response.status === 200) {
                    exito();
                } else {
                    error();
                }
            }
        });
    }

    function editarPersona(data) {
        console.log(data);
        $('#proceso').val('actualizar');
        $('#id').val(data.id);
        $('#dui').val(data.dui);
        $('#nombre').val(data.nombre);
        $('#apellido').val(data.apellido);
        $('#direccion').val(data.direccion);
        $('#btnsubmit').text('Editar');
        $('#datepicker').val(data.fecha_nacimiento);
        if (data.sexo === 'Femenino') {

            $('#femenino').prop('checked', true);
        } else if (data.sexo === 'Masculino') {
            $('#masculino').prop('checked', true);
        }
        cargarMunicipios(data.dpto, data.idmuni);

    }


    function limpiarFormulario() {
        $('#proceso').val('insertar');
        $('#btnsubmit').text('Submit');
        $('#id').val('');
        $('#nombre').val('');
        $('#apellido').val('');
        $('#direccion').val('');
        $('#datepicker').val('');
        $('#dui').val('');
    }

    function exito() {
        iziToast.show({
            title: 'Éxito',
            message: 'Registro exitoso',
            color: 'green',
            position: 'topRight',
            timeout: 3000
        });
    }

    function error() {
        iziToast.error({
            title: 'Error',
            message: 'Error al realizar la operación',
            position: 'topRight',
            timeout: 3000
        });
    }

    // $.fn.datepicker.dates['es'] = {
    //     days: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    //     daysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    //     daysMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
    //     months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    //     monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    //     today: "Hoy",
    //     monthsTitle: "Meses",
    //     clear: "Borrar",
    //     weekStart: 1,
    //     format: "dd/mm/yyyy"
    // };



    function dropTable() {
        if ($.fn.DataTable.isDataTable("#table")) {
            $("#table").DataTable().destroy();
            $("#table tbody").empty();
        }
    }

    cargarTabla();

});



