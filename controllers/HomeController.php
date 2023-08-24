<?php


$method = $_SERVER['REQUEST_METHOD'];


include_once '../database/Connection.php';

$database = new Database();

/* header json */

header('Content-Type: application/json');

if($method === "GET") {
    
        $id = $_GET['id'] ?? null;
    
        if($id) {
            $persona = $database->select("Persona", "id = $id");
            echo json_encode($persona[0]);
        } else {
            $personas = $database->select("Persona");
            echo json_encode($personas);
        }
    
        exit;
}

if ($method === 'DELETE') {
    $id = basename($_SERVER['REQUEST_URI']);
    if(isset($id)) {
       
        $database->delete("Persona", "id = $id");
    } else {
        echo json_encode([
            'status' => 0,
            'message' => 'No se ha enviado el id'
        ]);
        exit; 
    }    
    echo json_encode([
        'status' => 1,
        'message' => 'Dato eliminado correctamente'
    ]);   
    
    exit;
}

if ($method === 'PATCH') {
    $id = basename($_SERVER['REQUEST_URI']);

    if(isset($id)) {
        
        
        $json_data = file_get_contents("php://input");
        $data = json_decode($json_data, true);      
        // parse_str(file_get_contents("php://input"), $data);
        
        $database->update("Persona", $data, "id = $id"); 
        
        
    } else {
        echo json_encode([
            'status' => 0,
            'message' => 'No se ha enviado el id'
        ]);
        exit; 
    }    
    echo json_encode([
        'status' => 1,
        'message' => 'Dato actualizado correctamente'
    ]);   
    
    exit;
}


if($method === "POST"){

    $persona = [
        "nombre" => $_POST['nombre'],
        "apellido" => $_POST['apellido'],
        "direccion" => $_POST['direccion'],
        "sexo" => $_POST['sexo'],
        "fecha_nacimiento" => $_POST['fecha_nacimiento'],
        "dui" => $_POST['dui'],
    ];

    $data = $database->insert("Persona", $persona);

    print json_encode([
        "status" => 1,
        "message" => "Persona agregada correctamente",
        "database" => $data
        
    ]);

    exit;
}


echo json_encode([
    "status" => 0,
    "message" => "Metodo no permitido"
]);