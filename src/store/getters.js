export default {
  // 购物车数量减少
  decreCount(state) {
    return (index, key) => {
      return state.cartList[index].products[key].count--;
    };
  },
  // 购物车数量增加
  increCount(state) {
    return (index, key) => {
      return state.cartList[index].products[key].count++;
    };
  },
  // 选中商品总价格
  getTotalPrice(state) {
    state.totalPrice = 0;
    for (let i in state.cartList) {
      for (let k in state.cartList[i].products) {
        if (state.cartList[i].products[k].proChecked) {
          state.totalPrice +=
            state.cartList[i].products[k].price.slice(1) *
            state.cartList[i].products[k].count;
        }
      }
    }
    return state.totalPrice;
  },
};
