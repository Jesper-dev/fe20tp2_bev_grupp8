/* This array sory an array of objects by a specific key. 
Keyvalue is is supposed to be type of number . 
Enter the array as first arg and then the key ypu want to sort by */
export const sortArrayOfObjByLargetsNumber = (arr, keyname) => {
    arr.sort((a, b) => {
        return a[keyname] - b[keyname];
    });
};

/* Reduce func. Takes an array of objects and removes duplicates of chosen key and merge all/your chosen keyvalues. 
    Takes the original array as argument and which key to checkfor duplicates. Then whcih keys to merge.
*/

export const ReduceArrayDuplicateAndMerge = (arr, dupkey, mergekey) => {
    let result = [];
    arr.forEach(function (a) {
        if (!this[a.symbol]) {
            this[a.symbol] = { symbol: a.symbol, amount: 0 };
            result.push(this[a.symbol]);
        }
        this[a.symbol].amount += a.amount;
    }, Object.create(null));
    return result;
    /*     if (!arr) return;
    let result = [];
    arr.forEach((a) => {
        if (!this[a[dupkey]]) {
            this[a[dupkey]] = { [dupkey]: a[dupkey], [mergekey]: 0 };
            result.push(this[a[dupkey]]);
        }
        this[a[dupkey]][mergekey] += a[mergekey];
    }, Object.create(null));
    return result; */
};

/* Takes and array of user in an organizaton and returns a complete array of all users data from the chosen key  */

export const MakeOneArrayOrganization = (arr) => {
    if (!arr) return;
    let orgStockPossessionArr = [];
    let j = 0;
    let i = 0;
    while (j < arr.length) {
        let keys = Object.keys(arr[j].possessionStocks);
        if (arr[j].possessionStocks[keys[i]] === undefined) {
            i = 0;
            j++;
        } else {
            orgStockPossessionArr.push({
                symbol: arr[j].possessionStocks[keys[i]].symbol,
                amount: arr[j].possessionStocks[keys[i]].amount,
                username: arr[j].username,
            });
            i++;
        }
    }
    return orgStockPossessionArr;
};
