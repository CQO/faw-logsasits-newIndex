<template>
  <div class="">
    <div style="display:flex" class="topForm">
        <div style="color: #fff;line-height:60px">
      <span>准点率分析</span>
    </div>
      <el-form label-width="120px" style="margin-right: 20px">
        <el-row :gutter="40">
          <el-col :md="10">
            <el-form-item label="运单号">
              <el-input
                v-model="formZdlfxValue.ydh"
                style="width: 90%"
                placeholder="请输入运单号"
              />
            </el-form-item>
          </el-col>
          <el-col :md="10">
            <el-form-item label="运输企业">
              <el-select
                style="z-index: 3000"
                clearable
                placeholder="请选择"
                v-model="formZdlfxValue.ysqy"
                @change="currWorkTypeChange"
              >
                <el-option
                  v-for="item in jsStatus"
                  :key="item.supplierCode"
                  :label="item.name"
                  :value="item.supplierCode"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="3">
            <div class="btnSty" @click="handleZdlfxSearch">查询</div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="titlehead">
      <div class="" style="margin-left: 1px; flex: 1; display: flex">
        <div class="cbycitemlaner">运输企业</div>
        <div class="cbycitemlaner">运单号</div>
        <div class="cbycitemlaner">运输类型</div>
        <div class="cbycitemlaner">计划到达时间</div>
        <div class="cbycitemlaner">实际到达时间</div>
      </div>
    </div>
    <div class="mainLisy">
      <div class="mainListItem" v-for="item in getZdlfxData">
        <div class="cbycitemlaner">{{ item.businessCode }}</div>
        <div class="cbycitemlaner contentOver" :title="item.waybillNo">
          {{ item.waybillNo }}
        </div>
        <div class="cbycitemlaner contentOver" :title="item.transportType">
          {{ item.transportType }}
        </div>
        <div class="cbycitemlaner contentOver" :title="item.planTime">
          {{ item.planTime }}
        </div>
        <div class="cbycitemlaner">{{ item.arriveTime }}</div>
      </div>
      <el-pagination
        class="pageAtion"
        background
        layout="prev, pager, next"
        :total="ZdlfxTotal"
        :page-size="9"
        @size-change="handleSizeZdlfxChange"
        @current-change="handleCurrentZdlfxChange"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import getPlanMonitorDataApi from "@/api/modules/homePage";

export default {
  data() {
    return {
      getZdlfxData: [],
      jsStatus: [],
      ZdlfxTotal: 0,
      formZdlfxValue: {
        page: 1,
        pageSize: 9,
        ydh: "",
        ysqy: "",
      },
    };
  },
  mounted() {
    this.getZdlfxList();
    this.getYsqyList();
  },
  methods: {
    getYsqyList() {
      getPlanMonitorDataApi.getWlqyListData({}).then((res) => {
        this.jsStatus = res.list;
      });
    },
    handleZdlfxSearch() {
      this.formZdlfxValue.page = 1;
      this.getZdlfxList();
    },
    handleSizeZdlfxChange(val) {
      this.formZdlfxValue.pageSize = val;
      this.getZdlfxList();
    },
    handleCurrentZdlfxChange(val) {
      this.formZdlfxValue.page = val;
      this.getZdlfxList();
    },
    currWorkTypeChange() {},
    getZdlfxList() {
      let params = {
        page: this.formZdlfxValue.page,
        pageSize: this.formZdlfxValue.pageSize,
        m: {
          waybillNo: this.formZdlfxValue.ydh,
          businessCode: this.formZdlfxValue.ysqy,
        },
      };
      getPlanMonitorDataApi.getZdlfxListData(params).then((res) => {
        this.getZdlfxData = res.pd.rows;
        this.ZdlfxTotal = res.pd.total;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.titlehead {
  width: 100%;
  background: #054480;
  height: 47px;
  line-height: 47px;
  color: #7bffff;
  display: flex;
  justify-content: space-around;
}
.mainListItem {
  justify-content: space-around;
  display: flex;
  color: #fff;
  background: #054480;
  height: 37px;
  line-height: 37px;
  margin-top: 5px;
  flex: 1;
  &:hover {
    border: 1px solid #01ffff;
    box-shadow: 0 0 15px #386fcf !important;
  }
  .itemlaner {
    flex: 1;
    text-align: center;
    margin-left: 1px;
  }
}
.cbycitemlaner {
  text-align: center;
  width: 16.6%;
  flex: 1;
}
.contentOver {
  width: 16.6%;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.pageAtion {
  width: 100%;
  text-align: center;
}
.btnSty {
  width: 123px;
  height: 40px;
  background: rgba(0, 47, 81, 0.1);
  box-shadow: inset 0 0 20px 0 #00d1ff;
  border-radius: 5px 5px 5px 5px;
  opacity: 1;
  border: 1px solid #36aaff;
  color: #fff;
  text-align: center;
  line-height: 40px;
}
.topForm{
    display:flex;
    justify-content: space-between;
}
</style>