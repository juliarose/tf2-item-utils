# tf2-item-utils

## Namespaces

- [helpers](modules/helpers.md)

## Classes

- [ItemParser](classes/ItemParser.md)

## Type aliases

### Asset

Ƭ **Asset**: `Object`

An asset on Steam.

#### Index signature

▪ [others: `string`]: `any`

Any other attributes.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `actions` | [`ClassInfoAction`](modules.md#classinfoaction)[] | An object whose values are actions. |
| `appid` | `number` | Appid. |
| `assetid` | `string` | Assetid. |
| `background_color?` | `string` | Background color. |
| `classid` | `string` | Classid. |
| `commodity` | ``1`` \| ``0`` | Commodity. |
| `contextid` | `string` | Contextid. |
| `currency?` | ``1`` \| ``0`` | Currency. |
| `descriptions?` | [`ClassInfoDescription`](modules.md#classinfodescription)[] | An object whose values are descriptions. |
| `fraudwarnings` | `string` | Fraud warnings. |
| `icon_url` | `string` | Icon URL. |
| `icon_url_large` | `string` | Large Icon URL. |
| `instanceid` | `string` | Instanceid. |
| `market_actions` | [`ClassInfoAction`](modules.md#classinfoaction)[] | An object whose values are market actions. |
| `market_hash_name` | `string` | Market hash name. |
| `market_marketable_restriction` | `number` | Market marketable restriction. |
| `market_name` | `string` | Market name. |
| `market_tradable_restriction` | `number` | Market tradable restriction. |
| `marketable` | ``1`` \| ``0`` | Marketable. |
| `name` | `string` | Name. |
| `name_color?` | `string` | Name color. |
| `tags?` | [`ClassInfoTag`](modules.md#classinfotag)[] | An object whose values are tags. |
| `tradable` | ``1`` \| ``0`` | Tradable. |
| `type?` | `string` | Type. |

#### Defined in

types.ts:354

___

### ClassInfo

Ƭ **ClassInfo**: `Object`

Definition for an item.

#### Index signature

▪ [others: `string`]: `any`

Any other attributes.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `actions` | { [index: string]: [`ClassInfoAction`](modules.md#classinfoaction);  } \| [`ClassInfoAction`](modules.md#classinfoaction)[] | An object whose values are actions. |
| `app_data?` | `Object` | App data. |
| `app_data.def_index?` | `string` | Defindex for item. |
| `app_data.quality?` | `string` | Quality for item. |
| `background_color?` | `string` | Background color. |
| `classid` | `string` | Classid. |
| `commodity` | ``"1"`` \| ``"0"`` | Commodity. |
| `currency?` | ``"1"`` \| ``"0"`` | Currency. |
| `descriptions?` | { [index: string]: [`ClassInfoDescription`](modules.md#classinfodescription);  } \| [`ClassInfoDescription`](modules.md#classinfodescription)[] | An object whose values are descriptions. |
| `fraudwarnings` | `string` | Fraud warnings. |
| `icon_url` | `string` | Icon URL. |
| `icon_url_large` | `string` | Large Icon URL. |
| `instanceid?` | `string` | Instanceid. |
| `market_actions` | { [index: string]: [`ClassInfoAction`](modules.md#classinfoaction);  } \| [`ClassInfoAction`](modules.md#classinfoaction)[] | An object whose values are market actions. |
| `market_hash_name` | `string` | Market hash name. |
| `market_marketable_restriction` | `string` | Market marketable restriction. |
| `market_name` | `string` | Market name. |
| `market_tradable_restriction` | `string` | Market tradable restriction. |
| `marketable` | ``"1"`` \| ``"0"`` | Marketable. |
| `name` | `string` | Name. |
| `name_color?` | `string` | Name color. |
| `tags?` | { [index: string]: [`ClassInfoTag`](modules.md#classinfotag);  } \| [`ClassInfoTag`](modules.md#classinfotag)[] | An object whose values are tags. |
| `tradable` | ``"1"`` \| ``"0"`` | Tradable. |
| `type?` | `string` | Type. |

#### Defined in

types.ts:287

___

### ClassInfoAction

Ƭ **ClassInfoAction**: `Object`

An action belonging to a classinfo.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `link` | `string` | Link. |
| `name` | `string` | Name. |

#### Defined in

types.ts:410

___

### ClassInfoDescription

Ƭ **ClassInfoDescription**: `Object`

A description belonging to a classinfo.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `app_data?` | `any` | App data. |
| `color?` | `string` | Color. |
| `type` | `string` | Type. |
| `value` | `string` | Value. |

#### Defined in

types.ts:420

___

### ClassInfoTag

Ƭ **ClassInfoTag**: `Object`

A tag belonging to a classinfo.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `category` | `string` | Category. |
| `category_name` | `string` | Category name. |
| `color?` | `string` | Color. |
| `internal_name` | `string` | Internal name. |
| `localized_tag_name?` | `string` | Localized tag name. |
| `name` | `string` | Name. |

#### Defined in

types.ts:434

___

### DescriptionReducerFunction

Ƭ **DescriptionReducerFunction**: (`hash`: { [key: string]: `any`;  }, `description`: [`ClassInfoDescription`](modules.md#classinfodescription)) => `any`

#### Type declaration

▸ (`hash`, `description`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `hash` | `Object` |
| `description` | [`ClassInfoDescription`](modules.md#classinfodescription) |

##### Returns

`any`

#### Defined in

types.ts:458

___

### ItemHash

Ƭ **ItemHash**: `Object`

Hashed item attributes.

#### Index signature

▪ [others: `string`]: `any`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `australium?` | `boolean` | Whether the item is australium or not. |
| `craft_number?` | `number` | Craft number. |
| `craftable?` | `boolean` | Whether the item is craftable or not. |
| `crate_number?` | `number` | Crate number. |
| `defindex` | `number` | Defindex. |
| `festivized?` | `boolean` | Whether the item is festivized or not. |
| `item_name` | `string` | Item name. |
| `killstreak_tier?` | `number` | Killstreak tier. |
| `killstreak_tier_name?` | `string` | Killstreak tier name. |
| `killstreaker_name?` | `string` | Killstreaker name. |
| `output_defindex?` | `number` | Output defindex. For killstreak fabricators or chemistry sets. |
| `output_item_name?` | `string` | Output item name. For killstreak fabricators or chemistry sets. |
| `output_quality?` | `number` | Output quality. For killstreak fabricators or chemistry sets. |
| `output_quality_name?` | `string` | Output quality name. For killstreak fabricators or chemistry sets. |
| `paint_name?` | `string` | Paint name. |
| `particle?` | `number` | Particle. |
| `particle_name?` | `string` | Particle name. |
| `quality` | `number` | Quality. |
| `quality_name` | `string` | Quality name. |
| `series_number?` | `number` | Series numbes. For example, a crate series number or chemistry set series number. |
| `sheen_name?` | `string` | Sheen name. |
| `skin?` | `number` | Skin. |
| `skin_name?` | `string` | Skin name. |
| `spell_names?` | `string`[] | Spell names. |
| `strange?` | `boolean` | Whether the item is strangified or not. Not to be confused with strange quality items. |
| `strange_part_names?` | `string`[] | - |
| `target_defindex?` | `number` | Target defindex. For killstreak kits or strangifiers. |
| `target_item_name?` | `string` | Target item name. For killstreak kits or strangifiers. |
| `tradable?` | `boolean` | Whether the item is tradable or not. |
| `wear?` | `number` | Wear. |
| `wear_name?` | `string` | Wear name. |

#### Defined in

types.ts:121

___

### ItemRecord

Ƭ **ItemRecord**: `Object`

Represents an item.

#### Index signature

▪ [key: `string`]: `any`

Any other value.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `defindex` | `number` | Defindex. |
| `item_name` | `string` | Item name. |
| `proper_name` | `boolean` | Proper name. Whether the item should start with "The" for Unique quality items. |

#### Defined in

types.ts:5

___

### KillstreakTierRecord

Ƭ **KillstreakTierRecord**: `Object`

Represents an item killstreak tier.

#### Index signature

▪ [key: `string`]: `any`

Any other value.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Name. |
| `value` | `number` | Value. |

#### Defined in

types.ts:67

___

### ParseSKUAttributes

Ƭ **ParseSKUAttributes**: `Object`

Attributes parsed from a SKU.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `australium?` | `boolean` | Whether the item is strangified or not. Not to be confused with strange quality items. |
| `craft_number?` | `number` | Craft number. |
| `craftable` | `boolean` | Whether the item is craftable or not. |
| `crate_number?` | `number` | Crate number. |
| `defindex` | `number` | Defindex. |
| `festivized?` | `boolean` | Whether the item is festivized or not. |
| `killstreak_tier?` | `number` | Killstreak tier. |
| `killstreak_tier_name?` | `string` | Killstreak tier name. |
| `output_defindex?` | `number` | Output defindex. |
| `output_quality?` | `number` | Output quality. |
| `particle?` | `number` | Particle. |
| `quality` | `number` | Quality. |
| `quality_name?` | `string` | Quality name. |
| `skin?` | `number` | Skin. |
| `strange?` | `boolean` | Whether the item is australium or not. |
| `target_defindex?` | `number` | Target defindex. |
| `tradable` | `boolean` | Whether the item is tradable or not. |
| `wear?` | `number` | Wear. |
| `wear_name?` | `string` | Wear name. |

#### Defined in

types.ts:243

___

### ParsedItem

Ƭ **ParsedItem**: `Object`

Parsed item.

#### Index signature

▪ [others: `string`]: `any`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `australium?` | `boolean` | Whether the item is australium or not. |
| `craftable?` | `boolean` | Whether the item is craftable or not. |
| `crate_number?` | `number` | Crate number. |
| `defindex?` | `number` | Defindex. |
| `festivized?` | `boolean` | Whether the item is festivized or not. |
| `killstreak_tier_name?` | `string` | Killstreak tier name. |
| `killstreaker_name?` | `string` | Killstreaker name. |
| `paint_name?` | `string` | Paint name. |
| `particle_name?` | `string` | Particle name. |
| `quality?` | `number` | Quality. |
| `quality_name?` | `string` | Quality name. |
| `series_number?` | `number` | Series numbes. For example, a crate series number or chemistry set series number. |
| `sheen_name?` | `string` | Sheen name. |
| `skin_name?` | `string` | Skin name. |
| `spell_names?` | `string`[] | Spell names. |
| `strange?` | `boolean` | Whether the item is strangified or not. Not to be confused with strange quality items. |
| `strange_part_names?` | `string`[] | - |
| `tradable?` | `boolean` | Whether the item is tradable or not. |
| `wear_name?` | `string` | Wear name. |

#### Defined in

types.ts:197

___

### ParticleRecord

Ƭ **ParticleRecord**: `Object`

Represents an item particle.

#### Index signature

▪ [key: `string`]: `any`

Any other value.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Name. |
| `value` | `number` | Value. |

#### Defined in

types.ts:19

___

### QualityRecord

Ƭ **QualityRecord**: `Object`

Represents an item quality.

#### Index signature

▪ [key: `string`]: `any`

Any other value.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Name. |
| `value` | `number` | Value. |

#### Defined in

types.ts:43

___

### SchemaInput

Ƭ **SchemaInput**: `Object`

Used for constructing an ItemParser.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `items` | [`ItemRecord`](modules.md#itemrecord)[] | Items. |
| `killstreak_tiers?` | [`KillstreakTierRecord`](modules.md#killstreaktierrecord)[] | Killstreak tiers. |
| `particles` | [`ParticleRecord`](modules.md#particlerecord)[] | Particles. |
| `qualities?` | [`QualityRecord`](modules.md#qualityrecord)[] | Qualities. |
| `skins?` | [`SkinRecord`](modules.md#skinrecord)[] | Skins. |
| `wears?` | [`WearRecord`](modules.md#wearrecord)[] | Wears. |

#### Defined in

types.ts:79

___

### SchemaTableName

Ƭ **SchemaTableName**: ``"items"`` \| ``"qualities"`` \| ``"particles"`` \| ``"wears"`` \| ``"skins"`` \| ``"killstreak_tiers"``

The name for a table from the schema.

#### Defined in

types.ts:97

___

### SkinRecord

Ƭ **SkinRecord**: `Object`

Represents an item skin.

#### Index signature

▪ [key: `string`]: `any`

Any other value.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Name. |
| `value` | `number` | Value. |

#### Defined in

types.ts:31

___

### WearRecord

Ƭ **WearRecord**: `Object`

Represents an item wear.

#### Index signature

▪ [key: `string`]: `any`

Any other value.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Name. |
| `value` | `number` | Value. |

#### Defined in

types.ts:55
