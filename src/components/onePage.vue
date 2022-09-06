<template>
    <div class="onePage">
        <div class="baseInfo">
            <div class="avatar" :style="styles[choose].avatar">
                <div class="mask">
                    <span class="iconfont larry-shangchuan"></span>
                </div>
                <div class="img">
                    <img src="https://tse1-mm.cn.bing.net/th/id/OIP-C.-Y6GWK22W7Zxt2_sVtyZ7gHaHa?w=181&h=181&c=7&r=0&o=5&pid=1.7"
                        alt="">
                </div>
            </div>
            <div class="name">
                <span>菜须坤</span>
            </div>
            <div class="infos">
                <div class="infosItem">
                    <span class="itemTitle">籍贯</span>
                    <span>阿麦瑞可</span>
                </div>
                <div class="infosItem">
                    <span class="itemTitle">经验</span>
                    <span>2.5年</span>
                </div>
                <div class="infosItem">
                    <span class="itemTitle">性别</span>
                    <span>保密</span>
                </div>
                <div class="infosItem">
                    <span class="itemTitle">生日</span>
                    <span>
                        1998年8月2日
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            choose: 0,
            styles: [
                {
                    id: 0,
                    avatar: 'width: 130px;height: 130px;background: #ddd;border-radius: 100px;'
                }
            ]
        };
    },
    created() {

    },
    mounted() {

    },
    methods: {

    }
};
</script>

<style scoped lang="less">
.onePage {
    padding: 20px;
    display: flex;
}

.baseInfo {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .infos {
        .infosItem {
            padding: 10px 0;

            .itemTitle {
                min-width: 70px;
                display: inline-block;
            }
        }

    }

    .avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        overflow: hidden;
        position: relative;

        .img {
            position: absolute;
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .mask {
            position: absolute;
            height: 100%;
            width: 100%;
            background: #000;
            opacity: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: 0.2s;
            z-index: 2;

            span {
                font-size: 28px;
                color: #fff;
            }
        }
    }

    .avatar:hover {
        .mask {
            transition: 0.2s;
            opacity: 0.6;
        }
    }
}
</style>
