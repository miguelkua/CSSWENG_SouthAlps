const TextEntry = require('./schemas/textEntry.js');
const ImageEntry = require('./schemas/imageEntry.js');
const Services = require('./schemas/services.js');
const Careers = require('./schemas/careers.js');
const Facilities = require('./schemas/facilities.js');
const Accreditations = require('./schemas/accreditations.js');

const collections = {
    accreditations: Accreditations,
    careers: Careers,
    facilities: Facilities,
    services: Services,
    text: TextEntry,
    images: ImageEntry
};

const controller = {
    getText: (param) => TextEntry.find({ page: param }),

    getImages: (param) => ImageEntry.find({ page: param }),

    findTextByID: (customId) => TextEntry.findById({ id: customId }).exec(),

    findImageByID: (customId) => ImageEntry.findOne({ id: customId }).exec(),

    findAccreditationByID: (id) => Accreditations.findById(id).exec(),

    getAll: (db) => collections[db] ? collections[db].find({}) : null,

    addDocument: (db, doc) => {
        if (collections[db]) {
            return collections[db].create(doc);
        }
        return null;
    },

    deleteDocumentByID: (db, id) => {
        if (collections[db]) {
            return collections[db].deleteOne({ _id: id });
        }
        return null;
    }
};

module.exports = controller;
