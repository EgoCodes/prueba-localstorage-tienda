<?php
    require_once 'conexion.php';
    if(isset($_POST['id'])){
        $idP = $_POST['id'];
        $stmt = $mysqli->prepare("SELECT `idP`, `nombreP`, `precioP` FROM `productos` WHERE cantidadP > 0 AND idP = ?");
        $stmt->bind_param('i', $idP);
        $stmt->execute();
        $stmt->bind_result($id, $nombre, $precio);
        $pdt = array();
        while ($stmt->fetch()) {
            $pdt['id']=$id;
            $pdt['nombre']=$nombre;  
            $pdt['cantidad']=1;                       
            $pdt['precio']=$precio;
        }
        if(sizeof($pdt) > 0){
            echo json_encode(array('std'=>200,'msj'=>'Producto agregado.', 'producto'=>$pdt));
        }else{
            echo json_encode(array('std'=>404,'msj'=>'El producto no se encuentra disponible.'));
        }
        $stmt->close();
        $mysqli->close();
    }else{
        echo json_encode(array('std'=>403,'msj'=>'No se puede continuar sin la información pertinente.'));
    }
    
?>