import { request } from "./request";

// 获取分类信息
export function getCategory() {
  return request({
    url: "/category",
  });
}
// 获取具体分类列表
export function getCategoryList(maitKey) {
  return request({
    url: "/subcategory",
    params: {
      maitKey,
    },
  });
}
// 获取分类详情列表
export function getCategoryDetail(miniWallkey, type) {
  return request({
    url: "/subcategory/detail",
    params: {
      miniWallkey,
      type,
    },
  });
}
