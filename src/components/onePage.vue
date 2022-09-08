<template>
    <div class="onePage">
        <div class="baseInfo box">
            <div class="avatar" :style="styles[choose].avatar">
                <div class="mask">
                    <span class="iconfont larry-shangchuan"></span>
                </div>
                <div class="img">
                    <img src="https://tse1-mm.cn.bing.net/th/id/OIP-C.-Y6GWK22W7Zxt2_sVtyZ7gHaHa?w=181&h=181&c=7&r=0&o=5&pid=1.7"
                        alt="">
                </div>
            </div>
            <div class="infos">
                <div class="infosItem">
                    <span class="itemTitle">姓名</span>
                    <input :value="baseInfo.name" placeholder="姓名" />
                </div>
                <div class="infosItem">
                    <span class="itemTitle">籍贯</span>
                    <input :value="baseInfo.address" placeholder="籍贯" />
                </div>
                <div class="infosItem">
                    <span class="itemTitle">经验</span>
                    <input :value="baseInfo.work" placeholder="经验" />
                </div>
                <div class="infosItem">
                    <span class="itemTitle">性别</span>
                    <input :value="baseInfo.gender" placeholder="性别" />
                </div>
                <div class="infosItem">
                    <span class="itemTitle">生日</span>
                    <input :value="baseInfo.birthday" placeholder="生日" />
                </div>
            </div>
        </div>
        <div v-for="item in boxList" :key="item.id" class="box"
            :style="`width:${item.width}vw;height:${item.height}vh`">
            <textarea id="demo" style="display: none;"></textarea>
        </div>
        <div class="addBox box" @click="addBox">添加新块</div>
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
            ],
            baseInfo: {
                name: "蔡徐坤",
                address: "American",
                work: "2.5年",
                birthday: "1998年8月2日",
                gender: "保密"
            },
            boxList: []
        };
    },
    created() {

    },
    mounted() {

    },
    methods: {
        addBox() {
            this.boxList.push({
                id: 0,
                width: 15,
                height: 10
            })
        }
    }
};
</script>

<style scoped lang="less">
.box {
    border: 1px solid rgba(238, 238, 238, 0.863);
    border-radius: 10px;
    margin-bottom: 10px;

    input {
        height: 100%;
        width: 100%;
    }
}

.box.active {
    animation: lum 2s infinite;
}

@keyframes lum {
    0% {}

    50% {
        border: 1px solid #0051ff;
    }

    100% {}
}

.addBox {
    border: 1px solid #0051ff;
    color: #0051ff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    cursor: pointer;
    transition: 0.2s;
    padding: 10px;
    margin: 5px;
    font-size: 12px;
}

.addBox:hover {
    background: #0051ff;
    color: #fff;
    transition: 0.2s;
}

.onePage {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    height: 100vh;
    flex-wrap: wrap;
}

.baseInfo {
    display: flex;
    align-items: center;
    flex-direction: column;

    .infos {
        .infosItem {
            padding: 10px 0;
            display: flex;

            input {
                border: none;
                background: #dfe9ff;
                padding: 5px;
                padding-left: 10px;
                border-radius: 100px;
                color: #374e83;
            }

            .itemTitle {
                min-width: 70px;
                padding: 0 10px;
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
        margin: 10px;
        margin-left: 0;

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
