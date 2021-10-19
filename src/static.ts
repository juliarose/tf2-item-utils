import itemsJSON from 'tf2-static-schema/static/items.json';
import particlesJSON from 'tf2-static-schema/static/effects.json';
import skinsJSON from 'tf2-static-schema/static/paint-kits.json';
import { ItemRecord, ParticleRecord, SkinRecord } from './types';
import ItemParser from './classes/ItemParser';

// prepare the schema
const schema = (function() {
    function parseMap(map: any) {
        // will always be a positive number
        const reNumberKey = /^\d+$/;
        const arr = [];
        
        for (const name in map) {
            // we want to ignore all keys that are a value rather a name
            if (reNumberKey.test(name)) {
                continue;
            }
            
            // should absolutely be a number
            const value = parseInt(map[name]);
            
            arr.push({
                name,
                value
            });
        }
        
        return arr;
    }
    
    return {
        items: itemsJSON as ItemRecord[],
        skins: parseMap(skinsJSON)as SkinRecord[],
        particles: parseMap(particlesJSON) as ParticleRecord[]
    };
}());
// use our prepared schema to create a parser
const staticParser = new ItemParser(schema);

export default staticParser;

module.exports = staticParser;
