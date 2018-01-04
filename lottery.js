/**
 * 抽奖
 * @param  {Number}   jackpot     奖金总额
 * @param  {Number}   playerCount 玩家总数
 * @param  {Boolean}  onlyOne     是否只返回第一个玩家的金额
 * @return {Array|Number}         抽奖结果, onlyOne 为true时为Number, 为false时为数组
 */
// 最小数额
const MIN_NUM = 0.01
function luckyDraw (jackpot, playerCount, onlyOne = false) {
  const minNum = MIN_NUM * playerCount
  if (jackpot < minNum) {
    throw new Error(`${jackpot} is not enough for ${playerCount} players`)
  }
  if (jackpot === minNum) {
    if (onlyOne) return MIN_NUM
    return Array(playerCount).fill(MIN_NUM)
  }
  if (playerCount === 1) {
    if (onlyOne) return jackpot
    return [jackpot]
  }
  const max = jackpot - (playerCount - 1) * MIN_NUM
  let num = parseFloat((Math.random() * max).toFixed(2))
  if (num < MIN_NUM) num = MIN_NUM
  if (onlyOne) return num
  return [num].concat(luckyDraw(jackpot - num, playerCount - 1))
}
