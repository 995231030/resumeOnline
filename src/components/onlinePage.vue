<template>
    <div>
        <mainWidgets ></mainWidgets>
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
        };
    },
    created() {

    },
    mounted() {
        console.log("page，页面")
        this.$store.state.widgetsKeysList.baseInfo.dataKey.name = "朱永博"
    },
    methods: {

    }
};
</script>

<style scoped lang="less">

</style>
