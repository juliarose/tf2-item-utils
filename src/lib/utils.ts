// a faster method of replacing a match from a regular expression
// this does not require passing a string or regular expression to the replace function to remove the matched item,
// instead slicing the input string based on the match
export function replaceMatch(match: any): string {
    const { index, input } = match;
    const length = match[0].length;
    
    if (index === 0) {
        // we only need one slice
        return input.slice(index + length);
    } else if (index + length === input.length) {
        return input.slice(0, index);
    }
    
    return input.slice(0, index) + input.slice(index + length);
}

export function escapeRegExp(str: string): string {
    return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

export function toArray(arr: any): any[] {
    if (typeof arr !== 'object' || arr === null) {
        return [];
    } else if (Array.isArray(arr)) {
        return arr;
    } else {
        return Object.values(arr);
    }
}
