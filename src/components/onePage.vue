<template>
    <keep-alive>
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
            <!-- item.editor.isFocused()?'active':'' -->
            <div v-for="item in boxList" :key="item.id" :class="item.active?'box active':'box'"
                :style="`min-width:${item.width}vw;min-height:${item.height}vh`" @click="foucs(item)">
                <div class="delete" @click="deleteBox(item.id)">×</div>
                <Editor :style="`height: 100%;background:none`" :value="item.valueHtml" :defaultConfig="editorConfig"
                    :mode="mode" @onCreated="handleCreated" @onChange='changed' />
            </div>
            <div class="options" id="options">
                <div class="addBox">预览和保存</div>
                <div class="addBox box" @click="addBox">添加新块</div>
            </div>
        </div>
    </keep-alive>
</template>

<script>
import pasteImage from "paste-image"
import { ref } from 'vue'
import { Editor } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
export default {
    components: { Editor },
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
            boxList: [
                {
                    id: 0,
                    width: 15,
                    height: 10,
                    valueHtml: ref(""),
                }
            ],
            editorList: [],
            editorConfig: { placeholder: '请输入内容...', scroll: false },
            mode: 'default',
        };
    },
    beforeCreate() {
    },
    created() {
    },
    mounted() {
        this.getStorage()
        pasteImage.on('paste-image', (image) => {
            for (let item of this.boxList) {
                console.log(item)
                if (item.editor.isFocused()) {
                    let newHTML = item.editor.getHtml() + `<img src='${image.src}' />`
                    item.editor.setHtml(newHTML)
                    break
                    // document.body.appendChild(image);
                }
            }
            return
            // Display the image by appending it to the end of the body
            // document.body.appendChild(image);
        });
    },
    methods: {
        setStorage() {
            for (let item of this.boxList) {
                console.log(item)
                item.html = item.editor.getHtml()
                //取出内容单独储存
            }
            localStorage.setItem('userData', JSON.stringify(this.$data));
        },
        getStorage() {
            let localStorages = JSON.parse(localStorage.getItem('userData'))
            if (null == localStorages) {
                return
            }
            if (localStorages.boxList.length != 0) {
                this.baseInfo = localStorages.baseInfo
                this.choose = localStorages.choose
                this.editorList = localStorages.editorList
                this.editorConfig = localStorages.editorConfig
                this.boxList = []
                for (let item of localStorages.boxList) {
                    console.log(item)
                    this.addBox(item.html)
                }
            }
            return localStorages
        },
        changed() {
            if (this.checkIsOverFlow()) {
                alert("注意!内容已超出纸张大小")
                return
            }
            this.setStorage()
            // console.log(this.getStorage())
        },
        foucs(item) {
            for (let item of this.boxList) {
                item.active = false
            }
            item.active = true
        },
        handleCreated(editor) {
            this.boxList[this.boxList.length - 1].editor = editor
        },
        checkIsOverFlow() {  //检查元素是否超出屏幕或已经接近屏幕
            let options = document.getElementById("options")
            let poL = options.offsetLeft / document.body.clientWidth
            let poT = options.offsetTop / document.body.clientHeight
            if (poL > 0.8 || (poL > 0.74 && poT > 0.80)) {
                return true
            }
            return false
        },
        addBox(valueHtml) {
            if (this.checkIsOverFlow()) {
                alert("不可再添加更多")
                return
            }
            this.boxList.push({
                id: this.boxList.length == 0 ? 0 : this.boxList[this.boxList.length - 1].id + 1,
                width: 15,
                height: 10,
                valueHtml: valueHtml ? ref(valueHtml) : ref("ok")
            })
            console.log(valueHtml)
        },
        deleteBox(id) {
            this.boxList = this.boxList.filter((item) => {
                return item.id != id
            })
            // this.setStorage()
        }
    }
};
</script>

<style scoped lang="less">
.options {
    display: flex;
    justify-content: flex-end;
}

.box {
    border: 1px solid rgba(238, 238, 238, 0.863);
    border-radius: 10px;
    margin-bottom: 10px;
    position: relative;
    transition: 0.2s;
    margin: 5px;

    .delete {
        position: absolute;
        top: 0;
        right: 0;
        transform: translateX(40%) translateY(-40%);
        background: red;
        color: #fff;
        height: 22px;
        width: 22px;
        border-radius: 100px;
        display: none;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    input {
        height: 100%;
        width: 100%;
    }
}

.box:hover .delete {
    display: flex;
    z-index: 9;
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
    justify-content: flex-start;
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
