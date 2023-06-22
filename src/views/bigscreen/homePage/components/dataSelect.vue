<template>
    <div class="dataSelect">
      <el-date-picker v-model="yearVal" type="year" placeholder="选择年度" style="width: 100%" @change="changeYear"></el-date-picker>
    </div>  
</template>

<script>
export default {
  name: "dataSelect",
  components: {},
  data() {
    return {
      yearVal: sessionStorage.getItem('year') || '2023'
    }
  },
  methods: {
    changeYear(e) {
      this.yearVal = e;
      const year = new Date(e).getFullYear();
      sessionStorage.setItem('year', year)
      window.location.reload();
    }
    
  },
  created(){    
  }
}
</script>

<style scoped lang="scss">
.dataSelect{
  width: 100px;
  ::v-deep .el-input--suffix .el-input__inner{
    padding-right: 0;
  }
  ::v-deep .el-input__icon{
    line-height: 24px;
  }
}
</style>
