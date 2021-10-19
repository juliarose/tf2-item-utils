import type { ItemHash } from '../types';
import SearchIndex from '../classes/SearchIndex';

function hashToStatsNameWithOutputs(hash: ItemHash): string {
    return [
        hash.festivized && 'Festivized',
        hash.killstreak_tier_name,
        hash.target_item_name,
        hash.output_item_name,
        hash.australium && 'Australium',
        hash.skin_name,
        hash.item_name,
        (
            hash.wear_name ?
                `(${hash.wear_name})` :
                null
        )
    ].filter(Boolean).join(' ');
}
    
function hashToSeriesNumberName(hash: ItemHash): string|null {
    if (!hash.series_number && !hash.crate_number) {
        return null;
    }
    
    return `Series #${hash.series_number || hash.crate_number}`;
}

function hashToQualityName(hash: ItemHash): string|null {
    // decorated weapons are formatted differently
    if (hash.quality === 15) {
        if (hash.particle !== undefined) {
            // unusual weapon
            return 'Unusual';
        } else if (hash.strange) {
            // strange weapon skin
            return 'Strange';
        } 
        
        return null;
    } else if (hash.quality === 6) {
        // do not display "Unique in names"
        return null;
    }
    
    return hash.quality_name;
}

function hashToProperName(hash: ItemHash, processor: SearchIndex): string|undefined {
    // must be unique
    if (hash.quality !== 6) {
        return;
    } else if (hash.killstreak_tier) {
        // no "The" in killstreak either
        return;
    } else if (hash.strange) {
        // strange uniques?
        return;
    } else if (hash.festivized) {
        // festive!
        return;
    }
    
    const properName = processor.getValue('items', 'defindex', 'proper_name', hash.defindex);
    
    // does not have a proper name
    if (!properName) {
        return;
    }
    
    // the
    return 'The';
}

export function hashToPriceindex(hash: ItemHash): string|undefined {
    // of course
    const priceindex = [
        // I don't know why, but kits will lead with the killstreak tier for kits
        hash.item_name === 'Kit' && hash.killstreak_tier,
        hash.output_defindex,
        hash.output_quality,
        hash.target_defindex,
        hash.crate_number,
        hash.particle
    ].filter(Boolean).join('-');
    
    if (priceindex.length === 0) {
        return undefined;
    }
    
    return priceindex;
}

export function hashToStatsName(hash: ItemHash): string {
    return [
        hash.festivized && 'Festivized',
        hash.killstreak_tier_name,
        hash.australium && 'Australium',
        hash.skin_name,
        hash.item_name,
        (
            hash.wear_name ?
                `(${hash.wear_name})` :
                null
        )
    ].filter(Boolean).join(' ');
}

export function hashToMarketName(hash: ItemHash, processor: SearchIndex): string {
    const properName = hashToProperName(hash, processor);
    const qualityName = hashToQualityName(hash);
    const statsName = hashToStatsNameWithOutputs(hash);
    
    return [
        properName,
        qualityName,
        statsName,
        // only add series number if this is not a case
        (
            !/ Case$/.test(hash.item_name) &&
            hashToSeriesNumberName(hash)
        )
    ].filter(Boolean).join(' ');
}

export function hashToBackpackName(hash: ItemHash, processor: SearchIndex): string {
    const statsName = hashToStatsNameWithOutputs(hash);
    
    return [
        !hash.craftable && 'Non-Craftable' ,
        hash.particle_name || hashToProperName(hash, processor) || hashToQualityName(hash),
        statsName
    ].filter(Boolean).join(' ');
}

export function hashToFullName(hash: ItemHash, processor: SearchIndex): string {
    const statsName = hashToStatsNameWithOutputs(hash);
    const seriesNumberName = hashToSeriesNumberName(hash);
    
    return [
        !hash.craftable && 'Non-Craftable' ,
        hash.particle_name || hashToProperName(hash, processor) || hashToQualityName(hash),
        statsName,
        seriesNumberName,
        (
            hash.craft_number ?
                `#${hash.craft_number}` :
                null
        )
    ].filter(Boolean).join(' ');
}
