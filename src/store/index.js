import { createStore } from "vuex";

import mutations from "./mutations";
import actions from "./actions";

const state = {
  cartList: [],
  totalCount: 0,
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
});

export default store;
