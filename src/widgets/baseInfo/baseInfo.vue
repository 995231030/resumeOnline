<template>
    <div id="widgetsBox_baseInfo">
        <div id="widgets_name">{{handleData("name")}}</div>
        <div id="widgets_sex">{{handleData("sex")}}</div>
        <div id="widgets_birthday">{{handleData("birthday")}}</div>
        <div id="widgets_nativePlace">{{handleData("nativePlace")}}</div>
        <div id="widgets_handsOnBackground">{{handleData("handsOnBackground")}}</div>
        <div id="widgets_phone">{{handleData("phone")}}</div>
        <div id="widgets_avatar">{{handleData("avatar")}}</div>
    </div>
</template>

<script>
// 此组件应该被视作第三方组件

import { val } from 'dom7';

// 此组件应该拥有自己的自定义字段，并且向vuex注册自己的字段
export default {
    data() {
        return {
        };
    },
    props: [
    ],
    beforeCreate() {
        // this.$store.state.widgetsKeysList 在此定义自定义自己的字段 遵循如下格式
        this.$store.state.widgetsKeysList.baseInfo = {
            name: "baseInfo",
            dataKey: {
                name: "name",
                sex: "sex",
                birthday: "birthday",
                nativePlace: "nativePlace",
                handsOnBackground: "handsOnBackground",
                phone: "phone",
                avatar: {
                    src: "https://tse4-mm.cn.bing.net/th/id/OIP-C.K6a_gZWDMTSEPMp9YnkziwHaE7?w=255&h=180&c=7&r=0&o=5&pid=1.7",
                    type: "img",
                    attr: ["src"]
                }
            }
        }
    },
    created() {

    },
    mounted() {
        console.log("baseInfo,小组件")
    },
    methods: {
        // "widgets_" + keyName == 组件id
        handleData(key) {
            let value = this.$store.state.widgetsKeysList.baseInfo.dataKey[key]
            if (value instanceof Object) {
                let dom = document.createElement(value.type)
                dom[value.attr[0]] = value[value.attr[0]]
                console.log(document.getElementById(`widgets_${key}`))
                if (document.getElementById(`widgets_${key}`) != null)
                    document.getElementById(`widgets_${key}`).appendChild(dom)
                return
            }
            return value
        }
        // 此方法预计挪到页面上，做一个通用的处理方法，渲染所有组件的数据，因为在这里和dom的生成是同步的，造成了很多困扰
    }
};
</script>

<style scoped lang="less">

</style>
