<template>
  <div class="icon_progress">
    <ul class="progress" >
      <li>
        <div class="progress_top">
          <div class="progress_line"></div>
          <div class="progress_iconbox">
            <span class="progress_icon1"></span>
          </div>
        </div>
        <p class="progress_title">{{stepsData.one.title}}</p>
        <p class="progress_text" v-show="stepsData.one.isShowTip">{{stepsData.one.text}}</p>
      </li>
      <li>
        <div class="progress_top">
          <div class="progress_line"></div>
          <div class="progress_iconbox">
            <span class="progress_icon2"></span>
          </div>
        </div>
        <p class="progress_title">{{stepsData.two.title}}</p>
        <p class="progress_text" v-show="stepsData.two.isShowTip">{{stepsData.two.text}}</p>
      </li>
      <li>
        <div class="progress_top">
          <div class="progress_line"></div>
          <div class="progress_iconbox">
            <span class="progress_icon3"></span>
          </div>
        </div>
        <p class="progress_title nocheckStep">{{stepsData.three.title}}</p>
        <p class="progress_text" v-show="stepsData.three.isShowTip">{{stepsData.three.text}}</p>
      </li>
    </ul>

    </div>
</template>
<script>
    export default{
      name: "copIconSteps",
      props: ['stepParams'],
      data(){
        return {
          isActive: 0,
          isShowTips: true,
          stepsData: {
            one: {name: 1, title: '提交成功', text: '提交成功', isShowTip: true},
            two: {name: 2, title: '银行处理中', text: '银行处理中', isShowTip: true},
            three: {name: 3, title: '提现到账', text: '提现到账', isShowTip: false}
          }
        }
      },

        methods: {
          changeStepsIndex(data,index){
            console.log("data:",data,"index:",index);

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
        console.log("StepParamsq:",this.stepParams);

        if(this.stepParams ){
          this.stepsData = this.stepParams
        }

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
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .progress_iconbox span{
    display: inline-block;
    width: 40px;
    height: 40px;
  }
  .progress_icon1{
    background-image: url("../../assets/img/finish.png");
    background-repeat:no-repeat;
    background-size:contain;
    background-position-x: center;
  }
  .progress_icon2{
    background-image: url("../../assets/img/checking.png");
    background-repeat:no-repeat;
    background-size:contain;
    background-position-x: center;
  }
  .progress_icon3{
    background-image: url("../../assets/img/endB.png");
    background-repeat:no-repeat;
    background-size:contain;
    background-position-x: center;
  }
  .progress_line{
    height: 3px;
    width: 100%;
    position: relative;
    background: #7fba00;
  }
  .progress_text{
    color:#d2d2d2 ;
    font-size: 13px;
  }
  .progress_text,.progress_title{
    text-align: center;
    padding-top:15px;
  }
  .progress_title{
    font-size: 15px;
  }

.nocheckStep{
  color:#d2d2d2 !important;
}
</style>
