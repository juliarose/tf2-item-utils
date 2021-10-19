import { Asset, ClassInfo, ClassInfoTag, ClassInfoDescription, DescriptionReducerFunction, ParsedItem } from '../types'; 
import { reSkinWeaponNames, reWears, reStrangePart } from './schema/regexp';
import * as maps from './schema/maps';
import * as utils from './utils';

/**
 * Converts array-like objects into arrays on classinfo response. This modifies the original object.
 * @param classinfo - Classinfo.
 * @returns {ClassInfo} Classinfo.
 */
export function fixClassInfo(classinfo: any): ClassInfo {
    [
        'actions',
        'market_actions',
        'tags',
        'descriptions',
        'fraudwarnings'
    ].forEach((key: any) => {
        if (classinfo[key] && !Array.isArray(classinfo[key])) {
            classinfo[key] = Object.values(classinfo[key]);
        }
        
        if (typeof classinfo[key] === 'string') {
            classinfo[key] = [];
        }
    });
    
    return classinfo;
}

/**
 * Gets the recipe ingrdients and counts for an item.
 * @param item - Item.
 * @returns Recipe.
 *
 * @example
 * getRecipe(item);
 * ```ts
 * {
 *     'Unique Killstreak Item': 1,
 *     'Battle-Worn Robot Money Furnace': 7,
 *     'Reinforced Robot Humor Suppression Pump': 1
 * }
 * ```
 */
export function getRecipe(item: ClassInfo|Asset): { [ingredient: string]: number } {
    if (item.descriptions === undefined) {
        return {};
    }
    
    const descriptions: ClassInfoDescription[] = utils.toArray(item.descriptions);
    const recipe: { [ingredient: string]: number } = {};
    
    descriptions
        .forEach((description: ClassInfoDescription) => {
            if (!description.color || description.color.toLowerCase() !== '8b8989') {
                // continue
                return;
            }
            
            const recipeMatch = description.value.match(/^([\w\s\-]+)\sx\s(\d+)$/);
            
            if (recipeMatch) {
                const name: string = recipeMatch[1];
                const amountStr: string = recipeMatch[2];
                
                // add up all the ingredients
                recipe[name] = (recipe[name] || 0) + parseInt(amountStr);
            }
        });
    
    return recipe;
}

/**
 * Determines if the item is a weapon or not.
 * @param item - Item.
 * @returns Is it a weapon?
 */
export function isWeapon(item: ClassInfo|Asset): boolean {
    if (item.tags === undefined) {
        return false;
    }
    
    const tags: ClassInfoTag[] = utils.toArray(item.tags);
    
    if (tags.length === 0) {
        return false;
    }
    
    const tag = tags.find((tag: ClassInfoTag) => tag.category === 'Type');
    
    return Boolean(
        tag &&
        tagIsWeapon(item, tag)
    );
}

export function tagIsWeapon(item: ClassInfo|Asset, tag: ClassInfoTag): boolean {
    const isWeaponMap: {
        [name: string]: true
    } = {
        'Primary weapon': true,
        'Secondary weapon': true,
        'Melee weapon': true,
        'Primary PDA': true,
        'Secondary PDA': true,
        'Building': true
    };

    return Boolean(
        isWeaponMap[tag.localized_tag_name || tag.name] &&
        // slot tokens have weapon as their type category but are not weapons
        !/^(Class|Slot) Token \-/.test(item.market_hash_name)
    );
}

export function parseAsset(item: Asset, descriptionReducer?: DescriptionReducerFunction): ParsedItem {
    return parseClassInfo(item, descriptionReducer);
}

