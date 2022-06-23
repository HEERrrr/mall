<template>
  <div id="category">
    <nav-bar class="nav">
      <template #center>商品分类</template>
    </nav-bar>
    <div class="content">
      <slide-bar
        class="slideBar"
        :titles="titles"
        @barClick="barClick"
        ref="slideBar"
      />
      <category-list
        class="categoryList"
        :categoryList="categoryList"
        :categoryDetail="categoryDetail[currentType]"
        @tabClick="tabClick"
      />
    </div>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar.vue";
import SlideBar from "./childCpns/SlideBar.vue";
import CategoryList from "./childCpns/CategoryList.vue";
import {
  getCategory,
  getCategoryList,
  getCategoryDetail,
} from "network/category.js";
export default {
  name: "Category",
  components: {
    NavBar,
    SlideBar,
    CategoryList,
  },
  data() {
    return {
      titles: [],
      categoryList: [],
      categoryDetail: {
        pop: [],
        new: [],
        sell: [],
      },
      currentType: "pop",
    };
  },
  created() {
    // 有哪些分类
    getCategory()
      .then(res => {
        this.titles = res.data.category.list;
        // 拿到第一个分类的key值，请求其分类列表
        const maitKey = this.titles[0].maitKey;
        this.getCategoryList(maitKey);

        const miniWallkey = this.titles[0].miniWallkey;
        this.getCategoryDetail(miniWallkey, "pop");
        this.getCategoryDetail(miniWallkey, "new");
        this.getCategoryDetail(miniWallkey, "sell");
      })
      .then(() => {
        this.$refs.slideBar.$refs.scroll.refresh();
      });
  },
  methods: {
    // 点击分类获取其分类列表
    barClick(maitKey, miniWallkey) {
      this.getCategoryList(maitKey);
      this.getCategoryDetail(miniWallkey, this.currentType);
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    // 网络请求
    // 请求分类列表
    getCategoryList(key) {
      getCategoryList(key).then(res => {
        this.categoryList = res.data.list;
      });
    },
    // 请求分类详情列表
    getCategoryDetail(miniWallkey, type) {
      getCategoryDetail(miniWallkey, type).then(res => {
        this.categoryDetail[type] = res;
      });
    },
  },
};
</script>
<style scoped>
.nav {
  background-color: #ff8198;
  color: #fff;
  font-weight: bold;
}
.content {
  display: flex;
  width: 100%;
  overflow: hidden;
}
.slideBar {
  width: 30vw;
  background-color: #f6f6f6;
}
.categoryList {
  width: 70vw;
}
</style>
