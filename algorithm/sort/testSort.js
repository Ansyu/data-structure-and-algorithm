// const sort = require('./selectSort')
const sort = require('./bubbleSort')
function testSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
            return false
        }
    }
    return true
}

let arr = []
for (let i = 0; i < 10000; i++) {
    arr.push(Math.random())
}

console.log('before sort: ', testSort(arr))
console.time('sortTime')
sort(arr)
console.timeEnd('sortTime')
console.log('after sort: ', testSort(arr))