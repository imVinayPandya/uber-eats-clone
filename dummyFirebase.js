import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const db = {};

export const firestore = () => {
    const get = (tableName) => () => {
        const data = db[tableName];
        const orderIds = Object.keys(data);
        let orders = {};

        for (let i = 0; i < orderIds.length; i++) {
            const orderId = orderIds[i];
            console.log(orderId, data[orderId]);
            orders = {
                items: data[orderId].items
            };    
            
        }
        return orders;
    };

    const add = (tableName) => (item = {}) => {
        const uuid = uuidv4();
        db[tableName][uuid] = {};
        db[tableName][uuid] = item;
        // console.log('RECORD', db[tableName]);
        return  Promise.resolve({
            [uuid]: db[tableName][uuid]
        });
    };

    return {
        collection: (tableName) => {
            if (!db[tableName]) {
                console.log("table does not exist");
                db[tableName] = {};
            }
            return { add: add(tableName), get: get(tableName) };
        }
    }
};