import { processItemName } from './from.string';
import ItemParser from '../classes/ItemParser';

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

test('extracts particle name', () => {
    const hash = itemParser.nameToHash('Purple Energy Trophy Belt');
    
    expect(hash.particle_name).toBe('Purple Energy');
});

test('extracts item name', () => {
    const hash = itemParser.nameToHash('Purple Energy Trophy Belt');
    
    expect(hash.item_name).toBe('Trophy Belt');
});

test('extracts quality name', () => {
    const hash = itemParser.nameToHash('Purple Energy Trophy Belt');
    
    expect(hash.quality_name).toBe('Unusual');
});
