<?php
// Vérifier que la requête est une requête GET
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    header("Access-Control-Allow-Origin: *", "Content-Type: application/json");

    $servername = "mysql:3306";
    $username = "root";
    $password = "root";
    $dbname = "db_telegraph";

    try {
        // Connexion à la base de données
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Requête SQL pour récupérer tous les messages et leurs caractères associés
        $sql = "
        SELECT m.idMessage, m.mesIPSender, c.charAscii
        FROM t_message m
        JOIN t_character c ON m.idMessage = c.idMessage
        ORDER BY m.idMessage, c.idCharacter";

        $stmt = $conn->prepare($sql);
        $stmt->execute();

        // la variable message va contenir un tableau associatif de messages.
        $messages = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $idMessage = $row['idMessage'];
            if (!isset($messages[$idMessage])) {
                $messages[$idMessage] = [
                    'idMessage' => $idMessage,
                    'mesIPSender' => $row['mesIPSender'],
                    'characters' => []
                ];
            }
            array_push($messages[$idMessage]['characters'], $row['charAscii']);
        }

        // Répondre avec les données JSON
        echo json_encode(array_values($messages));

    } catch(PDOException $e) {
        echo json_encode(['error' => 'Erreur de base de données : ' . $e->getMessage()]);
    }

    // Fermer la connexion à la base de données
    $conn = null;
} else {
    // Si la requête n'est pas de type GET
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Méthode non autorisée.']);
}
?>
