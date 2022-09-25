<template>
    <div>
        <!-- <div>{{baseInfo.name}}</div>
        <div>{{baseInfo.sex}}</div>
        <div>{{baseInfo.birthday}}</div>
        <div>{{baseInfo.nativePlace}}</div>
        <div>{{baseInfo.handsOnBackground}}</div>
        <div>{{baseInfo.phone}}</div>
        <div>{{baseInfo.avatar}}</div> -->
    </div>
</template>

<script>
// 此组件应该被视作第三方组件
// 此组件应该拥有自己的自定义字段，再prop中，并且向vuex注册自己的字段
export default {
    data() {
        return {
        };
    },
    props: [
        "baseInfo",
        "name",
        "sex",
        "birthday",
        "nativePlace",
        "handsOnBackground",
        "phone",
        "avatar"
    ],
    created() {

    },
    mounted() {
        console.log("baseInfo,小组件")
        this.$store.state.widgetsKeysList.baseInfo = {
            name: "baseInfo",
            dataKey: {
                name: "name",
                sex: "sex",
                birthday: "birthday",
                nativePlace: "nativePlace",
                handsOnBackground: "handsOnBackground",
                phone: "phone",
                avatar: "avatar"
            }
        }
    },
    methods: {

    }
};
</script>

<style scoped lang="less">

</style>
