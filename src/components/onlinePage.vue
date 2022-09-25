<template>
    <div>
        <mainWidgets :jsonData="jsonData"></mainWidgets>
    </div>
</template>

<script>
import mainWidgets from '@/widgets/mainWidgets.vue';
export default {
    components: {
        mainWidgets
    },
    data() {
        return {
            jsonData: {
                // 此数据为小组件需要的数据，在这里定义好，然后直接传到mainWidgrts中再处理
            }
        };
    },
    created() {

    },
    mounted() {
        console.log("page")
        // let keysList = jsonpath.query(, "$..dataKey")
        // console.log(this.$store.state.widgetsKeysList)
        let vuexData = JSON.parse(JSON.stringify(this.$store.state.widgetsKeysList))
        for (let key in vuexData) {
            this.jsonData[vuexData[key].name] = vuexData[key].dataKey
        }
        console.log(this.jsonData)
    },
    methods: {

    }
};
</script>

<style scoped lang="less">

</style>
