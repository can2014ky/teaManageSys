// 商品分类
const GoodsCategory = () =>
  import(/* webpackChunkName: "threatIntelligence" */ "@src/views/goodsCategory/Index.vue");
const Tea = () =>
  import(/* webpackChunkName: "goodsCategory" */ "@src/views/goodsCategory/tea/Index.vue");
const TeaSet = () =>
  import(/* webpackChunkName: "goodsCategory" */ "@src/views/goodsCategory/teaSet/Index.vue");
const SpecialProduct = () =>
  import(
    /* webpackChunkName: "goodsCategory" */ "@src/views/goodsCategory/specialProduct/Index.vue"
  );
const FarmProduct = () =>
  import(/* webpackChunkName: "goodsCategory" */ "@src/views/goodsCategory/farmProduct/Index.vue");
const TraditionalCulture = () =>
  import(
    /* webpackChunkName: "goodsCategory" */ "@src/views/goodsCategory/traditionalCulture/Index.vue"
  );
const OverseasPurchasing = () =>
  import(
    /* webpackChunkName: "goodsCategory" */ "@src/views/goodsCategory/overseasPurchasing/Index.vue"
  );

// 订单管理
const BillManage = () =>
  import(/* webpackChunkName: "goodsCategory" */ "@src/views/billManage/Index.vue");

// 爱心公益
const PublicWelfare = () =>
  import(/* webpackChunkName: "goodsCategory" */ "@src/views/publicWelfare/Index.vue");

// 权益中心
const BenefitCenter = () =>
  import(/* webpackChunkName: "goodsCategory" */ "@src/views/benefitCenter/Index.vue");

// 用户中心
const UserCenter = () =>
  import(/* webpackChunkName: "goodsCategory" */ "@src/views/userCenter/Index.vue");

export default [
  {
    path: "goodsCategory",
    name: "goodsCategory",
    component: GoodsCategory,
    meta: {
      name: "goodsCategory",
      title: "商品分类",
    },
    children: [
      {
        path: "",
        redirect: { name: "tea" },
      },
      {
        path: "tea",
        name: "tea",
        component: Tea,
        meta: {
          name: "tea",
          title: "茶叶",
        },
      },
      {
        path: "teaSet",
        name: "teaSet",
        component: TeaSet,
        meta: {
          name: "teaSet",
          title: "茶具",
        },
      },
      {
        path: "specialProduct",
        name: "specialProduct",
        component: SpecialProduct,
        meta: {
          name: "specialProduct",
          title: "特产",
        },
      },
      {
        path: "farmProduct",
        name: "farmProduct",
        component: FarmProduct,
        meta: {
          name: "farmProduct",
          title: "农产品",
        },
      },
      {
        path: "traditionalCulture",
        name: "traditionalCulture",
        component: TraditionalCulture,
        meta: {
          name: "traditionalCulture",
          title: "传统文化",
        },
      },
      {
        path: "overseasPurchasing",
        name: "overseasPurchasing",
        component: OverseasPurchasing,
        meta: {
          name: "overseasPurchasing",
          title: "海外代购",
        },
      },
    ],
  },
  {
    path: "billManage",
    name: "billManage",
    component: BillManage,
    meta: {
      name: "billManage",
      title: "订单管理",
    },
  },
  {
    path: "publicWelfare",
    name: "publicWelfare",
    component: PublicWelfare,
    meta: {
      name: "publicWelfare",
      title: "爱心公益",
    },
  },
  {
    path: "benefitCenter",
    name: "benefitCenter",
    component: BenefitCenter,
    meta: {
      name: "benefitCenter",
      title: "权益中心",
    },
  },
  {
    path: "userCenter",
    name: "userCenter",
    component: UserCenter,
    meta: {
      name: "userCenter",
      title: "用户中心",
    },
  },
];
