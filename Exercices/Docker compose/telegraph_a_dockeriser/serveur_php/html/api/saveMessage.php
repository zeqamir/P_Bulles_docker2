<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");
    
    if (isset($_POST['charAscii'])) {
        
        $charAscii = $_POST['charAscii'];
        $ipSender = $_SERVER['REMOTE_ADDR'];

        $servername = "mysql:3306";
        $username = "root";
        $password = "root";
        $dbname = "db_telegraph";
        $STX = 2;
        $EOT = 4;

        try {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            

            if ($charAscii == $STX) {
                $sql = "INSERT INTO t_message (mesIPSender) VALUES (:mesIPSender)";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':mesIPSender', $ipSender);
                $stmt->execute();
                
                $idMessage = $conn->lastInsertId();

                $sql = "INSERT INTO t_character (idMessage, charAscii) VALUES (:idMessage, :charAscii)";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':idMessage', $idMessage);
                $stmt->bindParam(':charAscii', $charAscii);
                $stmt->execute();

                echo json_encode(array('message' => 'STX inséré avec succès.', 'idMessage' => $idMessage));
            } 
            else {                
                $sql = "SELECT idMessage FROM t_message WHERE mesIPSender = :mesIPSender ORDER BY idMessage DESC LIMIT 1";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':mesIPSender', $ipSender);
                $stmt->execute();
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                if ($row != false){
                    $idMessage = $row['idMessage'];                

                    $sql = "SELECT 
                                (SELECT COUNT(*) FROM t_character WHERE idMessage = :idMessage AND charAscii = :STX) AS nbSTX,
                                (SELECT COUNT(*) FROM t_character WHERE idMessage = :idMessage AND charAscii = :EOT) AS nbEOT";
                                
                    $stmt = $conn->prepare($sql);
                    $stmt->bindParam(':idMessage', $idMessage);
                    $stmt->bindParam(':STX', $STX);
                    $stmt->bindParam(':EOT', $EOT);
                    $stmt->execute();
                    $row = $stmt->fetch(PDO::FETCH_ASSOC);

                
                    $nbSTX = $row['nbSTX'];
                    $nbEOT = $row['nbEOT'];

                    if ($nbSTX > 0 && $nbEOT == 0) {
                        $sql = "INSERT INTO t_character (idMessage, charAscii) VALUES (:idMessage, :charAscii)";
                        $stmt = $conn->prepare($sql);
                        $stmt->bindParam(':idMessage', $idMessage);
                        $stmt->bindParam(':charAscii', $charAscii);
                        $stmt->execute();

                        if ($charAscii == $EOT){                        
                            echo json_encode(array('message' => 'Message terminé par EOT avec succès.', 'idMessage' => $idMessage));
                        } else {
                            echo json_encode(array('message' => 'Caractère inséré avec succès.', 'idMessage' => $idMessage));
                        }
                    } else {
                        echo json_encode(array(
                            'error' => 'Aucun STX trouvé pour le message en cours.'
                        ));
                    }
                }
                else{
                    echo json_encode(array(
                        'error' => $charAscii // La base de données est vide et le caractère en cours n'est pas STX.
                    ));
                }
            }

        } catch(PDOException $e) {
            echo json_encode(array('error' => 'Erreur de base de données : ' . $e->getMessage()));
        }

        $conn = null;

    } else {
        echo json_encode(array('error' => 'Le champ charAscii est manquant.'));
    }
} else {
    echo json_encode(array('error' => 'Méthode non autorisée.'));
}
?>
