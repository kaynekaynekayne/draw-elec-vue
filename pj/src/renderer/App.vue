<template>
  <div id="app">
    <!-- <router-view></router-view> -->
    <b-row>
      <b-col><strong>리마크 선택</strong></b-col>
      <b-col>
        <b-form-input
          size="sm"
          placeholder="remark"
          autocomplete="off"
          v-model="searchRemark"
          @focus="onFocusDataRemark"
          @blur="onFocusOutDataRemark"
          @keyup.enter="onEnterRemark"
          @keydown.up="onKeyUp"
          @keydown.down="onKeyDown"
          ref="remarkInput"
        ></b-form-input>
        <div class="searchFrame remarkSearch" v-show="inputFocusRemark" ref="scrollContainer">
          <div
            class="dataRemarkOptions"
            v-for="(opt,i) in remarkOptions"
            :key="i"
            :value="opt.title"
            :class="{active:i===selectedOption}"
            @mouseenter="onMouseEnter(i)"
            @click="onChangeRemarkCd(opt)"
            ref="option"
          >
            {{opt.title}}
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        searchRemark:'',
        inputFocusRemark:false,
        selectedOption:-1,
        remarkOptions:[{title:"1",content:"zzz"},{title:"2",content:"xvdvx"},{title:"3",content:"sdfsdfsdfsd"}]
      }
    },
    methods:{
      // @focus 인풋을 클릭(포커스)하면 onFocusDataRemark 실행
      // @blur 인풋 밖을 클릭(아웃포커스)하면 onFocusOutDataRemark 실행

      onFocusDataRemark(evt){
        this.inputFocusRemark=true
      },
      onFocusOutDataRemark(evt){
        var self=this;
        setTimeout(function(){
          self.inputFocusRemark=false
        },300)
      },
      onEnterRemark(){
        
      },
      onKeyUp(){
        if(this.selectedOption>0){
          this.selectedOption--;
          this.onScrollOption();
        }
      },
      onKeyDown(){
        if(this.selectedOption<this.remarkOptions.length-1){
          this.selectedOption++;
          this.onScrollOption();
        }
      },
      onScrollOption(){
        var container=this.$refs.scrollContainer;
        var option=this.$refs.option[this.selectedOption]; //selectedOption -> 숫자
        if(){
          
        }
      }

    }
  }
</script>

<style>
  /* CSS */
</style>
