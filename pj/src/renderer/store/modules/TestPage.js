const INIT_TEST_PAGE={
    isRunning:false
}

const state=INIT_TEST_PAGE;

const getters={
    getRunningState:state=>{
        return state.isRunning
    }
}