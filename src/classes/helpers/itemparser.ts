
import type { ItemHash, ParsedItem, SchemaTableName } from '../../types';
import SearchIndex from '../SearchIndex';
import { processItemName } from '../../lib/from.string';

export function parsedHashToItemHash(hash: ParsedItem, name: string, searchIndex: SearchIndex, fromClassInfo = true): ItemHash|null {
    if (hash.skin_name !== undefined) {
        name = name.replace(hash.skin_name + ' ', '');
    }
    
    // pre-process for added performance...
    if (hash.killstreak_tier_name !== undefined) {
        name = name.replace(hash.killstreak_tier_name + ' ', '');
    }
    
    if (hash.quality_name !== undefined) {
        name = name.replace(hash.quality_name + ' ', '');
    }
    
    if (hash.wear_name !== undefined) {
        name = name.replace(' (' + hash.wear_name + ')', '');
    }
    
    const skipTables: SchemaTableName[] = (
        fromClassInfo ?
            [
                'skins',
                'particles',
                'killstreak_tiers',
                'qualities',
                'wears'
            ] :
            [
                'skins',
                'particles',
                'killstreak_tiers',
                'wears'
            ]
    );
    const returnWithoutDefindex = fromClassInfo ? true : false;
    
    // we can extract more attributes from the name
    const nameHash: any = processItemName(name, {
        ignoreCase: false,
        // we don't need to process these when processing the name
        skipTables,
        searchIndex,
        returnWithoutDefindex,
        // use the hash from the parseAsset result as a starting point
        hash
    });
    
    // could not determine defindex
    if (!nameHash) {
        return null;
    }
    
    // fill in the item name using the defindex
    if (hash.item_name === undefined && hash.defindex !== undefined) {
        const item_name = searchIndex.getValue('items', 'defindex', 'item_name', hash.defindex);

        if (item_name !== undefined) {
            hash.item_name = item_name;
        }
    }
    
    for (const k in nameHash) {
        if (hash[k] === undefined) {
            hash[k] = nameHash[k];
        }
    }
    
    if (hash.particle_name !== undefined) {
        const particle = searchIndex.getValue('particles', 'name', 'value', hash.particle_name);

        if (particle !== undefined) {
            hash.particle = particle;
        }
    }
    
    if (hash.skin_name !== undefined) {
        const skin = searchIndex.getValue('skins', 'name', 'value', hash.skin_name);

        if (skin !== undefined) {
            hash.skin = skin;
        }
    }
    
    return hash as ItemHash;
}
