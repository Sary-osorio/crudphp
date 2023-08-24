<?php include '../layouts/header.php' ?>


<main class="main">
    <div class="container-fluid" style="">
        <div class="container-fluid bg-info d-flex justify-content-between mt-7">
            <label class="h3">Registro de persona</label>
        </div>

        <div class="row mt-5">
            <div class="col mt-2">
                <form id="formPersona">
                    <input type="hidden" id="id">
                    <div class="row">
                        <div class="mb-3 ">
                            <label for="dui" class="form-label">DUI:</label>
                            <input type="text" class="form-control" id="dui" name="dui" required>
                        </div>
                        <div class="mb-3 ">
                            <label for="nombre" class="form-label">Nombre</label>
                            <input type="text" name="nombre" class="form-control" id="nombre"
                                pattern="[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+" required>
                        </div>
                        <div class="mb-3 ">
                            <label for="apellido" class="form-label">Apellido</label>
                            <input type="text" class="form-control" id="apellido" name="apellido"
                                pattern="[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+" required>
                        </div>
                    </div>
                    <div class="mb-3 ">
                        <label class="form-check-label" for="datepicker" required>
                            Fecha de nacimiento
                        </label>
                        <input type="text" class="form-control" name="fecha_nacimiento" id="datepicker">


                    </div>
                    <div class="row">

                        <div class="mb-3 ">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="sexo" id="femenino" value="femenino">
                                <label class="form-check-label" for="femenino">
                                    Femenino
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="sexo" id="masculino"
                                    value="masculino" checked>
                                <label class="form-check-label" for="masculino">
                                    Masculino
                                </label>
                            </div>
                        </div>

                        <div class="mb-3 ">
                            <label for="direccion" class="form-label">Dirección</label>
                            <textarea class="form-control" id="direccion" required name="direccion"></textarea>
                        </div>

                    </div>

                    <button type="submit" class="btn btn-primary" id="btnsubmit">Submit</button>
                </form>
            </div>
            <div class="col-8 mt-2">
                <table class="table" id="table">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">dui</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido</th>
                            <th scope="col">Dirección</th>
                            <th scope="col">Género</th>
                            <th scope="col">Fecha de nacimiento</th>
                            <th></th>

                        </tr>
                    </thead>
                    <tbody>


                    </tbody>
                </table>

            </div>
        </div>
    </div>
</main>
<?php include '../layouts/footer.php' ?>