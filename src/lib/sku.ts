import { ItemHash, ParseSKUAttributes } from '../types';
import SearchIndex from '../classes/SearchIndex';
import * as maps from './schema/maps';

export function parseSKU(sku: string): ParseSKUAttributes|null {
    function isIntegerValue(key: string) {
        return [
            'killstreak_tier',
            'particle',
            'wear',
            'skin',
            'craft_number',
            'crate_number',
            'target_defindex',
            'output_defindex',
            'output_quality'
        ].indexOf(key) !== -1;
    }
    
    const elements = sku.split(';');
    // takes the first two elements and assigns them to variables and removes them from "elements"
    const leading = elements.splice(0, 2);
    
    // make sure there are 2, and that they are both numbers
    if (leading.length !== 2 || !leading.some((str: string) => /^-?\d+$/.test(str))) {
        return null;
    }
    
    const [
        defindex,
        quality
    ] = leading.map((value: string) => parseInt(value));
    const keyMaps: {
        [key: string]: string
    } = {
        'kt-': 'killstreak_tier',
        'u': 'particle',
        'w': 'wear',
        'pk': 'skin',
        'australium': 'australium',
        'uncraftable': 'craftable',
        'festive': 'festivized',
        'strange': 'strange',
        'n': 'craft_number',
        'c': 'crate_number',
        'td': 'target_defindex',
        'od': 'output_defindex',
        'oq': 'output_quality'
    };
    const pattern = /^([A-z\-]+)(\d+)?$/;
    const hash: ParseSKUAttributes = elements.reduce((prev: any, element: string) => {
        const match = element.match(pattern);
        
        if (match) {
            const [ , name, value] = match;
            const key = keyMaps[name];
            
            if (key) {
                // parse the value
                const parsed = (
                    isIntegerValue(key) ?
                        parseInt(value) :
                        true
                );
                
                prev[key] = parsed;
            }
        }
        
        return prev;
    }, {
        defindex,
        quality
    });
    
    hash.tradable = true;
    // this was originally "uncraftable"
    hash.craftable = !hash.craftable;
    
    if (hash.quality !== undefined && maps.qualityToName[hash.quality] !== undefined) {
        hash.quality_name = maps.qualityToName[hash.quality];
    }
    
    if (hash.killstreak_tier !== undefined && maps.killstreakTierToName[hash.killstreak_tier] !== undefined) {
        hash.killstreak_tier_name = maps.killstreakTierToName[hash.killstreak_tier];
    }
    
    if (hash.wear !== undefined && maps.wearToName[hash.wear] !== undefined) {
        hash.wear_name = maps.wearToName[hash.wear];
    }
    
    return hash;
}

export function hashToSKU(hash: ItemHash): string {
    const notNull = (value: any) => value !== null;
    
    return [
        hash.defindex,
        hash.quality,
        hash.particle ? `u${hash.particle}` : null,
        hash.australium ? 'australium': null,
        hash.festivized ? 'festive': null,
        hash.strange ? 'strange' : null,
        !hash.craftable ? 'uncraftable': null,
        hash.wear ? `w${hash.wear}` : null,
        hash.skin ? `pk${hash.skin}` : null,
        hash.killstreak_tier ? `kt-${hash.killstreak_tier}` : null,
        hash.craft_number ? `n${hash.craft_number}` : null,
        hash.crate_number ? `c${hash.crate_number}` : null,
        hash.target_defindex ? `td-${hash.target_defindex}` : null,
        hash.output_defindex ? `od-${hash.output_defindex}` : null,
        hash.output_quality ? `oq-${hash.output_quality}` : null
    ].filter(notNull).join(';');
}

export function skuToHash(sku: string, searchIndex: SearchIndex): ItemHash|null {
    const parsedHash = parseSKU(sku);
    
    if (parsedHash === null) {
        return null;
    }
    
    const item_name = searchIndex.getValue('items', 'defindex', 'item_name', parsedHash.defindex);
    const quality_name = searchIndex.getValue('qualities', 'value', 'name', parsedHash.quality);
    
    // these are both required
    if (item_name === undefined || quality_name === undefined) {
        return null;
    }
    
    const hash: ItemHash = {
        tradable: true,
        craftable: parsedHash.craftable,
        defindex: parsedHash.defindex,
        item_name,
        quality_name,
        quality: parsedHash.quality,
        australium: Boolean(parsedHash.australium),
        strange: Boolean(parsedHash.strange),
        festivized: false
    };
    
    if (parsedHash.festivized !== undefined) {
        hash.festivized = true;
    }
    
    if (parsedHash.wear !== undefined) {
        const wearNameMap: {
            [value: number]: string
        } = {
            1: 'Factory New',
            2: 'Minimal Wear',
            3: 'Field-Tested',
            4: 'Well-Worn',
            5: 'Battle Scarred',
        };
        
        if (wearNameMap[parsedHash.wear] !== undefined) {
            hash.wear_name = wearNameMap[parsedHash.wear];
        }
    }
    
    if (parsedHash.killstreak_tier !== undefined) {
        const killstreakTierNameMap: {
            [value: number]: string
        } = {
            1: 'Killstreak',
            2: 'Specialized Killstreak',
            3: 'Professional Killstreak',
        };
        
        if (killstreakTierNameMap[parsedHash.killstreak_tier] !== undefined) {
            hash.killstreak_tier_name = killstreakTierNameMap[parsedHash.killstreak_tier];
        }
    }
    
    if (parsedHash.target_defindex !== undefined) {
        const targetItemName = searchIndex.getValue('items', 'defindex', 'item_name', parsedHash.target_defindex);
        
        if (targetItemName !== undefined) {
            hash.target_item_name = targetItemName;
            hash.target_defindex = parsedHash.target_defindex;
        }
    }
    
    if (parsedHash.output_defindex !== undefined) {
        const outputItemName = searchIndex.getValue('items', 'defindex', 'item_name', parsedHash.output_defindex);
        
        if (outputItemName !== undefined) {
            hash.output_item_name = outputItemName;
            hash.output_defindex = parsedHash.output_defindex;
        }
    }
    
    if (parsedHash.output_quality !== undefined) {
        const outputQualityName = searchIndex.getValue('qualities', 'value', 'name', parsedHash.output_quality);
        
        if (outputQualityName !== undefined) {
            hash.output_quality_name = outputQualityName;
            hash.output_quality = parsedHash.output_quality;
        }
    }
    
    if (parsedHash.skin !== undefined) {
        const skinName = searchIndex.getValue('skins', 'value', 'name', parsedHash.skin);
        
        if (skinName !== undefined) {
            hash.skin_name = skinName;
            hash.skin = parsedHash.skin;
        }
    }
    
    if (parsedHash.craft_number !== undefined) {
        hash.craft_number = parsedHash.craft_number;
    }
    
    if (parsedHash.crate_number !== undefined) {
        hash.crate_number = parsedHash.crate_number;
    }
    
    return hash;
}
