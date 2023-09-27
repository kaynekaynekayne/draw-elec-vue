<template>
    <b-row>
        <b-col cols="3">
            <strong>종합결과코드</strong>
        </b-col>
        <b-col>
            <b-input-group size="sm">
                <b-form-input list="skmcSearch" size="sm" v-model="searchText" placeholder="search"></b-form-input>
                <datalist id="skmcSearch">
                    <option v-for="(resultItem, index) in overallResultCdOptions"
                        :key="index"
                        @click="onChangeResultCd(resultItem)">
                        {{resultItem.text}}
                    </option>
                </datalist>
                <!-- <template #append>
                <b-dropdown size="sm"
                ref="dropdown"
                class="dropDownStyle"
                toggle-class="text-decoration-none">
                <b-dropdown-item href="#"
                    v-for="(resultItem, index) in overallResultCdOptions"
                    :key="index"
                    @click="onChangeResultCd(resultItem)"
                >
                    <span>{{resultItem.text}}</span>
                </b-dropdown-item>
                </b-dropdown>
            </template> -->
            </b-input-group>
        </b-col>
        <b-col cols="1">
            <b-button class="custom-blue-btn" @click="onResultSave" size="sm">Save</b-button>
        </b-col>
        <b-col class="text-right pt-1" cols="2">
            <b-icon class="pointer" icon="plus-circle" @click="onAddResultCd"></b-icon>
            <b-icon class="pointer" icon="dash-circle" @click="onRemoveResultCd"></b-icon>
        </b-col>



        <!--기존 select remark-->
        <b-col>
            <b-button class="custom-blue-btn w-100 mt-2" @click="onSelectRemark" size="sm">Select remark</b-button>
            <b-button class="custom-blue-btn w-100 mt-2" @click="onDeleteRemark" size="sm">Delete remark</b-button>
        </b-col>
    </b-row>
</template>

<script>
    export default {
        name:'report',
        data(){
            return{
                searchText:"",
                overallResultCd: '00',
                overallResultCdOptions:[]
         
            }
        },
        methods:{
            onSelectRemark(){
                this.$modal.show(ModalSkmcRemark, {}, {
                    //ModalSkmcRemark (/Components/Common/ModalSkmcRemark)
                    height: '900',
                    width: '800px'
                })
            },
            onChangeResultCd (item) {
                console.log(item);
                this.overallResultCd = item.value
                this.searchText = item.text

                ipcRenderer.send(Constant.GET_SKMC_FAVORITE, JSON.stringify({resultCd: this.overallResultCd}))
            },
        },
        mounted(){
            var self=this
                  
            ipcRenderer.on(Constant.GET_SKMC_RESULT_CD, function (event, result) {
                console.log(result)

                result.forEach(function(item) {
                    self.overallResultCdOptions.push({value: item.RESULT_CD, text: item.RESULT_CD_NM})
                })

            })
        }
    }
</script>