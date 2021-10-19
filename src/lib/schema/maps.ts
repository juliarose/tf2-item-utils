
export const killstreakTier: {
    [killstreakTierName: string]: number
} = Object.freeze({
    'Killstreak': 1,
    'Specialized Killstreak': 2,
    'Professional Killstreak': 3
});

export const killstreakTierToName: {
    [id: number]: string
} = Object.freeze({
    1: 'Killstreak',
    2: 'Specialized Killstreak',
    3: 'Professional Killstreak'
});

export const wear: {
    [wearName: string]: number
} = Object.freeze({
    'Factory New': 1,
    'Minimal Wear': 2,
    'Field-Tested': 3,
    'Well-Worn': 4,
    'Battle Scarred': 5
});

export const wearToName: {
    [id: number]: string
} = Object.freeze({
    1: 'Factory New',
    2: 'Minimal Wear',
    3: 'Field-Tested',
    4: 'Well-Worn',
    5: 'Battle Scarred'
});

export const quality: {
    [qualityName: string]: number
} = Object.freeze({
    'Normal': 0,
    'Genuine': 1,
    'Vintage': 3,
    'Unusual': 5,
    'Unique': 6,
    'Community': 7,
    'Valve': 8,
    'Self-Made': 9,
    'Customized': 10,
    'Strange': 11,
    'Completed': 12,
    'Haunted': 13,
    'Collector\'s': 14,
    'Decorated Weapon': 15,
});

export const qualityToName: {
    [id: number]: string
} = Object.freeze({
    0: 'Normal',
    1: 'Genuine',
    3: 'Vintage',
    5: 'Unusual',
    6: 'Unique',
    7: 'Community',
    8: 'Valve',
    9: 'Self-Made',
    10: 'Customized',
    11: 'Strange',
    12: 'Completed',
    13: 'Haunted',
    14: 'Collector\'s',
    15: 'Decorated Weapon',
});
