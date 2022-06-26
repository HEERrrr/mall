<template>
  <div>
    <nav-bar class="nav">
      <template #center>我的档案</template>
    </nav-bar>
    <div class="top">
      <div class="avatar">
        <!-- <img src="" alt=""> -->
      </div>
      <div class="login">
        <span>登录/注册</span>
        <p>暂无绑定手机号</p>
      </div>
      <i class="arrow">&gt;</i>
    </div>
    <div class="info">
      <div
        class="item"
        style="border-right: 1px solid rgba(100, 100, 100, 0.1)"
      >
        <p><i>0.00</i>元</p>
        <p class="label">我的余额</p>
      </div>
      <div
        class="item"
        style="border-right: 1px solid rgba(100, 100, 100, 0.1)"
      >
        <p><i>0</i>个</p>
        <p class="label">我的优惠</p>
      </div>
      <div class="item">
        <p><i>0</i>分</p>
        <p class="label">我的积分</p>
      </div>
    </div>
    <div>
      <ul class="profileList">
        <li>我的消息</li>
        <li>积分商城</li>
        <li>会员卡</li>
      </ul>
      <ul class="profileList">
        <li>我的购物车</li>
        <li style="border: none">下载购物APP</li>
      </ul>
    </div>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar.vue";
export default {
  name: "Profile",
  components: {
    NavBar,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped>
.nav {
  background-color: #ff8198;
  color: #fff;
  font-weight: bold;
}
.top {
  position: relative;
  padding: 15px;
  background-color: #ff8198;
  overflow: hidden;
  color: #fff;
}
.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #fff;
}
.login {
  position: absolute;
  left: 90px;
  top: 50%;
  transform: translateY(-50%);
}
.login p {
  margin-top: 5px;
}
.arrow {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
}
.info {
  display: flex;
}
.item {
  flex: 1;
  padding: 20px 0;
  text-align: center;
}
.item i {
  color: #ff002f;
  font-weight: bold;
  font-size: 20px;
}
.item .label {
  margin-top: 5px;
}
.profileList:first-child {
  padding: 20px 0;
  background-color: #f2f2f2;
}
.profileList li {
  padding: 10px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  background-color: #fff;
}
</style>
