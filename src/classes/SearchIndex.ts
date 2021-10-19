import type { Schema, SchemaTableName } from '../types';
import type { PatternsMap } from '../types';
import { escapeRegExp } from '../lib/utils';
import { reQualities, reKillstreakTiers, reWears } from '../lib/schema/regexp';

// generate regexp patterns for schema values
function createSearchPatterns(schema: Schema): PatternsMap {
    return [
        'particles',
        'skins'
    ].reduce((patterns: { [tableName: string]: RegExp }, tableName: string) => {
        // get the records for this table from the index
        const records: any[] = schema[tableName as SchemaTableName] || [];
        // map names
        const names = records
            // get the value
            .map((record: any) => record.name)
            // remove empty values
            .filter(Boolean)
            // sort from longest to shortest
            .sort((a: string, b: string) => b.length - a.length)
            // escape string for regular expression
            .map(escapeRegExp)
            // join with pipe
            .join('|');
        
        // wrap this as a capture group
        // must be at front of string
        patterns[tableName] = new RegExp(`^(${names}) `);
        
        return patterns;
    }, {
        qualities: reQualities,
        killstreak_tiers: reKillstreakTiers,
        wears: reWears
    });
}

type TableHash = {
    [key: string]: any,
}

// creates an index for records based on key/value
// @example
// indexRecords([{ name: 'Cat', id: 1 }], 'name', 'id');
// { 'Cat': 1 }
function indexRecords(records: any[], keyColumn: string): TableHash {
    return records
        .reduce((index: TableHash, record: any) => {
            const key = record[keyColumn];

            if (key !== undefined) {
                index[key] = record;
            }

            return index;
        }, {});
}

type KeyIndex = {
    [lowercaseKey: string]: string;
}

// creates an index for case-insensitive keys
// e.g. { 'purple energy': 'Purple Energy' ... }
function indexKeys(records: any[], keyColumn: string): KeyIndex {
    return records
        .reduce((index: KeyIndex, record: any) => {
            const key = record[keyColumn];

            if (typeof key === 'string') {
                index[key.toLowerCase()] = key;
            }

            return index;
        }, {});
}

// creates search index for records
// this offers a quick way to get a value from the schema
// for example to get the name for an item using its defindex
// getValue('items', 'defindex', 'item_name', 34);
// will return the item name for an item with the defindex of 34
export default class SearchIndex {
    
    private schema: Schema;
    private index: {
        [key: string]: TableHash
    };
    private keyIndex: {
        [key: string]: KeyIndex
    };
    patterns: PatternsMap;
    
    constructor(schema: Schema) {
        this.updateSchema(schema);
    }
    
    getValue(tableName: SchemaTableName, keyColumn: string, valueColumn: string, value: string|number, ignoreCase?: boolean): any {
        // key/value index key
        const key = [
            tableName,
            keyColumn
        ].join(':');
    
        if (ignoreCase && typeof value === 'string') {
            if (this.keyIndex[key] === undefined) {
                // generate index for case-insensitive keys
                this.keyIndex[key] = indexKeys(this.schema[tableName], keyColumn);
            }
    
            // take the value from the case-insensitive key index
            value = this.keyIndex[key][value.toLowerCase()];
        }
    
        // index does not exist 
        if (this.index[key] === undefined) {
            // generate index for key/value pair
            // the first-time query will be expensive,
            // but every thereafter read will be extremely fast (taking from a hash of key/value pairs)
            this.index[key] = indexRecords(this.schema[tableName], keyColumn);
        }
        
        // return the value (if it exists)
        return (
            this.index[key][value] &&
            this.index[key][value][valueColumn]
        );
    }
    
    // gets the case-sensitive key for a given value
    // e.g. 'purple energy' will return 'Purple Energy'
    getKey(tableName: SchemaTableName, keyColumn: string, value: string): string|undefined {
        if (typeof value !== 'string') {
            return value;
        }
    
        const key = [
            tableName,
            keyColumn
        ].join(':');
    
        if (this.keyIndex[key] === undefined) {
            // generate index for case-insensitive keys
            // e.g. { 'purple energy': 'Purple Energy' ... }
            this.keyIndex[key] = indexKeys(this.schema[tableName], keyColumn);
        }
    
        return this.keyIndex[key][value.toLowerCase()];
    }
    
    clearCache(): void {
        this.index = {};
        this.keyIndex = {};
    }
    
    updateSchema(schema: Schema): void {
        this.schema = schema;
        this.patterns = createSearchPatterns(schema);
        this.clearCache();
    }
}
