import { request } from "./request";

export function getDetail(iid) {
  return request({
    url: "/detail",
    params: {
      iid,
    },
  });
}

export function getRecommend() {
  return request({
    url: "/recommend",
  });
}

export class BaseInfo {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.price = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discountBgColor = itemInfo.discountBgColor;
    this.discountDesc = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
  }
}

export class ShopInfo {
  constructor(shopInfo) {
    this.shopLogo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.cGoods = shopInfo.cGoods;
    this.score = shopInfo.score;
    this.cSells = shopInfo.cSells;
  }
}

export class GoodsInfo {
  constructor(goodsInfo) {
    this.desc = goodsInfo.desc;
    this.detailImage = goodsInfo.detailImage;
  }
}

export class ParamsInfo {
  constructor(paramsInfo) {
    this.info = paramsInfo.info;
    this.rule = paramsInfo.rule;
    this.images = paramsInfo.info.images ? paramsInfo.info.images[0] : "";
    this.disclaimer = paramsInfo.rule.disclaimer
      ? paramsInfo.rule.disclaimer
      : "";
  }
}

export class RateInfo {
  constructor(rate) {
    this.user = rate.user;
    this.content = rate.content;
    this.created = rate.created;
    this.style = rate.style;
    this.extraInfo = rate.extraInfo ? rate.extraInfo : "";
    this.images = rate.images ? rate.images : "";
    this.explain = rate.explain ? rate.explain : "";
  }
}

export class SkuInfo {
  constructor(skuInfo, topImages, shopInfo, iid) {
    this.skus = skuInfo.skus;
    this.style = skuInfo.props[0].list;
    this.size = skuInfo.props[1].list;
    this.defaultImg = topImages[0];
    this.topImg = topImages[0];
    this.defaultPrice = skuInfo.defaultPrice;
    this.price = skuInfo.defaultPrice;
    this.styleKey = skuInfo.styleKey;
    this.sizeKey = skuInfo.sizeKey;
    this.title = skuInfo.title;
    this.shopName = shopInfo.name;
    this.iid = iid;
  }
}
