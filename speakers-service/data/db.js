const {MongoClient} = require('mongodb');

const connectDB = async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "";
 

    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

module.exports = connectDB;