import * as SKU from './sku';

test('converts hash to sku', () => {
    const sku = SKU.hashToSKU({
        tradable: true,
        craftable: true,
        particle_name: 'Purple Energy',
        particle: 10,
        defindex: 53,
        item_name: 'Trophy Belt',
        quality_name: 'Unusual',
        quality: 5
    });
    
    expect(sku).toBe('53;5;u10');
});

test('parses SKU', () => {
    const hash = SKU.parseSKU('53;5;u10');
    
    expect(hash).toStrictEqual({
        tradable: true,
        craftable: true,
        particle: 10,
        defindex: 53,
        quality: 5,
        quality_name: 'Unusual'
    });
});
