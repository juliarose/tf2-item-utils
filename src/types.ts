
/**
 * Represents an item.
 */
export type ItemRecord = {
    /** Item name. */
    item_name: string;
    /** Defindex. */
    defindex: number;
    /** Proper name. Whether the item should start with "The" for Unique quality items. */
    proper_name: boolean;
    /** Any other value. */
    [key: string]: any;
}

/**
 * Represents an item particle.
 */
export type ParticleRecord = {
    /** Name. */
    name: string;
    /** Value. */
    value: number;
    /** Any other value. */
    [key: string]: any;
}

/**
 * Represents an item skin.
 */
export type SkinRecord = {
    /** Name. */
    name: string;
    /** Value. */
    value: number;
    /** Any other value. */
    [key: string]: any;
}

/**
 * Represents an item quality.
 */
export type QualityRecord = {
    /** Name. */
    name: string;
    /** Value. */
    value: number;
    /** Any other value. */
    [key: string]: any;
}

/**
 * Represents an item wear.
 */
export type WearRecord = {
    /** Name. */
    name: string;
    /** Value. */
    value: number;
    /** Any other value. */
    [key: string]: any;
}

/**
 * Represents an item killstreak tier.
 */
export type KillstreakTierRecord = {
    /** Name. */
    name: string;
    /** Value. */
    value: number;
    /** Any other value. */
    [key: string]: any;
}

/**
 * Used for constructing an ItemParser.
 */
export type SchemaInput = {
    /** Items. */
    items: ItemRecord[],
    /** Particles. */
    particles: ParticleRecord[],
    /** Qualities. */
    qualities?: QualityRecord[],
    /** Skins. */
    skins?: SkinRecord[],
    /** Killstreak tiers. */
    killstreak_tiers?: KillstreakTierRecord[],
    /** Wears. */
    wears?: WearRecord[],
}

/**
 * The name for a table from the schema.
 */
export type SchemaTableName = 'items'|'qualities'|'particles'|'wears'|'skins'|'killstreak_tiers';

/**
 * Schema.
 * @hidden
 */
export type Schema = {
    /** Items. */
    items: ItemRecord[],
    /** Particles. */
    particles: ParticleRecord[],
    /** Qualities. */
    qualities: QualityRecord[],
    /** Skins. */
    skins: SkinRecord[],
    /** Killstreak tiers. */
    killstreak_tiers: KillstreakTierRecord[],
    /** Wears. */
    wears: WearRecord[],
}

/**
 * Hashed item attributes.
 */
export type ItemHash = {
    /** Item name. */
    item_name: string;
    /** Defindex. */
    defindex: number;
    /** Quality. */
    quality: number;
    /** Quality name. */
    quality_name: string;
    
    /** Whether the item is tradable or not. */
    tradable?: boolean;
    /** Whether the item is craftable or not. */
    craftable?: boolean;
    /** Whether the item is strangified or not. Not to be confused with strange quality items. */
    strange?: boolean;
    /** Whether the item is australium or not. */
    australium?: boolean;
    /** Whether the item is festivized or not. */
    festivized?: boolean;
    
    /** Particle. */
    particle?: number;
    /** Particle name. */
    particle_name?: string;
    /** Wear. */
    wear?: number;
    /** Wear name. */
    wear_name?: string;
    /** Killstreak tier. */
    killstreak_tier?: number;
    /** Killstreak tier name. */
    killstreak_tier_name?: string;
    /** Skin. */
    skin?: number;
    /** Skin name. */
    skin_name?: string;
    
    /** Crate number. */
    crate_number?: number;
    /** Series numbes. For example, a crate series number or chemistry set series number. */
    series_number?: number;
    /** Craft number. */
    craft_number?: number;
    
    /** Target defindex. For killstreak kits or strangifiers. */
    target_defindex?: number;
    /** Target item name. For killstreak kits or strangifiers. */
    target_item_name?: string;
    
    /** Output defindex. For killstreak fabricators or chemistry sets. */
    output_defindex?: number;
    /** Output item name. For killstreak fabricators or chemistry sets. */
    output_item_name?: string;
    /** Output quality. For killstreak fabricators or chemistry sets. */
    output_quality?: number;
    /** Output quality name. For killstreak fabricators or chemistry sets. */
    output_quality_name?: string;
    
    /** Paint name. */
    paint_name?: string;
    /** Sheen name. */
    sheen_name?: string;
    /** Killstreaker name. */
    killstreaker_name?: string;
    /** Spell names. */
    spell_names?: string[];
    /* Strange part names/ */
    strange_part_names?: string[];
    /* Other attributes. */
    [others: string]: any;
}

/**
 * Parsed item.
 */
export type ParsedItem = {
    /** Defindex. */
    defindex?: number;
    /** Quality. */
    quality?: number;
    /** Quality name. */
    quality_name?: string;
    /** Whether the item is tradable or not. */
    tradable?: boolean;
    /** Whether the item is craftable or not. */
    craftable?: boolean;
    /** Whether the item is strangified or not. Not to be confused with strange quality items. */
    strange?: boolean;
    /** Whether the item is australium or not. */
    australium?: boolean;
    /** Whether the item is festivized or not. */
    festivized?: boolean;
    /** Particle name. */
    particle_name?: string;
    /** Wear name. */
    wear_name?: string;
    /** Killstreak tier name. */
    killstreak_tier_name?: string;
    /** Skin name. */
    skin_name?: string;
    /** Crate number. */
    crate_number?: number;
    /** Series numbes. For example, a crate series number or chemistry set series number. */
    series_number?: number;
    /** Paint name. */
    paint_name?: string;
    /** Sheen name. */
    sheen_name?: string;
    /** Killstreaker name. */
    killstreaker_name?: string;
    /** Spell names. */
    spell_names?: string[];
    /* Strange part names. */
    strange_part_names?: string[];
    /* Other attributes. */
    [others: string]: any;
};

