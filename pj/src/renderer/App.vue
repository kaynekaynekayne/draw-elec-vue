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
  <!--
    ExceController.vue 얘기

    ✅ renderer/store/modules/Testpage.js

    const INIT_TEST_PAGE={
      testType:Object.freeze([
        { value: '01', text: 'PB standard(WBC Diff)' },
        { value: '04', text: 'PB premium(PBS)' },
        { value: '02', text: 'Body fluid default' },
        { value: '03', text: 'Body fluid select' },
        { value: '05', text: 'Quality Check' }
      ])
    }
    
    const state=INIT_TEST_PAGE

    const getters={
      getTestType:state=>{
        return state.testType
      }
    }

    
    ✅ src/Constants.js

    export default Object.freeze({
      GET_TEST_TYPE: 'getTestType',
    }


    ✅ renderer/components/TabPages/Test/ExecController.vue
    
    <template>
      <b-col>
        <b-form-select :options='testTypeList'></b-form-select>
      </b-col>
    </template>
    <script>
      import {mapGetters} from 'vuex';
      import Constant from '../../../../Constant'

      export default {
        computed:{
          ...mapGetters({
            testTypeList:Constant.GET_TEST_TYPE,
          })
        }
      }
    
    
    </script>




  -->
</template>

<script>
  export default {
    data(){
      return{
        searchRemark:'',
        inputFocusRemark:false,
        selectedOption:-1,
        remarkOptions:[{title:"1",content:"zzz"},{title:"2",content:"xvdvx"},{title:"3",content:"sdfsdfsdfsd"}],
        remarkOptionsOrg:[],
        remarkContents:[]
      }
    },
    watch:{
      searchRemark:function(newVal, oldVal){
        // 값이 변경되면 아래 핸들러가 수행이 된다 
        var self=this;

        self.remarkOptions=self.remarkOptionsOrg.filter(function(codeItem){
          return codeItem.title.substr(0, newVal.length).toLowerCase() === newVal.toLowerCase()
        })
        this.inputFocusRemark = true

      }
    },
    mounted(){

      ipcRenderer.send(Constant.GET_SKMC_REMARK, null)

      ipcRenderer.on(Constant.GET_SKMC_REMARK, function(event,results){
        console.log("-----------------------")
        console.log("-----------------------")
        console.log("-----------------------")
        console.log(results);

        // 초기화 목적 -> 이거 아니면 데이터 중복돼서 쌓임
        self.remarkOptions=[]
        
        results.forEach(function(item){
          self.remarkOptions.push({title:item.REMARK_CD, content:item.REMARK_CONTENTS})
        })

        self.remarkOptionsOrg=self.remarkOptions;

      })
    },
    beforeDestroy(){
      ipcRenderer.removeAllListeners(Constant.GET_SKMC_REMARK)
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
        //selectedOption이 정상적인 범위 내에 있을 때
        if(this.selectedOption>=0 && this.selectedOption < this.remarkOptions.length){  
          this.searchRemark=this.remarkOptions[this.selectedOption].title
        }
        this.remarkOptions.forEach(opt=>{
          if(opt.title===this.searchRemark){
            var obj={
              remarkCd:opt.title,
              text:opt.content
            }
            this.remarkContents.push(obj);
          }
        })
        this.onFocusOutDataRemark()
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
        if(container && option){
          var containerRect=container.getBoundingClientRect();
          var optionRect=option.getBoundingClientRect();
          if(optionRect.bottom>containerRect.bottom){
            
          }
        }
      },
      onMouseEnter(index){
        //up-down키로 선택을 하다가도 마우스를 올리면 선택이 바뀜
        //이렇게 안 하면 두 경우 전부 선택됨
        this.selectedOption=index;
      },
      onchangeRemarkCd(item){ //item=opt
        this.searchRemark=item.title;
        this.$refs.remarkInput.focus();
      }

    }
  }
</script>

<style>
  /* CSS */
  .dataOptions,.dataRemarkOptions {
    color: black;
    cursor: pointer;
    z-index: 200;
  }

  .dataOptions:hover, .dataRemarkOptions.active {
    background-color: lightblue;
  }
</style>
