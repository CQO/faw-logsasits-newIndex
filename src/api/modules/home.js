import $api from '@/api/index'

/**
 * 顶部信息 -> 交付及时率
 */
function fetchTopTimelyDeliveryRate(data) { return $api.get('/stat/backstage/top-timely-delivery-rate', data) }

/**
 * 顶部信息 -> 采购入库实现遵守率
 */
function fetchTopPurchaseInstoreQtyRate(data) { return $api.get('/stat/backstage/top-purchase-instore-qty-rate', data ) }

/**
 * 顶部信息 -> 出库及时率
 */
function fetchTopOutStoreRate(data) { return $api.get('/stat/backstage/top-out-store-rate', data) }

/**
 * 计算左侧图表 - > 入库时长分布
 */
function fetchLeftInStoreTimeDistribution(data) { return $api.get('/stat/backstage/left_in_store_time_distribution', data) }

/**
 * 计算左侧图表 - > 采购入库时限遵守率
 */
function fetchLeftPurchaseInstoreQtyTrend(data) { return $api.get('/stat/backstage/left-purchase-instore-qty-trend', data) }

/**
 * 计算左侧图表 - > 城市订单区域排名
 */
function fetchLeftCityRank(data) { return $api.get('/stat/backstage/left-city-rank', data) }

/**
 * 计算左侧图表 - > 上月移库订单占比
 */
function fetchLeftLastMonthTansferLibrary(data) { return $api.get('/stat/backstage/left-last-month-tansfer-library', data) }


/**
 * 计算中间图表 - > 当日累计入库
 */
function fetchCenterCurrDaySumInStore(data) { return $api.get('/stat/backstage/center-curr-day-sum-in-store', data) }


/**
 * 计算中间图表 - > 当日累计出库
 */
function fetchCenterCurrDaySumOutStore(data) { return $api.get('/stat/backstage/center-curr-day-sum-out-store', data) }


/**
 * 计算中间图表 - > 紧急订单及时出库率
 */
function fetchCenterOutStoreRate(data) { return $api.get('/stat/backstage/center-out-store-rate', data) }


/**
 * 计算右侧图表 - > 库存周转率
 */
function fetchRightStockTurnoverRate(data) { return $api.get('/stat/backstage/right_stock_turnover_rate', data) }


/**
 * 计算右侧图表 - > 滞销率
 */
function fetchRightUnsalableRate(data) { return $api.get('/stat/backstage/right_unsalable_rate', data) }


/**
 * 计算右侧图表 - > 出库时长分布
 */
function fetchRightOrderExWarehouseDuration(data) { return $api.get('/stat/backstage/right-order-ex-warehouse-duration', data) }

/**
 * 计算右侧图表 -> 订单出库实现遵守率
 */
function fetchRightOutStoreQtyTrend(data) { return $api.get('/stat/backstage/right-out-store-qty-trend', data) }

/**
 * 计算右侧图表 -> 紧急订单出库实现遵守率
 */
function fetchRightOutStoreQtyTrendByJj(data) { return $api.get('/stat/backstage/right-out-store-qty-trend-jj', data) }

/**
 * 计算中间图表 -> 获取当前库存数量
 */
function fetchCenterOutstoreQtyTrend(data) { return $api.get('/stat/backstage/center-outstore-qty-trend', data) }

/**
 * 计算中间图表 -> 获取当前库存数量(前几日)
 */
function fetchCenterCurrStockPreDay(data) { return $api.get('/stat/backstage/center-curr-stock-pre-day', data) }

/**
 * 计算中间图表 -> 获取当昨日库存平效
 */
function fetchCenterStockFlatEffect(data) { return $api.get('/stat/backstage/center-stock-flat-effect', data) }

export default {
    fetchTopTimelyDeliveryRate, fetchTopPurchaseInstoreQtyRate, fetchTopOutStoreRate, fetchLeftInStoreTimeDistribution, fetchLeftPurchaseInstoreQtyTrend,
    fetchLeftCityRank, fetchLeftLastMonthTansferLibrary,
    fetchCenterCurrDaySumInStore, fetchCenterCurrDaySumOutStore, fetchCenterOutStoreRate, fetchRightStockTurnoverRate, fetchRightUnsalableRate,
    fetchRightOrderExWarehouseDuration, fetchRightOutStoreQtyTrend, fetchRightOutStoreQtyTrendByJj, fetchCenterOutstoreQtyTrend,
    fetchCenterStockFlatEffect, fetchCenterCurrStockPreDay
}
