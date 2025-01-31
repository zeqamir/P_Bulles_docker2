
async function readMessages() {
    try {
        const response = await fetch('http://192.168.1.140:8080/api/getMessages.php');
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des messages.');
        }
        const messages = await response.json();
        console.log('Messages reçus :');
        console.log(messages);
        
        const messagesDiv = document.getElementById('idMessages');
        messagesDiv.innerHTML = "";
        
        const table = document.createElement("table");
        messagesDiv.appendChild(table);
        const headerRow = document.createElement("tr");
        
        const thIp = document.createElement("th");

        thIp.textContent = "IP Source";
        headerRow.appendChild(thIp);
        
        const thMessage = document.createElement("th");
        thMessage.textContent = "Messages";
        headerRow.appendChild(thMessage);
        
        table.appendChild(headerRow);
        
        messages.forEach(m => {
            const row = document.createElement("tr");
            
            const tdIp = document.createElement("td");
            tdIp.textContent = m.mesIPSender;
            row.appendChild(tdIp);
            
            const tdMessage = document.createElement("td");
            let message = "";
            m.characters.forEach(c => {
                message += String.fromCharCode(c);
            });
            tdMessage.textContent = message;
            row.appendChild(tdMessage);
            
            table.appendChild(row);
        });
        
    } catch (error) {
        console.error('Erreur :', error.message);
    }
}

// Toutes les 10 secondes, on collecte les message de la base de données.
setInterval(readMessages, 10000);

// Avec une lecture initiale...
document.addEventListener('DOMContentLoaded', readMessages);
