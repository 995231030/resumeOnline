<template>
    <div class="iconBox">
        <div :class="'iconfont ' + icon">
            {{ innerText }}
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        };
    },
    created() {

    },
    mounted() {

    },
    props: {
        innerText: {
            type: String,
            value: ""
        },
        icon: {
            type: String,
            value: ""
        }
    },
    methods: {

    }
};
</script>

<style scoped lang="less">
.iconfont {
    cursor: pointer;
    color: #0051ff;
}
</style>
