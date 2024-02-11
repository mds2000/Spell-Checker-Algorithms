/**
 *
 * @param {string} a
 * @param {string} b
 * @returns {number}
 */
function levenshtein(a, b) {
    if (length(b) === 0) return length(a);
    if (length(a) === 0) return length(b);
    if (head(a, b) != "") return levenshtein(tail(a, b), tail(b, a));

    return (
        1 +
        Math.min(
            levenshtein(tail(a, b), b),
            levenshtein(a, tail(b, a)),
            levenshtein(tail(a, b), tail(b, a))
        )
    );
}

/**
 *
 * @param {string} word
 * @returns {number}
 */
function length(word) {
    return word?.length ?? 0;
}

/**
 *
 * @param {string} a
 * @param {string} b
 * @returns {string}
 */
function head(a, b) {
    let acc = "";
    for (let i = 0; i < length(a); a++) {
        if (
            a[i] != "" &&
            a[i] != undefined &&
            b[i] != "" &&
            b[i] != undefined &&
            a[i] === b[i]
        ) {
            acc += a[i];
        } else {
            return acc;
        }
    }
    return acc;
}

/**
 *
 * @param {string} a
 * @param {string} b
 * @returns {string}
 */
function tail(a, b) {
    const currentHead = head(a, b);
    if (currentHead === "") return a.substring(1);

    return a.replace(currentHead, "");
}

module.exports = { levenshtein }