/**
 * Attributes parsed from a SKU.
 */
export type ParseSKUAttributes = {
    /** Defindex. */
    defindex: number;
    /** Quality. */
    quality: number;
    /** Quality name. */
    quality_name?: string;
    /** Whether the item is tradable or not. */
    tradable: boolean;
    /** Whether the item is craftable or not. */
    craftable: boolean;
    /** Whether the item is strangified or not. Not to be confused with strange quality items. */
    australium?: boolean;
    /** Whether the item is australium or not. */
    strange?: boolean;
    /** Whether the item is festivized or not. */
    festivized?: boolean;
    /** Killstreak tier. */
    killstreak_tier?: number;
    /** Killstreak tier name. */
    killstreak_tier_name?: string;
    /** Particle. */
    particle?: number;
    /** Wear. */
    wear?: number;
    /** Wear name. */
    wear_name?: string;
    /** Skin. */
    skin?: number;
    /** Craft number. */
    craft_number?: number;
    /** Crate number. */
    crate_number?: number;
    /** Target defindex. */
    target_defindex?: number;
    /** Output defindex. */
    output_defindex?: number;
    /** Output quality. */
    output_quality?: number;
}

/**
 * Definition for an item.
 */
export type ClassInfo = {
    /** Classid. */
    classid: string;
    /** Instanceid. */
    instanceid?: string;
    /** Type. */
    type?: string;
    /** Icon URL. */
    icon_url: string;
    /** Large Icon URL. */
    icon_url_large: string;
    /** Name. */
    name: string;
    /** Market name. */
    market_name: string;
    /** Market hash name. */
    market_hash_name: string;
    /** Background color. */
    background_color?: string;
    /** Name color. */
    name_color?: string;
    /** Fraud warnings. */
    fraudwarnings: string;
    /** Currency. */
    currency?: '1' | '0';
    /** Tradable. */
    tradable: '1' | '0';
    /** Commodity. */
    commodity: '1' | '0';
    /** Marketable. */
    marketable: '1' | '0';
    /** Market tradable restriction. */
    market_tradable_restriction: string;
    /** Market marketable restriction. */
    market_marketable_restriction: string;
    /** An object whose values are actions. */
    actions: {
        [index: string]: ClassInfoAction
    } | ClassInfoAction[];
    /** An object whose values are market actions. */
    market_actions: {
        [index: string]: ClassInfoAction
    } | ClassInfoAction[];
    /** An object whose values are descriptions. */
    descriptions?: {
        [index: string]: ClassInfoDescription
    } | ClassInfoDescription[];
    /** An object whose values are tags. */
    tags?: {
        [index: string]: ClassInfoTag
    } | ClassInfoTag[];
    /** App data. */
    app_data?: {
        /** Defindex for item. */
        def_index?: string,
        /** Quality for item. */
        quality?: string,
        /** Other attributes. */
        [key: string]: any
    };
    /** Any other attributes. */
    [others: string]: any;
}

/**
 * An asset on Steam.
 */
export type Asset = {
    /** Appid. */
    appid: number;
    /** Contextid. */
    contextid: string;
    /** Assetid. */
    assetid: string;
    /** Classid. */
    classid: string;
    /** Instanceid. */
    instanceid: string;
    /** Type. */
    type?: string;
    /** Icon URL. */
    icon_url: string;
    /** Large Icon URL. */
    icon_url_large: string;
    /** Name. */
    name: string;
    /** Market name. */
    market_name: string;
    /** Market hash name. */
    market_hash_name: string;
    /** Background color. */
    background_color?: string;
    /** Name color. */
    name_color?: string;
    /** Fraud warnings. */
    fraudwarnings: string;
    /** Currency. */
    currency?: 1 | 0;
    /** Tradable. */
    tradable: 1 | 0;
    /** Commodity. */
    commodity: 1 | 0;
    /** Marketable. */
    marketable: 1 | 0;
    /** Market tradable restriction. */
    market_tradable_restriction: number;
    /** Market marketable restriction. */
    market_marketable_restriction: number;
    /** An object whose values are actions. */
    actions: ClassInfoAction[];
    /** An object whose values are market actions. */
    market_actions: ClassInfoAction[];
    /** An object whose values are descriptions. */
    descriptions?: ClassInfoDescription[];
    /** An object whose values are tags. */
    tags?: ClassInfoTag[];
    /** Any other attributes. */
    [others: string]: any;
}

/**
 * An action belonging to a classinfo.
 */
export type ClassInfoAction = {
    /** Name. */
    name: string;
    /** Link. */
    link: string;
}

/**
 * A description belonging to a classinfo.
 */
export type ClassInfoDescription = {
    /** Type. */
    type: string;
    /** Value. */
    value: string;
    /** App data. */
    app_data?: any;
    /** Color. */
    color?: string;
}

/**
 * A tag belonging to a classinfo.
 */
export type ClassInfoTag = {
    /** Internal name. */
    internal_name: string;
    /** Name. */
    name: string;
    /** Category. */
    category: string;
    /** Category name. */
    category_name: string;
    /** Color. */
    color?: string;
    /** Localized tag name. */
    localized_tag_name?: string;
}

/**
 * Map of RegExp for matching schema values.
 * @hidden
 */
export type PatternsMap = {
    /** RegExp patterns for table. */
    [tableName: string]: RegExp
}

export type DescriptionReducerFunction = (
    /** Previous value. */
    hash: {
        [key: string]: any;
    },
    /** Current description. */
    description: ClassInfoDescription
) => any;
