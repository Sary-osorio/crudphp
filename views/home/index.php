<?php include '../layouts/header.php' ?>


<main class="main">
    <div class="container-fluid" style="">
        <div class="container bg-info d-flex justify-content-between mt-7">
            <label class="h3">Registro de persona</label>
        </div>

        <div class="row mt-5">
            <div class="col mt-2">
                <form id="formPersona">
                    <div class="row">
                        <div class="mb-3 col-6">
                            <label for="name" class="form-label">Nombre</label>
                            <input type="text" class="form-control" id="name">
                        </div>
                        <div class="mb-3 col-6">
                            <label for="apellido" class="form-label">Apellido</label>
                            <input type="text" class="form-control" id="apellido">
                        </div>
                    </div>
                    <div class="row">
                        <div class="mb-3 col-6">
                            <label for="direccion" class="form-label">Dirección</label>
                            <textarea class="form-control" id="direccion"></textarea>
                        </div>


                    </div>

                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
            <div class="col mt-2">
                <table class="table" id="table">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido</th>
                            <th scope="col">Direccion</th>
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