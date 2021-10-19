# Namespace: helpers

## Functions

### getRecipe

▸ **getRecipe**(`item`): `Object`

Gets the recipe ingrdients and counts for an item.

**`example`**
getRecipe(item);
```ts
{
    'Unique Killstreak Item': 1,
    'Battle-Worn Robot Money Furnace': 7,
    'Reinforced Robot Humor Suppression Pump': 1
}
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | [`Asset`](../modules.md#asset) \| [`ClassInfo`](../modules.md#classinfo) | Item. |

#### Returns

`Object`

Recipe.

#### Defined in

lib/econitem.ts:46

___

### isWeapon

▸ **isWeapon**(`item`): `boolean`

Determines if the item is a weapon or not.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | [`Asset`](../modules.md#asset) \| [`ClassInfo`](../modules.md#classinfo) | Item. |

#### Returns

`boolean`

Is it a weapon?

#### Defined in

lib/econitem.ts:80
