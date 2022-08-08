<template>
    <div>
        mianPage
        <div>
            this page is about baseInfo
        </div>
        <div class="login btn" @click="toLogin">
            登录
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {

    data() {
        return {

        };
    },
    created() {

    },
    mounted() {

    },
    setup() {
        const router = useRouter()
        const toLogin = (() => {
            router.push({
                name: 'loginRegister'
            })
        })
        return {
            toLogin
        }
    },
    methods: {
    }
};
</script>

<style scoped lang="less">
.login {
    position: absolute;
    top: 20px;
    right: 20px;
    border: 1px solid #0051ff;
    padding: 2px 5px;
    border-radius: 8px;
    color: #0051ff;
    font-size: 12px;
}
</style>
