# tf2-item-utils

tf2-item-utils is a module for parsing Team Fortress 2 item objects on Steam.

* [Docs](docs/modules.md)

## Basic Usage

```ts
import { ItemParser } from ('tf2-item-utils');

const parser = new ItemParser({
    items: [
        {
            item_name: 'Trophy Belt',
            defindex: 53,
            proper_name: false,
        }
    ],
    particles: [
        {
            name: 'Purple Energy',
            value: 10
        }
    ]
});
const classInfo: ClassInfo = {
    icon_url: 'IzMF03bi9WpSBq-S-ekoE33L-iLqGFHVaU25ZzQNQcXdEH9myp0erksICfTYffEcEJhnqWSMU5OD2NgLxXcNnChXOjLx2Sk5MbUqMcbBnQz4ruyeU2D4ZyPMECnYCGFkHPEJYHbR_GKs5-nFEWrBQewkRFxRf6NX9DdNPJ-AaURv149Y-DTrxUJ7SRR7PNVId59LEVM7',
    icon_url_large: 'IzMF03bi9WpSBq-S-ekoE33L-iLqGFHVaU25ZzQNQcXdEH9myp0erksICfTYffEcEJhnqWSMU5OD2NgLxXcNnChXOjLx2Sk5MbUqMcbBnQz4ruyeU2D4ZyPMECnYCGFkHPEJYHbR_GKs5-nFEWrBQewkRFxRf6NX9DdNPJ-AaURv149Y-DTrxUJ7SRR7PNVId59LEVM7',
    icon_drag_url: '',
    name: 'Unusual Trophy Belt',
    market_hash_name: 'Unusual Trophy Belt',
    market_name: 'Unusual Trophy Belt',
    name_color: '8650AC',
    background_color: '3C352E',
    type: 'Limited Level 64 Hat',
    tradable: '1',
    marketable: '1',
    commodity: '0',
    market_tradable_restriction: '7',
    market_marketable_restriction: '0',
    fraudwarnings: '',
    descriptions: {
        '0': {
            type: 'text',
            value: 'Paint Color: A Distinctive Lack of Hue',
            color: '756b5e',
            app_data: ''
        },
        '1': {
            type: 'text',
            value: '★ Unusual Effect: Purple Energy',
            color: 'ffd700',
            app_data: ''
        },
        '2': {
            type: 'text',
            value: 'Any old sap can pull teeth from a dead crocodile.\n' +
            'It takes a man to pull teeth from a live one.',
            app_data: ''
        }
    },
    actions: {
        '0': {
            name: 'Item Wiki Page...',
            link: 'http://wiki.teamfortress.com/scripts/itemredirect.php?id=53&lang=en_US'
        },
        '1': {
            name: 'Inspect in Game...',
            link: 'steam://rungame/440/76561202255233023/+tf_econ_item_preview%20S%owner_steamid%A%assetid%D16620715306999808995'
        }
    },
    market_actions: {
        '0': {
            name: 'Inspect in Game...',
            link: 'steam://rungame/440/76561202255233023/+tf_econ_item_preview%20M%listingid%A%assetid%D16620715306999808995'
        }
    },
    tags: {
        '0': {
            internal_name: 'rarity4',
            name: 'Unusual',
            category: 'Quality',
            color: '8650AC',
            category_name: 'Quality'
        },
        '1': {
            internal_name: 'misc',
            name: 'Cosmetic',
            category: 'Type',
            category_name: 'Type'
        },
        '2': {
            internal_name: 'Sniper',
            name: 'Sniper',
            category: 'Class',
            category_name: 'Class'
        }
    },
    app_data: {
        def_index: '53',
        quality: '5',
        slot: 'Cosmetic',
        player_class_ids: { '0': '2' },
        highlight_color: '7a6e65'
    },
    classid: '11151781',
    instanceid: '2064823791'
};
const hashed = parser.classInfoToHash(classInfo);
// {
//   craftable: true,
//   tradable: true,
//   defindex: 53,
//   quality: 5,
//   quality_name: 'Unusual',
//   type_name: 'Cosmetic',
//   paint_name: 'A Distinctive Lack of Hue',
//   particle_name: 'Purple Energy',
//   item_name: 'Trophy Belt',
//   particle: 10
// }
```

If you do not desire to supply a schema, you may also opt to rely on [`node-tf2-static-schema`](https://github.com/danocmx/node-tf2-static-schema).
```ts
import parser from 'tf2-item-utils/static';

const hash = parser.nameToHash('Purple Energy Trophy Belt');
// {
//   tradable: true,
//   craftable: true,
//   defindex: 53,
//   quality: 5,
//   quality_name: 'Unusual',
//   particle: 10,
//   particle_name: 'Purple Energy',
//   item_name: 'Trophy Belt',
// }
```

## License
[MIT](LICENSE)
