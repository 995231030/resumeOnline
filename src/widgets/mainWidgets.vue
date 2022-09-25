<template>
    <div>
        <baseInfoVue :baseInfo="jsonData.baseInfo"></baseInfoVue>
    </div>
</template>

<script>
import baseInfoVue from './baseInfo/baseInfo.vue';
export default {
    components: {
        baseInfoVue
    },
    data() {
        return {

        };
    },
    props: ["jsonData"],
    created() {

    },
    mounted() {
        console.log("mainWidgets")
    },
    methods: {

    }
};
</script>

<style scoped lang="less">

</style>
