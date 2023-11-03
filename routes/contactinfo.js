/**
 * When required, this code retrieves all entries 
 * in the Contact Info Collection.
 */

const Contacts = require('../database/schemas/contactinfo.js');
const Services = require('../database/schemas/services.js');

var getContacts = async function ()
{
  await Contacts.find({}).exec()
  .then((res) => res);
};

var getServices = async function ()
{
  await Services.find({}).exec()
  .then((res) => res);
};

module.exports.getContacts = getContacts;
module.exports.getServices = getServices;
