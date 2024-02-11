/**
 *
 * @param {string} a
 * @param {string} b
 * @returns {number}
 */
function wagnerFisher(a, b) {
    if (length(a) > length(b)) {
        const swap = a;
        a = b;
        b = swap;
    }
    const size = length(b);
    const matrix = [];
    matrix[0] = ["", "_"];
    const lengthDiff = length(b) - length(a);
    for (let k = 2; k <= lengthDiff + 2; k++) {
        matrix[0][k] = "_";
    }
    for (let j = lengthDiff + 1; j < size + 2; j++) {
        const char = a.charAt(j - 2 - lengthDiff);
        if (char != "") matrix[0][j] = char;
    }
    matrix[1] = ["_"];
    for (let i = 2; i < size + 2; i++) {
        const char = b.charAt(i - 2);
        if (char != "") matrix[i] = [char];
    }

    for (let i = 1; i < size + 2; i++) {
        for (let j = 1; j < size + 2; j++) {
            if (matrix[i - 1][j] === "_" && matrix[i][j - 1] === "_") {
                matrix[i][j] = 0;
                continue;
            }
            if (matrix[i][0] === "_") {
                matrix[i][j] = matrix[i][j - 1] + 1;
                continue;
            }
            if (matrix[0][j] === "_") {
                matrix[i][j] = matrix[i - 1][j] + 1;
                continue;
            }
            if (matrix[0][j] === matrix[i][0]) {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1],
                    matrix[i - 1][j],
                    matrix[i][j - 1]
                );
                continue;
            }
            if (matrix[i - 1][j - 1] === 0) {
                matrix[i][j] = 1;
                continue;
            }
            matrix[i][j] =
                Math.min(matrix[i - 1][j - 1], matrix[i - 1][j], matrix[i][j - 1]) + 1;
        }
    }
    return matrix[size + 1][size + 1];
}

/**
 *
 * @param {string} word
 * @returns {number}
 */
function length(word) {
    return word?.length ?? 0;
}

module.exports = { wagnerFisher }