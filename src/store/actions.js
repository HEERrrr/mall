export default {
  // 判断添加商品的位置/添加数量
  addPurchaseInfo({ state, commit }, payload) {
    // 查找购物车列表中是否有 和传入的payload是同一家店的
    const cartItem = state.cartList.find(
      item => item.shopName === payload.shopName
    );
    if (cartItem) {
      const index = state.cartList.indexOf(cartItem);
      // 查找同一家店的列表里是否有同一件商品，并且是否和传入payload的颜色,尺码一样
      const productsItem = cartItem.products.find(
        item =>
          item.iid === payload.products[0].iid &&
          /* item.styleName === payload.products[0].styleName &&
          item.sizeName === payload.products[0].sizeName */
          item.style.styleName === payload.products[0].style.styleName &&
          item.size.sizeName === payload.products[0].size.sizeName
      );
      // 如果是同一件商品，并且选中样式完全一样,增加其商品数量
      if (productsItem) {
        const key = cartItem.products.indexOf(productsItem);
        commit("addCount", {
          index: index,
          key: key,
          count: payload.products[0].count,
        });
      } else {
        // 如果不是同一件/颜色尺码不一样，将其添加到products中
        commit("addToProducts", {
          index: index,
          products: payload.products,
        });
      }
    } else {
      // cartList中没有和payload一家店的，将payload添加进购物车列表里
      commit("addToCart", payload);
    }

    // 每次添加商品,取消所有选中
    if (state.allChecked) commit("allCheckedFalse");
    for (let i in state.cartList) {
      if (state.cartList[i].shopChecked) commit("shopCheckedFalse", i);
      for (let k in state.cartList[i].products) {
        if (state.cartList[i].products[k].proChecked)
          commit("proCheckedFalse", { index: i, key: k });
      }
    }
  },
  // 商品状态
  ProChecked({ state, commit }, { index, key }) {
    let cartList = state.cartList;

    !cartList[index].products[key].proChecked
      ? commit("proCheckedTrue", { index, key })
      : commit("proCheckedFalse", { index, key });

    // 商品全选，所选店铺选中
    if (cartList[index].proCheckedNum === cartList[index].products.length) {
      commit("shopCheckedTrue", index);
    }
    // 商品没全选 → 将选中的店铺改为未选中
    else if (cartList[index].shopChecked) {
      commit("shopCheckedFalse", index);
    }

    // 判断店铺是否全选，改变全选按钮状态
    if (state.shopCheckedNum === cartList.length) {
      commit("allCheckedTrue");
    } else {
      commit("allCheckedFalse");
    }
  },
  // 店铺选中状态
  ShopChecked({ state, commit }, index) {
    let cartList = state.cartList;

    if (!cartList[index].shopChecked) {
      // 店铺选中 → 将当前店铺内未选中的商品改为选中
      commit("shopCheckedTrue", index);
      for (let k in cartList[index].products) {
        if (!cartList[index].products[k].proChecked) {
          commit("proCheckedTrue", { index, key: k });
        }
      }
    } else {
      // 店铺取消选中 → 将当前店铺内所有商品改为未选中
      commit("shopCheckedFalse", index);
      for (let k in cartList[index].products) {
        commit("proCheckedFalse", { index, key: k });
      }
    }

    if (state.shopCheckedNum === cartList.length) {
      commit("allCheckedTrue");
    } else {
      commit("allCheckedFalse");
    }
  },
  // 全选
  AllChecked({ state, commit }) {
    const cartList = state.cartList;

    if (!state.allChecked) {
      // 全选 → 所有未选中的店铺+商品全部选中
      commit("allCheckedTrue");
      for (let i in cartList) {
        if (!cartList[i].shopChecked) {
          commit("shopCheckedTrue", i);
        }
        for (let k in cartList[i].products) {
          if (!cartList[i].products[k].proChecked) {
            commit("proCheckedTrue", { index: i, key: k });
          }
        }
      }
    } else {
      // 取消全选 → 所有店铺+商品取消选中
      commit("allCheckedFalse");
      for (let i in cartList) {
        commit("shopCheckedFalse", i);
        for (let k in cartList[i].products) {
          commit("proCheckedFalse", { index: i, key: k });
        }
      }
    }
  },
  // 查询选中了哪些店铺，商品
  queryChecked({ state, commit }) {
    const cartList = state.cartList;

    for (let i in cartList) {
      // 将选中店铺及店铺内所有商品删除
      if (cartList[i].shopChecked) {
        commit("delShop", i);
        // 如果购物车内没有商品，全选按钮false
        if (state.totalCount === 0) commit("allCheckedFalse");
      } else {
        // 将选中商品删除
        for (let k in cartList[i].products) {
          if (cartList[i].products[k].proChecked) {
            commit("delPros", { i, k });
          }
        }
      }
    }
  },
};
