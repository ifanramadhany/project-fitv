export function numberWithCommas(price: number) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function isBlank(str: string) {
    return !str || /^\s*$/.test(str);
}