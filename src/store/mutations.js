export default {
  //添加到购物车列表
  addToCart(state, payload) {
    state.cartList.unshift(payload);
  },
  // 同一家店不同商品/样式，添加到products
  addToProducts(state, payload) {
    let cartList = state.cartList;
    // 将其提升到首位后再添加
    cartList.unshift(...cartList.splice(payload.index, 1));
    cartList[0].products.unshift(...payload.products);
  },
  // 增加商品数量
  addCount(state, payload) {
    state.cartList[payload.index].products[payload.key].count += payload.count;
  },
  // 购物车数量减少
  decreCount(state, { index, key }) {
    state.cartList[index].products[key].count--;
  },
  // 购物车数量增加
  increCount(state, { index, key }) {
    state.cartList[index].products[key].count++;
  },
  // 单个商品选中
  proCheckedTrue(state, { index, key }) {
    const cartList = state.cartList;

    cartList[index].products[key].proChecked = true;
    cartList[index].proCheckedNum += 1;
  },
  // 单个商品取消选中
  proCheckedFalse(state, { index, key }) {
    const cartList = state.cartList;

    cartList[index].products[key].proChecked = false;
    cartList[index].proCheckedNum -= 1;
  },
  // 店铺选中
  shopCheckedTrue(state, index) {
    const cartList = state.cartList;

    cartList[index].shopChecked = true;
    state.shopCheckedNum += 1;
  },
  // 店铺取消选中
  shopCheckedFalse(state, index) {
    const cartList = state.cartList;

    cartList[index].shopChecked = false;
    state.shopCheckedNum -= 1;
  },
  // 全选
  allCheckedTrue(state) {
    state.allChecked = true;
  },
  // 取消全选
  allCheckedFalse(state) {
    state.allChecked = false;
  },
  // 删除商品
  delPros(state, { i, k }) {
    const cartList = state.cartList;

    // 删除数量取决于选中数量
    cartList[i].products.splice(k, cartList[i].proCheckedNum);
    cartList[i].proCheckedNum -= cartList[i].proCheckedNum;
  },
  // 删除店铺及店内所有商品
  delShop(state, i) {
    const cartList = state.cartList;

    cartList.splice(i, state.shopCheckedNum);
    state.shopCheckedNum -= state.shopCheckedNum;
  },
};
