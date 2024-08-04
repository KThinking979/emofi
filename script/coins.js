class Coins {
  constructor(world, x, y, number) {
    this.coins = []
    this.x = x
    this.y = y

    for (let i = 0; i < number; i++) {
      let coin = new Coin(world, x, y, true)
      this.coins.push(coin)
    }
  }

  /**
   * Method
   */
  destroy() {
    for (let i = 0; i < this.coins.length; i++) {
      this.coins[i].destroy()
    }
  }

  rewardCoin() {
    for (let i = 0; i < this.coins.length; i++) {
      setTimeout(() => {
        this.coins[i].rewardCoin()
      }, i * 100)

      if (this.coins[this.coins.length - 1].isDie) {
        coinReward = null
      }
    }
  }
}