<?php
    require_once 'conexion.php';

    $stmt = $mysqli->prepare("SELECT `idP`, `nombreP`, `descripcionP`, `imagenP`, `cantidadP`, `precioP` FROM `productos` WHERE cantidadP > 0 ");
    $stmt->execute();
    $stmt->bind_result($id, $nombre, $descripcion, $img, $cantidad, $precio);
    $pdt = array();
    $j = 0;
    while ($stmt->fetch()) {
        $pdt[$j]['id']=$id;
        $pdt[$j]['nombre']=$nombre;                       
        $pdt[$j]['descripcion']=$descripcion;
        $pdt[$j]['img']=$img;
        $pdt[$j]['cantidad']=$cantidad;                       
        $pdt[$j]['precio']=$precio;
        $j++;
    }
    echo json_encode($pdt);
    $stmt->close();
    $mysqli->close();
?>