/**
 * This TEMPORARY JS file is for creating admin accounts.
 */

async function run() 
{   
    // Connect to the DB
    const mongoose = require('mongoose');
    const bcrypt = require('bcrypt');
    mongoose.connect('mongodb://127.0.0.1:27017/southalps');

    // Edit these values before running
    const admin_account = { username: 'admin', password: 'admin' };

    const hashedPassword = await bcrypt.hash(admin_account.password, 10);
    const Admins = require('./database/schemas/admin.js');

    let admin = new Admins({
        username: admin_account.username,
        password: hashedPassword
    });

    try 
    {
        admin = await admin.save();
    } catch (e) 
    {
        console.log(e);
    }
};

run();