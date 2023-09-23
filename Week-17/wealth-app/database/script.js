
const { Investments } = require('../routes/investments/module');
const { Users } = require('../routes/users/module')
const createBulkUser = async () => {
    await Users.bulkCreate([
        {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "password": "password1"
        },
        {
            "name": "Jane Smith",
            "email": "jane.smith@example.com",
            "password": "password2"
        },
        {
            "name": "Alice Johnson",
            "email": "alice.johnson@example.com",
            "password": "password3"
        },
        {
            "name": "Bob Williams",
            "email": "bob.williams@example.com",
            "password": "password4"
        },
        {
            "name": "Emily Davis",
            "email": "emily.davis@example.com",
            "password": "password5"
        },
        {
            "name": "Michael Brown",
            "email": "michael.brown@example.com",
            "password": "password6"
        }
    ]);
}


module.exports = {
    createBulkUser
}