
import type { Schema, SchemaInput, ItemHash, Asset, ClassInfo, ClassInfoDescription, SchemaTableName, ParseSKUAttributes, DescriptionReducerFunction, ParsedItem } from '../types';
import SearchIndex from './SearchIndex';
import { processItemName } from '../lib/from.string';
import { parseAsset, parseClassInfo } from '../lib/econitem';
import * as conversions from '../lib/conversions';
import * as SKU from '../lib/sku';
import * as fillers from '../lib/schema/fillers';
import { parsedHashToItemHash } from './helpers/itemparser';

/** 
 * Parses items in various formats.
 */
export default class ItemParser {
    
    private searchIndex: SearchIndex;
    
    /**
     * Parses items based on the provided schema.
     * @constructor
     * @param schemaInput - Object containing schema tables.
     */
    constructor(schemaInput: SchemaInput) {
        this.updateSchema(schemaInput);
    }
    
    /**
     * Attempts to hash attributes from a name representing an item.
     * @param name - Name.
     * @returns Hashed item. Will be null if parse was unsuccessful (could not reliably determine a defindex/item name).
     *
     * @example
     * ```
     * parser.nameToHash('Purple Energy Trophy Belt');
     * // {
     * //     tradable: true,
     * //     craftable: true,
     * //     particle_name: 'Purple Energy',
     * //     particle: 10,
     * //     defindex: 53,
     * //     item_name: 'Trophy Belt',
     * //     quality_name: 'Unusual',
     * //     quality: 5
     * // }
     * ```
     */
    nameToHash(name: string): ItemHash|null {
        return processItemName(name, {
            ignoreCase: false,
            searchIndex: this.searchIndex
        });
    }
    
    /**
     * Attempts to hash attributes from a name representing an item. Case insensitive.
     * @param name - Name.
     * @returns Hashed item. Will be null if parse was unsuccessful (could not reliably determine a defindex/item name).
     *
     * @example
     * ```
     * parser.nameToHash('purple energy trophy belt');
     * // {
     * //     tradable: true,
     * //     craftable: true,
     * //     particle_name: 'Purple Energy',
     * //     particle: 10,
     * //     defindex: 53,
     * //     item_name: 'Trophy Belt',
     * //     quality_name: 'Unusual',
     * //     quality: 5
     * // }
     * ```
     */
    nameToHashIgnoreCase(name: string): ItemHash|null {
        return processItemName(name, {
            ignoreCase: true,
            searchIndex: this.searchIndex
        });
    }
    
    /** Collects attributes from an asset object.
     * @param asset - Asset.
     * @param descriptionReducer - Function called for reducing values from descriptions. Any values set here will override any values returned from the parse result.
     * @returns Parsed results.
     */
    parseAsset(asset: Asset, descriptionReducer?: DescriptionReducerFunction): ParsedItem {
        return parseAsset(asset, descriptionReducer);
    }
    
    /** Collects attributes from a classinfo object.
     * @param classinfo - Classinfo.
     * @param descriptionReducer - Function called for reducing values from descriptions. Any values set here will override any values returned from the parse result.
     * @returns Parsed results.
     */
    parseClassInfo(classinfo: ClassInfo, descriptionReducer?: DescriptionReducerFunction): ParsedItem {
        return parseClassInfo(classinfo, descriptionReducer);
    }
    
    /**
     * Attempts to hash an asset object.
     *
     * @remarks
     * Since an asset does not include app_data, this relies on extracting the defindex value from the market hash name of the item.
     * @param asset - Asset object.
     * @param descriptionReducer - Function called for reducing values from descriptions. Any values set here will override any values returned from the parse result.
     * @returns Hashed item. Will be null if parse was unsuccessful (could not reliably determine a defindex/item name).
     */
    assetToHash(asset: Asset, descriptionReducer?: DescriptionReducerFunction): ItemHash|null {
        const attributes = this.parseAsset(asset, descriptionReducer);
        
        return parsedHashToItemHash(attributes, asset.market_hash_name, this.searchIndex, false);
    }
    
