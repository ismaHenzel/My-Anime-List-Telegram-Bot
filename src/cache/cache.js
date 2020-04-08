import redis from 'redis';
import getMyAnimeListData from '../services/getMyAnimeListData.js';
import util from 'util';

const redisUrl = "redis://127.0.0.1:6379";
const client = redis.createClient(redisUrl);
client.get = util.promisify(client.get);

client.on("error", (error)=>{
    console.error("Error :", error)
});

export async function cache(keyName){

    let data = await client.get(keyName).catch((err)=>{
            client.del(keyName);
            console.error("Error getting data ",err);
    });

    if(data){
        console.log("INSIDE REDIS")
        return JSON.parse(data);
    };
    
    return await getMyAnimeListData(keyName).then(async value=>{
        console.log("OUTSIDE REDIS");
        client.set(keyName, JSON.stringify(value), "EX", 21600)
        return value;
    });
}




   