const TextEntry = require('./schemas/textEntry.js');
const ImageEntry = require('./schemas/imageEntry.js');
const Services = require('./schemas/services.js');
const Accreditations = require('./schemas/accreditations.js');
const Careers = require('./schemas/careers.js');
const Facilities = require('./schemas/facilities.js');

const controller = {
  getText: function (param) {
    /**
     * Retrieves text entries based on the given parameter.
     * @param -- indicates the page
     */
    return TextEntry.find({ page: param });
  },

  getImages: function (param) {
    /**
     * Retrieves image entries based on the given parameter.
     * @param -- indicates the page
     */
    return ImageEntry.find({ page: param });
  },

  findTextByID: function (id) {
    /**
     * Retrieves single text entry based on the given ID.
     * @id -- identifier
     */
    return TextEntry.findOne({ id: id }).exec();
  },

  findImageByID: function (id) {
    /**
     * Retrieves single image entry based on the given ID.
     * @id -- identifier
     */
    return ImageEntry.findOne({ id: id }).exec();
  },

  getAll: function (db) {
    /**
     * Fetches all documents in a collection.
     * @db -- name of an existing collection (services, text, images)
     */
    switch (db) {
      case 'facilities':
        return Facilities.find({});
      case 'careers':
        return Careers.find({});
      case 'accreditations':
        return Accreditations.find({});
      case 'services':
        return Services.find({});
      case 'text':
        return TextEntry.find({});
      case 'images':
        return ImageEntry.find({});
      default:
        return null;
    }
  },

  addDocument: function (db, doc) {
    /**
     * Inserts a document into a collection.
     * @db  -- name of an insertable collection (services)
     * @doc -- document to be inserted
     */
    switch (db) {
      case 'facilities':
        return Facilities.create(doc);
      case 'careers':
        return Careers.create(doc);
      case 'accreditations':
        return Accreditations.create(doc);
      case 'services':
        let service = new Services({
          name: doc.name,
          description: doc.description
        });
        return Services.create(service);
      default:
        return null;
    }
  },

  deleteDocumentByID: function (db, id) {
    /**
     * Deletes a document from a specified collection.
     * @db  -- name of a collection
     * @id  -- identifier
     */
    switch (db) {
      case 'accreditations':
        return Accreditations.deleteOne({ _id: id });
      case 'careers':
        return Careers.deleteOne({ _id: id });
      case 'facilities':
        return Facilities.deleteOne({ _id: id });
      case 'services':
        return Services.deleteOne({ _id: id });
      default:
        return null;
    }
  }
};

module.exports = controller;
