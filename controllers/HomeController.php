<?php


$method = $_SERVER['REQUEST_METHOD'];


include_once '../database/Connection.php';

$database = new Database();

/* header json */

header('Content-Type: application/json');

if($method === "GET" && isset($_GET['type'])) {
    
    $id = $_GET['id'] ?? null;
    $type = $_GET['type'] ?? null;
     
   
    if($id) {
            
            $muni = $database->select("munsv", "DEPSV_ID = $id", ", (Select DepName from depsv where ID = munsv.DEPSV_ID ) as dpto" );
             echo json_encode($muni);
                  
               
    } else {
        if($type === 'dpto'){
        $dpto = $database->select("depsv");
        echo json_encode($dpto);
        }else if($type === 'muni'){
            $muni = $database->select("munsv");
            echo json_encode($muni);
        }
    }

    exit;
}

if($method === "GET") {
    
        $id = $_GET['id'] ?? null;
        // $limit = $_GET['limit'] ?? 10;
        // $page = $_GET['page'] ?? 1;
        // $offset = ($page - 1) * $limit;
    
       
        if($id) {           
            $persona = $database->select("Persona", "id = $id", ",  (Select MunName from munsv where ID = Persona.idmuni ) as municipio , (Select (Select d.ID  from depsv d where d.ID= munsv.DEPSV_ID) from munsv where ID = Persona.idmuni ) as dpto, (Select (Select DepName  from depsv d where d.ID= munsv.DEPSV_ID) from munsv where ID = Persona.idmuni ) as nombredpto" );
            echo json_encode($persona);
        } else {
           
            $personas = $database->select("Persona" ,"", ", (Select MunName from munsv where ID = Persona.idmuni ) as municipio ,(Select MunName from munsv where ID = Persona.idmuni ) as municipio , (Select (Select d.ID  from depsv d where d.ID= munsv.DEPSV_ID) from munsv where ID = Persona.idmuni ) as dpto, (Select (Select DepName  from depsv d where d.ID= munsv.DEPSV_ID) from munsv where ID = Persona.idmuni ) as nombredpto" );
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

// if ($method === 'PATCH') {
//     $id = basename($_SERVER['REQUEST_URI']);

//     if(isset($id)) {        
        
//         $json_data = file_get_contents("php://input");
//         $data = json_decode($json_data, true);      
//         // parse_str(file_get_contents("php://input"), $data);
        
//         $database->update("Persona", $data, "id = $id"); 
        
        
//     } else {
//         echo json_encode([
//             'status' => 0,
//             'message' => 'No se ha enviado el id'
//         ]);
//         exit; 
//     }    
//     echo json_encode([
//         'status' => 1,
//         'message' => 'Dato actualizado correctamente'
//     ]);   
    
//     exit;
// }


if($method === "POST"){

    if(isset($_POST['proceso']) && ($_POST['proceso'] == 'insertar')){
        $persona = [
            "nombre" => $_POST['nombre'],
            "apellido" => $_POST['apellido'],
            "direccion" => $_POST['direccion'],
            "sexo" => $_POST['sexo'],
            "fecha_nacimiento" => $_POST['fecha_nacimiento'],
            "dui" => $_POST['dui'],
            "idmuni" => $_POST['idmuni'],
        ];
    
        $data = $database->insert("Persona", $persona);
    
        print json_encode([
            "status" => 1,
            "message" => "Persona agregada correctamente",
            "database" => $data,
            "post"=> $_POST
            
        ]);
    }else if(isset($_POST['proceso']) && ($_POST['proceso'] == 'actualizar')){
        
        $data = [
            "nombre" => $_POST['nombre'],
            "apellido" => $_POST['apellido'],
            "direccion" => $_POST['direccion'],
            "sexo" => $_POST['sexo'],
            "fecha_nacimiento" => $_POST['fecha_nacimiento'],
            "dui" => $_POST['dui'],
            "idmuni" => $_POST['idmuni'],
            // "iddpto" => $_POST['iddpto'],
            
        ];
         $id= $_POST['id'];
    
        $resultado = $database->update("Persona", $data, "id = $id"); 
    
        print json_encode([
            "status" => 1,
            "message" => "Persona modificada correctamente",
            "database" => $resultado,
            "post"=> $_POST
            
        ]);
    }

   
    exit;
}


echo json_encode([
    "status" => 0,
    "message" => "Metodo no permitido"
]);