<?php
    require_once 'conexion.php';
    if(isset($_POST['op'])){
        switch ($_POST['op']) {
            case 'desc':
                    $idP = $_POST['id'];
                    $cnt = $_POST['cnt'];
                    $stmt = $mysqli->prepare("UPDATE `productos` SET `cantidadP` = (cantidadP - ?) WHERE `productos`.`idP` = ?");
                    $stmt->bind_param('ii', $cnt, $idP);
                    $stmt->execute();
                    $stmt->close();
                    $mysqli->close();
                break;
            case 'busUsu':
                    $ced = $_POST["ced"];
                    $stmt = $mysqli->prepare("SELECT idPer FROM persona WHERE cedulaPer = ?");
                    $stmt->bind_param('i', $ced);
                    $stmt->execute();
                    $stmt->bind_result($id);
                    $pdt = array();
                    while ($stmt->fetch()) {
                        echo $id;
                    }
                    $stmt->close();
                    $mysqli->close();
                break;
            case 'busUsuH':
                    $ced = $_POST["cedH"];
                    $stmt = $mysqli->prepare("SELECT idPer FROM persona WHERE cedulaPer = ?");
                    $stmt->bind_param('i', $ced);
                    $stmt->execute();
                    $stmt->bind_result($id);
                    $pdt = array();
                    while ($stmt->fetch()) {
                        echo $id;
                    }
                    $stmt->close();
                    $mysqli->close();
                break;
            case 'regUsu':
                    $nom = $_POST['nom'];
                    $ced = $_POST['ced'];
                    $dir = $_POST['dir'];

                    $stmt = $mysqli->prepare("INSERT INTO `persona` (`idPer`, `nombrePer`, `cedulaPer`, `direccionPer`) VALUES (null, ?, ?, ?)");
                    $stmt->bind_param('sis', $nom, $ced, $dir);
                    $stmt->execute();
                    $stmt->close();
                    $mysqli->close();
                break;
            case 'regCom':
                    $pdt = $_POST['pdt'];
                    $per = $_POST['per'];
                    $cnt = $_POST['cnt'];
                    $cos = $_POST['pag'];
                    $stmt = $mysqli->prepare("INSERT INTO `compra` (`idC`, `idProductoC`, `idPersonasC`, `cantidadC`, `pagaC`) VALUES (NULL, ?, ?, ?, ?) ");
                    $stmt->bind_param('iiii', $pdt, $per, $cnt, $cos);
                    $stmt->execute();
                    $stmt->close();
                    $mysqli->close();
                break;
        }
    }
?>