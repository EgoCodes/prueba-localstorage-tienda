<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-wEmeIV1mKuiNpC+IOBjI7aAzPcEZeedi5yW5f2yOq55WWLwNGmvvx4Um1vskeMj0" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="public/css/style.css">
    <link rel="icon" type="image/svg" href="favico.svg">
    <title>Carrito | Power Smart</title>
</head>
<body>
    <header>
        <?php
            include_once 'public/partials/_header.php';
        ?>
    </header>
    <main>
        <div class="container-sm">
            <h1 class="titulito">Tu carrito</h1>
            <form class="row g-3 persona" id="pagar">
                <div class="row g-3" id="formularios"></div>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">producto</th>
                        <th scope="col">cantidad</th>
                        <th scope="col">costo</th>
                        </tr>
                    </thead>
                    <tbody id="compras">
                    </tbody>
                </table>
                <div class="botones">
                    <button type="submit" class="btn btn-primary">Pagar</button>
                    <button class="btn btn-primary" id="limpieza">limpiar carrito</button>
                </div>
            </form>
        </div>
    </main>
    <?php
        include_once 'public/partials/_footer.php';
    ?>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.min.js" integrity="sha384-lpyLfhYuitXl2zRZ5Bn2fqnhNAKOAaM/0Kr9laMspuaMiZfGmfwRNFh8HlMy49eQ" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="public/js/main.js"></script>
</body>
</html>