    /**
     * Attempts to hash a classinfo object.
     * @param classInfo - Classinfo object.
     * @param descriptionReducer - Function called for reducing values from descriptions. Any values set here will override any values returned from the parse result.
     * @returns Hashed item. Will be null if parse was unsuccessful (could not reliably determine a defindex/item name).
     */
    classInfoToHash(classInfo: ClassInfo, descriptionReducer?: DescriptionReducerFunction): ItemHash|null {
        const attributes = this.parseClassInfo(classInfo, descriptionReducer);
        
        return parsedHashToItemHash(attributes, classInfo.market_hash_name, this.searchIndex, true);
    }
    
    /**
     * Converts a hash to a SKU.
     * @param hash - Item hash.
     * @returns SKU.
     *
     * @example
     * ```
     * parser.hashToSKU({
     *     tradable: true,
     *     craftable: true,
     *     particle_name: 'Purple Energy',
     *     particle: 10,
     *     defindex: 53,
     *     item_name: 'Trophy Belt',
     *     quality_name: 'Unusual',
     *     quality: 5
     * });
     * // '53;5;u10'
     * ```
     */
    hashToSKU(hash: ItemHash): string {
        return SKU.hashToSKU(hash);
    }
    
    /**
     * Attempts to parse a SKU into attributes.
     * @param sku - SKU.
     * @returns Parsed attributes. Will be null if name was parsed unsuccessfully (invalid SKU).
     *
     * @example
     * ```
     * parser.parseSKU('53;5;u10');
     * // {
     * //     defindex: 53,
     * //     quality: 5,
     * //     particle: 10,
     * //     craftable: true
     * // }
     * ```
     */
    parseSKU(sku: string): ParseSKUAttributes|null {
        return SKU.parseSKU(sku);
    }
    
    /**
     * Attempts to parse a SKU into attributes.
     * @param sku - SKU.
     * @returns Hash item. Will be null if parse was unsuccessful.
     *
     * @example
     * ```
     * parser.skuToHash('53;5;u10');
     * // {
     * //     tradable: true,
     * //     craftable: true,
     * //     particle_name: 'Purple Energy',
     * //     particle: 10,
     * //     defindex: 53,
     * //     item_name: 'Trophy Belt',
     * //     quality_name: 'Unusual',
     * //     quality: 5
     * // }
     * ```
     */
    skuToHash(sku: string): ItemHash|null {
        return SKU.skuToHash(sku, this.searchIndex);
    }
    
    /**
     * Converts a hash to its stats name. Includes festivized, killstreak tier, skin name, australium, and wear name  where available.
     * @param hash - Item hash.
     * @returns Market hash name.
     *
     * @example
     * ```
     * parser.hashToStatsName({
     *     tradable: true,
     *     craftable: true,
     *     particle_name: 'Purple Energy',
     *     particle: 10,
     *     defindex: 53,
     *     item_name: 'Trophy Belt',
     *     quality_name: 'Unusual',
     *     quality: 5
     * });
     * // 'Trophy Belt'
     * ```
     */
    hashToStatsName(hash: ItemHash): string {
        return conversions.hashToStatsName(hash);
    }
    
    /**
     * Converts a hash to its backpack name. This includes the stats name, the quality, effect name, craftability, and proper name where available.
     * @param hash - Item hash.
     * @returns Market hash name.
     *
     * @example
     * ```
     * parser.hashToBackpackName({
     *     tradable: true,
     *     craftable: true,
     *     particle_name: 'Purple Energy',
     *     particle: 10,
     *     defindex: 53,
     *     item_name: 'Trophy Belt',
     *     quality_name: 'Unusual',
     *     quality: 5
     * });
     * // 'Purple Energy Trophy Belt'
     * ```
     */
    hashToBackpackName(hash: ItemHash): string {
        return conversions.hashToBackpackName(hash, this.searchIndex);
    }
    
    /**
     * Converts a hash to its market hash name.
     * @param hash - Item hash.
     * @returns Market hash name.
     *
     * @example
     * ```
     * parser.hashToMarketName({
     *     tradable: true,
     *     craftable: true,
     *     particle_name: 'Purple Energy',
     *     particle: 10,
     *     defindex: 53,
     *     item_name: 'Trophy Belt',
     *     quality_name: 'Unusual',
     *     quality: 5
     * });
     * // 'Unusual Trophy Belt'
     * ```
     */
    hashToMarketName(hash: ItemHash): string {
        return conversions.hashToMarketName(hash, this.searchIndex);
    }
    
