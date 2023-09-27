<template>
    <!-- b-overlay 전체를 감싼다-->
    <b-overlay :show="overlayShow" opacity="0.5" rounded="sm" style="color:white">
        <!--빙글빙글 도는 원형 화살표-->
        <template v-slot:overlay>
            <div class="text-center">
                <b-icon icon="arrow-clockwise" font-scale="3" animation="spin"></b-icon>
                <p id="cancel-label">please wait...</p>
            </div>
        </template>

        <!--상단 메뉴-->
        <div class="navHome">
            <b-row>
                <b-col>
                    <b-row>
                        <b-col v-for="(page, i) in pages" :key="i" @click="onClickTab(page)">
                            <img v-if="page.isSelect" class="imgSelect" :src="page.imgPath"/>
                            <img v-else class="imgNonSelect" :src="page.imgPath"/>
                            <div>{{page.text}}</div>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col>
                    
                </b-col>
                <b-col></b-col>
                <b-col></b-col>
            </b-row>
        </div>
    </b-overlay>
</template>
   
<script>
    export default {
        data(){
            return{
                pages:[
                    {
                        id:1, 
                        text:'Setting', 
                        imgPath:require('@/assets/test/ic_settings_white_48dp.png'), 
                        childrenPage:'/homePage/settings',
                        isSelect:false
                    },
                    {
                        id:2,
                        text:'Analysis',
                        imgPath: require('@/assets/test/ic_camera_white_48dp.png'),
                        childrenPage:'/homePage/test',
                        isSelect:true //첫 화면이 analysis
                    },
                    {
                        id:3,
                        text:'Database',
                        imgPath: require('@/assets/test/ic_chrome_reader_mode_white_48dp.png'),
                        childrenPage:'/homePage/result',
                        isSelect:false
                    }                    
                ],
                runningIntervalId: null,

            }
        },
        methods:{
            onClickTab(page){
                var self=this
                
                //장비 돌아가고 있을 땐 setting으로 이동 못 함
                if(this.$store.getters.getRunningState && //default는 false
                    page.childrenPage!=='/homePage/result' &&
                    page.childrenPage!=='homePage/test') {
                        this.$toasted.show(Constant.IDS_ERROR_ALREADY_RUNNING, {
                        //IDS_ERROR_ALREADY_RUNNING: 'Process is already running.',
                        position: 'bottom-center',
                        duration: '2000'
                    })
                      return
                }

                // 클릭된 메뉴의 isSelect가 true 되고 나머진 false됨
                if(this.$route.path!==page.childrenPage){ // 둘다 '/homePage/xx' 이런 형식
                    for(var i=0; i<this.pages.length; i++){
                        this.pages[i].isSelect=false
                    }
                }
                page.isSelect=true

                // tab 변경후 재진입시 화면 load
                //?
                if(page.id===2 && this.getPauseState){
                    this.runningIntervalId=setInterval(function(){
                        self.sendRunningInfo()
                    },500)
                }
                this.$router.push(page.childrenPage)

                // isPauseState:false
                
                //  getPauseState: (state) => {
                //     return state.isPauseState
                //   }


                // TabPages/Test/ExecController.vue

                //   sendRunningInfo () {
                //     var params = {
                //       jobCmd: 'RUNNING_INFO',
                //       reqUserId: this.currentUser.userId,
                //       reqDttm: this.$getDateTimeStr()
                //     }

                //     worker.sendDataToServer(this, JSON.stringify(params))
                //   }
            
            }
        }
    }
</script>