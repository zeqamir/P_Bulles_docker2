function sendCharacter(charAscii) {
    fetch('http://localhost:8080/api/saveMessage.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'charAscii=' + encodeURIComponent(charAscii)
    })
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            console.log(data);
            if (data.message) {
                alert('Success: ' + data.message);
            } else if (data.error) {
                alert('Error: ' + data.error);
            }
        } catch (error) {
            console.error('Error parsing JSON:', error, 'Response text:', text);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}