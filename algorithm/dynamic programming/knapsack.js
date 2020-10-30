/**
 * 假设 maxValues(i, w) 表示在前 i 个物品中选择不超过 w 单位重量的物品的最大价值
 *      eg: maxValues(5, 10) 表示在前 5 个物品中选择不超过 10 单位重量的物品的最大价值
 * 
 * 现有物品数 n，背包容量 W, i 表示第 i 个物品
 * 
 *                   |-->  0                        (i = 0)   // 物品数为 0，价值为 0
 *                   |-->  0                        (W = 0)   // 背包容量为0，价值为 0
 * maxValues(i, W) = |-->  maxValues(i - 1, W)      (wi > W)  // 第 i 个物品的重量大于当前背包剩余容量
 *                   |-->  Max(maxValues(i - 1, W), vi + maxValues(i - 1, W - wi))
 * 
 * 
 * @param {*} items
 *   [{value, weight}, ...]
 */
function knapsack(items, capacity) {
    return maxValues(items.length, capacity)

    function maxValues(i, w) {
        if (i === 0 || w === 0) {
            return 0
        }
        let item = items[i - 1] // 第 i 个物品
        if (item.weight > w) {
            return maxValues(i - 1, w)
        }
        return Math.max(maxValues(i - 1, w), item.value + maxValues(i - 1, w - item.weight))
    }

}

let items = [
    {value: 1, weight: 1},
    {value: 6, weight: 2},
    {value: 18, weight: 5},
    {value: 22, weight: 6},
    {value: 28, weight: 7},
]
console.log(knapsack(items, 11))