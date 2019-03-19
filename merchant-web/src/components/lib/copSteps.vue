<template>
  <div class="authent_progress">
    <ul class="progress" >
      <li v-for="(item,index) in stepsData" :class="{active:isActive == index}" >
        <div class="progress_top">
          <div class="progress_line"></div>
          <div class="progress_iconbox">
            <span class="progress_icon">{{item.name}}</span>
          </div>
        </div>
        <p class="progress_text">{{item.text}}</p>
      </li>

    </ul>
    </div>
</template>
<script>
    export default{
        name: "copSteps",
        props:['stepsIndex'],
        data(){
            return {
              isActive:0,

              stepsData:[
                {name:1,text:'填写基本信息'},
                {name:2,text:'填写银行账号信息'},
                {name:3,text:'申请提交成功'}
              ]
            }
        },
        methods: {
          changeStepsIndex(data,index){
            var that  = this;
            index = parseInt(index);
            if(data && data !== '')  that.stepsData = data;
            var len   = that.stepsData.length;
            if(index && index < len ){
              that.isActive = index;
            }


          }
        },

      created(){

      }
    }
</script>
<style scoped>
  .progress{
    position: relative;
    width: 100%;
    display: inline-block;
  }
  .progress li{
    float: left;
    width: 33%;
    vertical-align: middle;
    height: 80px;
  }
  .progress_top{
    height: 40px;
    line-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .progress_iconbox{
    position: absolute;
    width: 60px;
    z-index: 30;
    background: white;
    text-align: center;
  }
  .progress_icon{

    display: inline-block;
    background-image: url("../../assets/img/jinduno.png");
    background-repeat:no-repeat;
    background-size:contain;
    color: white;
    width: 40px;
    height: 40px;
    font-weight: bold;
    background-position-x: center;
  }
  .progress_line{
    height: 3px;
    width: 100%;
    position: relative;
    background: #d2d2d2;
  }
  .progress_text{
    text-align: center;
    color:#d2d2d2 ;
    font-size: 15px;
    padding-top:15px;

  }
  .active .progress_line,.sucItems .progress_line{
    background: #333333;
  }
  .active .progress_iconbox .progress_icon,.sucItems .progress_iconbox .progress_icon{
    background-image: url("../../assets/img/jinduyes.png");
    background-repeat:no-repeat;
    background-size:contain;
    background-position-x: center;
  }
  .active .progress_text,.sucItems .progress_text{
    color: #333333;
  }

</style>
