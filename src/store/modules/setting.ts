import { defineStore } from 'pinia'

const useLayoutSettingStore = defineStore('SettingStore', {
    state: () => {
       return {
        isExpand:true,//菜单展开与否
        refresh:true,
       } 
    },
    actions: {
         expandChange() {
            this.isExpand = !this.isExpand;
        },
        refreshChange() {
            this.refresh = !this.refresh
        },
    }
})

export default useLayoutSettingStore