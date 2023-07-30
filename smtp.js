const SMTPServer = require('smtp-server').SMTPServer;

require('dotenv').config();

const server = new SMTPServer({
    onData(stream, session, callback) {
        let data = '';
        stream.on('data', (chunk) => {
            data += chunk;
        });
        stream.on('end', () => {
            console.log('Received email data:');
            console.log(data); // Handle the email data here
            callback();
        });
    },
    onAuth(auth, session, callback) {
        // Perform authentication here
        const username = process.env.user_email;
        const password = process.env.user_password;

        // You can use your own authentication logic
        // For demonstration purposes, this code allows any username and password combination
        const isAuthenticated = true; // Set to true if authentication is successful

        if (isAuthenticated) {
            console.log(`User ${username} authenticated successfully`);
            callback(null, { user: username });
        } else {
            console.log(`Authentication failed for user ${username}`);
            const error = new Error('Authentication failed');
            error.responseCode = 535; // 535 indicates authentication failure
            callback(error);
        }
    },
});

server.listen(2525, '0.0.0.0', () => {
    console.log('SMTP server is listening on port 2525');
});