export function parseClassInfo(item: ClassInfo|Asset, descriptionReducer?: DescriptionReducerFunction): ParsedItem {
    function descriptionMatchesPattern(pattern: RegExp) {
        return function(description: ClassInfoDescription) {
            return description.value.match(pattern);
        };
    }

    function descriptionIsColor(color: string) {
        return function(descriptionColor: string) {
            return descriptionColor === color;
        };
    }
    
    function descriptionHasPattern(pattern: RegExp) {
        return function(description: ClassInfoDescription) {
            return pattern.test(description.value);
        };
    }
    
    const nameColor = item.name_color ? item.name_color.toLowerCase() : '';
    const itemIsStrange = nameColor === 'cf6a32';
    let hash: any = {
        craftable: true
    };
    
    // could be a number or string
    if (item.tradable == 1) {
        hash.tradable = true;
    }
    
    if (!itemIsStrange && /^Strange /.test(item.market_hash_name)) {
        hash.strange = true;
    }
    
    if (/^Strange .*Australium .+/.test(item.market_hash_name)) {
        hash.australium = true;
    }
    
    if (/Festivized /.test(item.market_hash_name)) {
        hash.festivized = true;
    }
    
    if (item.app_data !== undefined) {
        if (item.app_data.def_index !== undefined) {
            hash.defindex = parseInt(item.app_data.def_index);
        }
        
        if (item.app_data.quality !== undefined) {
            hash.quality = parseInt(item.app_data.quality);
        }
    }
    
    // remove the quality name
    const wearMatch = item.market_hash_name.match(reWears);
    
    if (wearMatch) {
        hash.wear_name = wearMatch[1];
        
        if (maps.wear[hash.wear_name] !== undefined) {
            hash.wear = maps.wear[hash.wear_name];
        }
    }
    
    const killstreakTierMatch = item.market_hash_name.match(/(Professional Killstreak|Specialized Killstreak|Killstreak) /);
    
    if (killstreakTierMatch) {
        hash.killstreak_tier_name = killstreakTierMatch[1];
        
        if (maps.killstreakTier[hash.killstreak_tier_name] !== undefined) {
            hash.killstreak_tier = maps.killstreakTier[hash.killstreak_tier_name];
        }
    }
    
    let itemIsWeapon: undefined|boolean;
    
    if (item.tags !== undefined) {
        const tags: ClassInfoTag[] = utils.toArray(item.tags);
        
        tags
            .forEach((tag: ClassInfoTag) => {
                switch (tag.category) {
                    case 'Quality': {
                        if (hash.quality_name === undefined) {
                            hash.quality_name = tag.localized_tag_name || tag.name;
                            
                            if (maps.quality[hash.quality_name] !== undefined) {
                                hash.quality = maps.quality[hash.quality_name];
                            }
                        }
                    } break;
                    case 'Collection': {
                        hash.collection_name = tag.localized_tag_name || tag.name;
                    } break;
                    case 'Rarity': {
                        hash.grade_name = tag.localized_tag_name || tag.name;
                    } break;
                    case 'Type': {
                        hash.type_name = tag.localized_tag_name || tag.name;
                        
                        itemIsWeapon = tagIsWeapon(item, tag);
                    } break;
                }
            });
    }
    
    // still no quality??
    if (hash.quality === undefined && nameColor.length > 0) {
        const marketColorQualityMap: {
            [marketColor: string]: number
        } = {
            '4d7455': 1,
            '476291': 3,
            '8650ac': 5,
            '7d6d00': 6,
            '70b04a': 9,
            'cf6a32': 11,
            '38f3ab': 13,
            'aa0000': 14,
            'fafafa': 15
        };
        
        if (marketColorQualityMap[nameColor] !== undefined) {
            hash.quality = marketColorQualityMap[nameColor];
        }
    }
    
    if (hash.quality !== undefined && maps.qualityToName[hash.quality] !== undefined) {
        hash.quality_name = maps.qualityToName[hash.quality];
    }
    
    if (item.descriptions !== undefined) {
        // the description color is a bright yellow
        const isUnusualEffectColor = descriptionIsColor('ffd700');
        const isSpellColor = descriptionIsColor('7EA9d1');
        const isNeutralColor = descriptionIsColor('756b5e');
        const isBlueColor = descriptionIsColor('7ea9d1');
        // const isOrangeColor = descriptionIsColor('cf6a32');
        // matches the effect pattern e.g. "Unusual Effect: Purple Energy"
        const matchesParticleName = descriptionMatchesPattern(/^\u2605 Unusual Effect: (.+)$/);
        const matchesHalloweenSpellName = descriptionMatchesPattern(/^Halloween: (.*)\(spell only active during event\)/);
        const matchesSkinName = descriptionMatchesPattern(/^(✔|★)\s+(?!Unusual Effect:)/);
        const matchesScoreType = descriptionMatchesPattern(/^\((.*): \d+\)$/);
        const matchesPaintColor = descriptionMatchesPattern(/^Paint Color: (.+)$/);
        const matchesSheenOrKillstreaker = descriptionMatchesPattern(/^(Sheen|Killstreaker): (.+)$/);
        const matchesCrateSeriesNumber = descriptionMatchesPattern(/^Crate Series #(.+)$/);
        const isUncraftable = descriptionHasPattern(/^\( Not (Tradable,? ?)?(Marketable,? ?)?Usable in Crafting(, or Gift Wrappable)? \)$/);
        const descriptions: ClassInfoDescription[] = utils.toArray(item.descriptions);
        // const isStatClock = descriptionHasPattern(/^Strange Stat Clock Attached/);
        // for strange parts
        let reducedDescriptions = {};
        
        descriptions
            .forEach((description: ClassInfoDescription) => {
                const descriptionColor = (
                    description.color &&
                    description.color.toLowerCase()
                ) || undefined;
                
                // don't check quality on unique items...
                if (hash.quality !== 6 && hash.particle_name === undefined && isUnusualEffectColor(descriptionColor)) {
                    const particleNameMatch = matchesParticleName(description);
                    
                    if (particleNameMatch) {
                        hash.particle_name = particleNameMatch[1];
                    }
                } else if (isSpellColor(descriptionColor)) {
                    const spellNameMatch = matchesHalloweenSpellName(description);
                    
                    if (spellNameMatch) {
                        const spellName = spellNameMatch[1].trim();
                        
                        if (hash.spell_names === undefined) {
                            hash.spell_names = [];
                        }
                        
                        hash.spell_names.push(spellName);
                    }
                } else if (isNeutralColor(descriptionColor)) {
                    const paintColorMatch = matchesPaintColor(description);
                    
                    if (paintColorMatch) {
                        const paintName = paintColorMatch[1].trim();
                        
                        hash.paint_name = paintName;
                    }
                    
                    const scoreTypeMatch = matchesScoreType(description);
                    
                    if (scoreTypeMatch) {
                        const scoreType = scoreTypeMatch[1].replace(/ \(only .*\)/, '').trim();
                        const canAddScoreType = !(itemIsWeapon && scoreType === 'Kills');
                        
                        if (canAddScoreType && reStrangePart.test(scoreType)) {
                            if (hash.strange_part_names === undefined) {
                                hash.strange_part_names = [];
                            }
                            
                            hash.strange_part_names.push(scoreType);
                        }
                    }
                } else if (isBlueColor(descriptionColor)) {
                    // these are grouped so we don't have to match against multiple patterns (performance)
                    const sheenOrKillstreakerMatch = matchesSheenOrKillstreaker(description);
                    
                    if (sheenOrKillstreakerMatch) {
                        const isSheen = sheenOrKillstreakerMatch[1] === 'Sheen';
                        const value = sheenOrKillstreakerMatch[2].trim();
                        
                        if (isSheen) {
                            hash.sheen_name = value;
                        } else {
                            hash.killstreaker_name = value;
                        }
                    } else {
                        const crateSeriesMatch = matchesCrateSeriesNumber(description);
                        
                        if (crateSeriesMatch) {
                            const seriesNumber = parseInt(crateSeriesMatch[1]);
                            
                            // we can assign both the crate number and series number
                            hash.crate_number = seriesNumber;
                            hash.series_number = seriesNumber;
                        }
                    }
                } else if (descriptionColor === undefined && isUncraftable(description)) {
                    delete hash.craftable;
                } else if (hash.wear_name !== undefined) {
                    const skinNameMatch = matchesSkinName(description);
                    
                    if (skinNameMatch) {
                        hash.skin_name = description.value
                            .replace(/(★|✔|War Paint|\s{2,})/g, '')
                            .replace(reSkinWeaponNames, '')
                            .trim();
                    }
                }
                
                if (typeof descriptionReducer === 'function') {
                    hash = descriptionReducer(hash, description);
                    
                    // some bad data was returned...
                    if (typeof hash !== 'object' || hash === null) {
                        throw new Error('Hashed returned from descriptionReducer is not an object');
                    }
                }
            });
    }
    
    return hash;
}
