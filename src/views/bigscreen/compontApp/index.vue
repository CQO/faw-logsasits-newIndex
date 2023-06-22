<template>
    <div class="">
        <transition name="fade">
            <div class="submit-success" v-show="isSuccess">
              <div class="word">提交成功</div>
            </div>
          </transition>
          <div @click="submit">提交</div>
    </div>
</template>

<script>

import homePage  from "../homePage";
import deploymentForce from '../index.vue'
export default {
    name:'',
    components:{
        homePage,
        deploymentForce
    },
    data(){
        return {
            isSuccess: false
        }
    },
    methods:{
        toBigSvrenInd(){
            this.show=!this.show
        },
        submit() {
      this.isSuccess = true
      setTimeout(() => {
        this.isSuccess = false
      }, 2000)
    }
    }
}
</script>
<style>
.fade-leave,
.fade-enter-to {
    opacity: 1;
}
.fade-leave-active,
.fade-enter-active {
    transition: all 10.5s;
}
.fade-leave-to,
.fade-enter {
    opacity: 0;
}
</style>
