const mongoose = require('mongoose') //install mongodb first along side node.js, then npm i mongoose
const Services = require('./schemas/services')

mongoose 
  .connect('mongodb://127.0.0.1:27017/mco2')//connects to database, for some reason localhost:27017 doesnt work, but 127.0.0.1 does??
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log(err));

switcher()
async function switcher(){
    const lever = 2; //for deleting n stuff, sometimes it gets corrupted?
    switch(lever){
        case 0:{
            services_delete()
        } break;
            
        case 1:{
           services_populate()
        } break;
            
        default:
            break;
    }
}
  
  async function services_populate(){
    try{
      //Adding services
      Services.insertMany([
        {name:"Consolidation", description:"Placeholder"},
        {name:"Order/Case Picking", description:"Placeholder"},
        {name:"Stripping and Stuffing", description:"Placeholder"},
        {name:"Dock Charging", description:"Placeholder"},
        {name:"Re-packing and Labelling", description:"Placeholder"}
      ])
    }catch(e){
      console.log(e.message)
    }
  }

  async function services_delete(){
    try{
        Services.deleteMany({})
        .then((result) => {
        console.log(`Refreshed ${result.deletedCount} documents`);
      })
        .catch((error) => {
        console.error("Error deleting documents:", error);
      })
    } catch(e){
        console.log(e.message)
    }
}