# Class: ItemParser

Parses items in various formats.

## Constructors

### constructor

• **new ItemParser**(`schemaInput`)

Parses items based on the provided schema.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `schemaInput` | [`SchemaInput`](../modules.md#schemainput) | Object containing schema tables. |

#### Defined in

classes/ItemParser.ts:23

## Methods

### assetToHash

▸ **assetToHash**(`asset`, `descriptionReducer?`): [`ItemHash`](../modules.md#itemhash)

Attempts to hash an asset object.

**`remarks`**
Since an asset does not include app_data, this relies on extracting the defindex value from the market hash name of the item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `asset` | [`Asset`](../modules.md#asset) | Asset object. |
| `descriptionReducer?` | [`DescriptionReducerFunction`](../modules.md#descriptionreducerfunction) | Function called for reducing values from descriptions. Any values set here will override any values returned from the parse result. |

#### Returns

[`ItemHash`](../modules.md#itemhash)

Hashed item. Will be null if parse was unsuccessful (could not reliably determine a defindex/item name).

#### Defined in

classes/ItemParser.ts:108

___

### classInfoToHash

▸ **classInfoToHash**(`classInfo`, `descriptionReducer?`): [`ItemHash`](../modules.md#itemhash)

Attempts to hash a classinfo object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `classInfo` | [`ClassInfo`](../modules.md#classinfo) | Classinfo object. |
| `descriptionReducer?` | [`DescriptionReducerFunction`](../modules.md#descriptionreducerfunction) | Function called for reducing values from descriptions. Any values set here will override any values returned from the parse result. |

#### Returns

[`ItemHash`](../modules.md#itemhash)

Hashed item. Will be null if parse was unsuccessful (could not reliably determine a defindex/item name).

#### Defined in

classes/ItemParser.ts:120

___

### clearCache

▸ **clearCache**(): `void`

Clears the search index cache.

#### Returns

`void`

#### Defined in

classes/ItemParser.ts:310

___

### getValue

▸ **getValue**(`tableName`, `keyColumn`, `valueColumn`, `value`, `ignoreCase?`): `any`

Gets a value from the provided schema.

**`remarks`**
Under the hood, this creates a hashmap to search against for speedy future searches.

Its structure will appear like:
```js
{
    'items:item_name': {
        'Trophy Belt': {
            item_name: 'Trophy Belt',
            defindex: 52
        }
    }
}
```
The inner-most object is a reference to an object, rather than a copy.

If you ever need to clear this (free memory), call `parser.clearCache()`.

**`example`**
```
parser.getValue('items', 'item_name', 'defindex', 'Trophy Belt');
// 53
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tableName` | [`SchemaTableName`](../modules.md#schematablename) | Name of table to get value from. |
| `keyColumn` | `string` | Column we have the value for. |
| `valueColumn` | `string` | Column containing value we want from object in schema. |
| `value` | `string` \| `number` | Matching value of keyColumn for record. |
| `ignoreCase?` | `boolean` | - |

#### Returns

`any`

#### Defined in

classes/ItemParser.ts:346

___

### hashToBackpackName

▸ **hashToBackpackName**(`hash`): `string`

Converts a hash to its backpack name. This includes the stats name, the quality, effect name, craftability, and proper name where available.

**`example`**
```
parser.hashToBackpackName({
    tradable: true,
    craftable: true,
    particle_name: 'Purple Energy',
    particle: 10,
    defindex: 53,
    item_name: 'Trophy Belt',
    quality_name: 'Unusual',
    quality: 5
});
// 'Purple Energy Trophy Belt'
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hash` | [`ItemHash`](../modules.md#itemhash) | Item hash. |

#### Returns

`string`

Market hash name.

#### Defined in

classes/ItemParser.ts:238

___

### hashToFullName

▸ **hashToFullName**(`hash`): `string`

Converts a hash to a full name.

**`example`**
```
parser.hashToFullName({
    tradable: true,
    craftable: true,
    particle_name: 'Purple Energy',
    particle: 10,
    defindex: 53,
    item_name: 'Trophy Belt',
    quality_name: 'Unusual',
    quality: 5
});
// 'Purple Energy Trophy Belt'
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hash` | [`ItemHash`](../modules.md#itemhash) | Item hash. |

#### Returns

`string`

Full name.

#### Defined in

classes/ItemParser.ts:286

___

### hashToMarketName

▸ **hashToMarketName**(`hash`): `string`

Converts a hash to its market hash name.

**`example`**
```
parser.hashToMarketName({
    tradable: true,
    craftable: true,
    particle_name: 'Purple Energy',
    particle: 10,
    defindex: 53,
    item_name: 'Trophy Belt',
    quality_name: 'Unusual',
    quality: 5
});
// 'Unusual Trophy Belt'
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hash` | [`ItemHash`](../modules.md#itemhash) | Item hash. |

#### Returns

`string`

Market hash name.

#### Defined in

classes/ItemParser.ts:262

___

### hashToSKU

▸ **hashToSKU**(`hash`): `string`

Converts a hash to a SKU.

**`example`**
```
parser.hashToSKU({
    tradable: true,
    craftable: true,
    particle_name: 'Purple Energy',
    particle: 10,
    defindex: 53,
    item_name: 'Trophy Belt',
    quality_name: 'Unusual',
    quality: 5
});
// '53;5;u10'
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hash` | [`ItemHash`](../modules.md#itemhash) | Item hash. |

#### Returns

`string`

SKU.

#### Defined in

classes/ItemParser.ts:146

___

### hashToStatsName

▸ **hashToStatsName**(`hash`): `string`

Converts a hash to its stats name. Includes festivized, killstreak tier, skin name, australium, and wear name  where available.

**`example`**
```
parser.hashToStatsName({
    tradable: true,
    craftable: true,
    particle_name: 'Purple Energy',
    particle: 10,
    defindex: 53,
    item_name: 'Trophy Belt',
    quality_name: 'Unusual',
    quality: 5
});
// 'Trophy Belt'
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hash` | [`ItemHash`](../modules.md#itemhash) | Item hash. |

#### Returns

`string`

Market hash name.

#### Defined in

classes/ItemParser.ts:214

___

### nameToHash

▸ **nameToHash**(`name`): [`ItemHash`](../modules.md#itemhash)

Attempts to hash attributes from a name representing an item.

**`example`**
```
parser.nameToHash('Purple Energy Trophy Belt');
// {
//     tradable: true,
//     craftable: true,
//     particle_name: 'Purple Energy',
//     particle: 10,
//     defindex: 53,
//     item_name: 'Trophy Belt',
//     quality_name: 'Unusual',
//     quality: 5
// }
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Name. |

#### Returns

[`ItemHash`](../modules.md#itemhash)

Hashed item. Will be null if parse was unsuccessful (could not reliably determine a defindex/item name).

#### Defined in

classes/ItemParser.ts:47

___

### nameToHashIgnoreCase

▸ **nameToHashIgnoreCase**(`name`): [`ItemHash`](../modules.md#itemhash)

Attempts to hash attributes from a name representing an item. Case insensitive.

**`example`**
```
parser.nameToHash('purple energy trophy belt');
// {
//     tradable: true,
//     craftable: true,
//     particle_name: 'Purple Energy',
//     particle: 10,
//     defindex: 53,
//     item_name: 'Trophy Belt',
//     quality_name: 'Unusual',
//     quality: 5
// }
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Name. |

#### Returns

[`ItemHash`](../modules.md#itemhash)

Hashed item. Will be null if parse was unsuccessful (could not reliably determine a defindex/item name).

#### Defined in

classes/ItemParser.ts:74

___

### parseAsset

▸ **parseAsset**(`asset`, `descriptionReducer?`): [`ParsedItem`](../modules.md#parseditem)

Collects attributes from an asset object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `asset` | [`Asset`](../modules.md#asset) | Asset. |
| `descriptionReducer?` | [`DescriptionReducerFunction`](../modules.md#descriptionreducerfunction) | Function called for reducing values from descriptions. Any values set here will override any values returned from the parse result. |

#### Returns

[`ParsedItem`](../modules.md#parseditem)

Parsed results.

#### Defined in

classes/ItemParser.ts:86

___

### parseClassInfo

▸ **parseClassInfo**(`classinfo`, `descriptionReducer?`): [`ParsedItem`](../modules.md#parseditem)

Collects attributes from a classinfo object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `classinfo` | [`ClassInfo`](../modules.md#classinfo) | Classinfo. |
| `descriptionReducer?` | [`DescriptionReducerFunction`](../modules.md#descriptionreducerfunction) | Function called for reducing values from descriptions. Any values set here will override any values returned from the parse result. |

#### Returns

[`ParsedItem`](../modules.md#parseditem)

Parsed results.

#### Defined in

classes/ItemParser.ts:95

___

### parseSKU

▸ **parseSKU**(`sku`): [`ParseSKUAttributes`](../modules.md#parseskuattributes)

Attempts to parse a SKU into attributes.

**`example`**
```
parser.parseSKU('53;5;u10');
// {
//     defindex: 53,
//     quality: 5,
//     particle: 10,
//     craftable: true
// }
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sku` | `string` | SKU. |

#### Returns

[`ParseSKUAttributes`](../modules.md#parseskuattributes)

Parsed attributes. Will be null if name was parsed unsuccessfully (invalid SKU).

#### Defined in

classes/ItemParser.ts:166

___

### skuToHash

▸ **skuToHash**(`sku`): [`ItemHash`](../modules.md#itemhash)

Attempts to parse a SKU into attributes.

**`example`**
```
parser.skuToHash('53;5;u10');
// {
//     tradable: true,
//     craftable: true,
//     particle_name: 'Purple Energy',
//     particle: 10,
//     defindex: 53,
//     item_name: 'Trophy Belt',
//     quality_name: 'Unusual',
//     quality: 5
// }
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sku` | `string` | SKU. |

#### Returns

[`ItemHash`](../modules.md#itemhash)

Hash item. Will be null if parse was unsuccessful.

#### Defined in

classes/ItemParser.ts:190

___

### updateSchema

▸ **updateSchema**(`schemaInput`): `void`

Updates the schema.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `schemaInput` | [`SchemaInput`](../modules.md#schemainput) | Object containing schema tables. |

#### Returns

`void`

#### Defined in

classes/ItemParser.ts:294

___

### hashToSKU

▸ `Static` **hashToSKU**(`hash`): `string`

Converts a hash to a SKU.

**`example`**
```
ItemParser.hashToSKU({
    tradable: true,
    craftable: true,
    particle_name: 'Purple Energy',
    particle: 10,
    defindex: 53,
    item_name: 'Trophy Belt',
    quality_name: 'Unusual',
    quality: 5
});
// '53;5;u10'
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hash` | [`ItemHash`](../modules.md#itemhash) | Item hash. |

#### Returns

`string`

SKU.

#### Defined in

classes/ItemParser.ts:370

___

### parseAsset

▸ `Static` **parseAsset**(`asset`, `descriptionReducer?`): [`ParsedItem`](../modules.md#parseditem)

Collects attributes from an asset object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `asset` | [`Asset`](../modules.md#asset) | Asset. |
| `descriptionReducer?` | [`DescriptionReducerFunction`](../modules.md#descriptionreducerfunction) | Function called for reducing values from descriptions. Any values set here will override any values returned from the main function. |

#### Returns

[`ParsedItem`](../modules.md#parseditem)

Parsed results.

#### Defined in

classes/ItemParser.ts:399

___

### parseClassInfo

▸ `Static` **parseClassInfo**(`classinfo`, `descriptionReducer?`): [`ParsedItem`](../modules.md#parseditem)

Collects attributes from a classinfo object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `classinfo` | [`ClassInfo`](../modules.md#classinfo) | Classinfo. |
| `descriptionReducer?` | [`DescriptionReducerFunction`](../modules.md#descriptionreducerfunction) | Function called for reducing values from descriptions. Any values set here will override any values returned from the main function. |

#### Returns

[`ParsedItem`](../modules.md#parseditem)

Parsed results.

#### Defined in

classes/ItemParser.ts:408

___

### parseSKU

▸ `Static` **parseSKU**(`sku`): [`ParseSKUAttributes`](../modules.md#parseskuattributes)

Attempts to parse a SKU into attributes.

**`example`**
```
ItemParser.parseSKU('53;5;u10');
// {
//     defindex: 53,
//     quality: 5,
//     particle: 10,
//     craftable: true
// }
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sku` | `string` | SKU. |

#### Returns

[`ParseSKUAttributes`](../modules.md#parseskuattributes)

Parsed attributes. Will be null if parse was unsuccessful (invalid SKU).

#### Defined in

classes/ItemParser.ts:390
