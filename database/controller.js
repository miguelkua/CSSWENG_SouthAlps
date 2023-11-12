const TextEntry = require('./schemas/textEntry.js');
const ImageEntry = require('./schemas/imageEntry.js');
const Services = require('./schemas/services.js');


const controller = 
{
    getText: function (param) 
    {
        /**
         * Retrieves text entries based on the given parameter.
         * @param -- indicates the page
         */
        return TextEntry.find({ page: param });
    },

    getImages: function (param)
    {
        /**
         * Retrieves image entries based on the given parameter.
         * @param -- indicates the page
         */
        return ImageEntry.find({ page: param });
    },

    findTextByID: function (id)
    {
        /**
         * Retrieves single text entry based on the given ID.
         * @id -- identifier
         */
        return TextEntry.findOne({ id: id}).exec();
    },

    findImageByID: function (id)
    {
        /**
         * Retrieves single image entry based on the given ID.
         * @id -- identifier
         */
        return ImageEntry.findOne({ id: id}).exec();
    },

    getAll: function(db)
    {
        /**
         * Fetches all documents in a collection.
         * @db -- name of an existing collection (services, text, images)
         */
        switch (db) 
        {
            case 'services': return Services.find({});
            case 'text': return TextEntry.find({});
            case 'images': return ImageEntry.find({});
            default: return null;
        }
    },

    addDocument: function(db, doc)
    {
        /**
         * Inserts a document into a collection.
         * @db  -- name of an insertable collection (services)
         * @doc -- document to be inserted
         */
        switch (db) 
        {
            case 'services': return Services.create(doc);
            default: return null;
        }
    }
}

module.exports = controller