    /**
     * Converts a hash to a full name.
     * @param hash - Item hash.
     * @returns Full name.
     *
     * @example
     * ```
     * parser.hashToFullName({
     *     tradable: true,
     *     craftable: true,
     *     particle_name: 'Purple Energy',
     *     particle: 10,
     *     defindex: 53,
     *     item_name: 'Trophy Belt',
     *     quality_name: 'Unusual',
     *     quality: 5
     * });
     * // 'Purple Energy Trophy Belt'
     * ```
     */
    hashToFullName(hash: ItemHash): string {
        return conversions.hashToFullName(hash, this.searchIndex);
    }
    
    /**
     * Updates the schema.
     * @param schemaInput - Object containing schema tables.
     */ 
    updateSchema(schemaInput: SchemaInput): void {
        // copy references - this does not guarantee that data inside will stay the same
        // if any data from _recordsIndex changes outside of this scope it will be reflected here
        // since the data is only being referenced and not copied
        const schema = {
            ...fillers,
            // any keys from _recordsIndex will be preferred
            ...schemaInput,
        } as Schema;
        
        this.searchIndex = new SearchIndex(schema);
    }
    
    /**
     * Clears the search index cache.
     */
    clearCache(): void {
        this.searchIndex.clearCache();
    }
    
    /**
     * Gets a value from the provided schema.
     *
     * @remarks
     * Under the hood, this creates a hashmap to search against for speedy future searches.
     *
     * Its structure will appear like:
     * ```js
     * {
     *     'items:item_name': {
     *         'Trophy Belt': {
     *             item_name: 'Trophy Belt',
     *             defindex: 52
     *         }
     *     }
     * }
     * ```
     * The inner-most object is a reference to an object, rather than a copy.
     * 
     * If you ever need to clear this (free memory), call `parser.clearCache()`.
     * @param tableName - Name of table to get value from.
     * @param keyColumn - Column we have the value for.
     * @param valueColumn - Column containing value we want from object in schema.
     * @param value - Matching value of keyColumn for record.
     * @param [ignoreCase] - Whether to ignore case or not.
     *
     * @example
     * ```
     * parser.getValue('items', 'item_name', 'defindex', 'Trophy Belt');
     * // 53
     * ```
     */
    getValue(tableName: SchemaTableName, keyColumn: string, valueColumn: string, value: string|number, ignoreCase?: boolean): any {
        return this.searchIndex.getValue(tableName, keyColumn, valueColumn, value, ignoreCase);
    }
    
    /**
     * Converts a hash to a SKU.
     * @param hash - Item hash.
     * @returns SKU.
     *
     * @example
     * ```
     * ItemParser.hashToSKU({
     *     tradable: true,
     *     craftable: true,
     *     particle_name: 'Purple Energy',
     *     particle: 10,
     *     defindex: 53,
     *     item_name: 'Trophy Belt',
     *     quality_name: 'Unusual',
     *     quality: 5
     * });
     * // '53;5;u10'
     * ```
     */
    static hashToSKU(hash: ItemHash): string {
        return SKU.hashToSKU(hash);
    }
    
    /**
     * Attempts to parse a SKU into attributes.
     * @param sku - SKU.
     * @returns Parsed attributes. Will be null if parse was unsuccessful (invalid SKU).
     *
     * @example
     * ```
     * ItemParser.parseSKU('53;5;u10');
     * // {
     * //     defindex: 53,
     * //     quality: 5,
     * //     particle: 10,
     * //     craftable: true
     * // }
     * ```
     */
    static parseSKU(sku: string): ParseSKUAttributes|null {
        return SKU.parseSKU(sku);
    }
    
    /** Collects attributes from an asset object.
     * @param asset - Asset.
     * @param descriptionReducer - Function called for reducing values from descriptions. Any values set here will override any values returned from the main function.
     * @returns Parsed results.
     */
    static parseAsset(asset: Asset, descriptionReducer?: DescriptionReducerFunction): ParsedItem {
        return parseAsset(asset, descriptionReducer);
    }
    
    /** Collects attributes from a classinfo object.
     * @param classinfo - Classinfo.
     * @param descriptionReducer - Function called for reducing values from descriptions. Any values set here will override any values returned from the main function.
     * @returns Parsed results.
     */
    static parseClassInfo(classinfo: ClassInfo, descriptionReducer?: DescriptionReducerFunction): ParsedItem {
        return parseClassInfo(classinfo, descriptionReducer);
    }
}
