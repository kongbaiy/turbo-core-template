import { initGlobalState, MicroAppStateActions } from 'qiankun'

const state = {
    menu: [],
}
const actions: MicroAppStateActions = initGlobalState(state)

export default actions
