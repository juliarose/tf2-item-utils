import { parseAsset, parseClassInfo } from './econitem';
import ItemParser from '../classes/ItemParser';
import { ClassInfoDescription } from '../types';

const classInfos = {
    jsons: {
        'Unusual Stout Shako': require('../../tests/data/classinfo/Unusual Stout Shako.json'),
        'Specialized Killstreak Eyelander Kit Fabricator': require('../../tests/data/classinfo/Specialized Killstreak Eyelander Kit Fabricator.json'),
    },
    jsDocs: {
        'Unusual Trophy Belt': require('../../tests/data/classinfo/Unusual Trophy Belt.js'),
    }
};
const assets = {
    jsDocs: {
        'Unusual Trophy Belt': require('../../tests/data/asset/Unusual Trophy Belt.js'),
    }
};
const itemParser = new ItemParser({
    items: [
        {
            item_name: 'Stout Shako',
            defindex: 251,
            proper_name: false
        },
        {
            item_name: 'Eyelander',
            defindex: 132,
            proper_name: true
        },
        {
            item_name: 'Trophy Belt',
            defindex: 53,
            proper_name: true
        },
        {
            item_name: 'Fabricator',
            defindex: 20002,
            proper_name: false
        },
        {
            item_name: 'Kit',
            defindex: 6523,
            proper_name: false
        },
    ],
    particles: [
        {
            name: 'Circling TF Logo',
            value: 251
        },
        {
            name: 'Purple Energy',
            value: 10
        }
    ]
});

test('extracts particle name from classinfo', () => {
    const hash = parseClassInfo(classInfos.jsons['Unusual Stout Shako']);
    
    expect(hash.particle_name).toBe('Circling TF Logo');
});

test('extracts quality from classinfo', () => {
    const hash = parseClassInfo(classInfos.jsons['Unusual Stout Shako']);
    
    expect(hash.quality).toBe(5);
});

test('extracts killstreak tier from classinfo', () => {
    const hash = parseClassInfo(classInfos.jsons['Specialized Killstreak Eyelander Kit Fabricator']);
    
    expect(hash.killstreak_tier).toBe(2);
});

test('extracts particle from classinfo', () => {
    const classInfo = classInfos.jsons['Unusual Stout Shako'];
    const hash = itemParser.classInfoToHash(classInfo);
    
    expect(hash.particle).toBe(251);
});

test('extracts defindex from classinfo', () => {
    const classInfo = classInfos.jsons['Unusual Stout Shako'];
    const hash = itemParser.classInfoToHash(classInfo);
    
    expect(hash.defindex).toBe(251);
});

test('extracts target item name from classinfo', () => {
    const classInfo = classInfos.jsons['Specialized Killstreak Eyelander Kit Fabricator'];
    const hash = itemParser.classInfoToHash(classInfo);
    
    expect(hash.target_item_name).toBe('Eyelander');
});

test('extracts paint name from classinfo', () => {
    const classInfo = classInfos.jsDocs['Unusual Trophy Belt'];
    const hash = itemParser.classInfoToHash(classInfo);
    
    expect(hash.paint_name).toBe('A Distinctive Lack of Hue');
});

test('extracts particle name from asset', () => {
    const asset = assets.jsDocs['Unusual Trophy Belt'];
    const hash = parseAsset(asset);
    
    expect(hash.particle_name).toBe('Purple Energy');
});

test('extracts defindex from asset', () => {
    const asset = assets.jsDocs['Unusual Trophy Belt'];
    const hash = itemParser.assetToHash(asset);
    
    expect(hash.defindex).toBe(53);
});

test('extracts custom attribute from asset', () => {
    const asset = assets.jsDocs['Unusual Trophy Belt'];
    const hash = itemParser.assetToHash(asset, (hash: any, description: ClassInfoDescription) => {
        if (!!description.color) {
            if (hash.colored_descriptions === undefined) {
                hash.colored_descriptions = 0;
            }
            
            hash.colored_descriptions++;
        }
        
        return hash;
    });
    
    expect(hash.colored_descriptions).toBe(2);
});
