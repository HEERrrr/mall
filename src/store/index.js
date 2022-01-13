import { createStore } from "vuex";

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

const state = {
  cartList: [],
  totalCount: 0,
  totalPrice: 0,
  allChecked: false,
  shopCheckedNum: 0,
  /**
   * cartList: [
   *  {
   *    shopName,
   *    shopChecked: false,
   *    proCheckedNum: 0,
   *    cartGoodsInfo: [
   *      {iid,styleName,proChecked...}
   *      {...}
   *    ]
   *  }
   * ]
   */
};

const store = createStore({
  state,
  mutations,
  actions,
  getters,
});

export default store;
