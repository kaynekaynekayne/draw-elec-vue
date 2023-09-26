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
                        <b-col v-for="(p, i) in pages" :key="i" @click="onClickTab(p)"></b-col>
                    </b-row>
                </b-col>
                <b-col></b-col>
                <b-col></b-col>
                <b-col></b-col>
            </b-row>
        </div>
    </b-overlay>
</template>

<script>
    export default {
        methods:{
            onClickTab(page){
                
            }
        }
    }
</script>