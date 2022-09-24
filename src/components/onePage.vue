<template>
    <keep-alive>
        <div class="onePage">
            <div class="keepTip" :style="isPreserved?'background: #44c28a;':''" v-if="!preview" @click="setData">
                <div v-if="!isPreserved">
                    <span class="iconfont larry-xinxi"></span>
                    <span>未保存</span>
                </div>
                <div v-if="isPreserved">
                    <span class="iconfont larry-zhengque"></span>
                    <span>已保存</span>
                </div>
            </div>

            <!-- item.editor.isFocused()?'active':'' -->

            <transition-group>
                <div class="baseInfo box">
                    <div class="avatar" :style="styles[choose].avatar">
                        <div class="mask">
                            <input type="file" name="" id="avatarFile"
                                style="position: absolute;opacity: 0;cursor: pointer;" @change="getAvatarFile">
                            <span class="iconfont larry-shangchuan"></span>
                        </div>
                        <div class="img">
                            <img :src="baseInfo.avatar?baseInfo.avatar:avatarDefault" alt="">
                        </div>
                    </div>
                    <div class="infos">
                        <div class="infosItem">
                            <span class="itemTitle">姓名</span>
                            <span class="finText" v-if="isDownloadAsPng">{{baseInfo.name}}</span>
                            <input v-model="baseInfo.name" placeholder="姓名" v-if="!isDownloadAsPng" />
                        </div>
                        <div class="infosItem">
                            <span class="itemTitle">籍贯</span>
                            <span class="finText" v-if="isDownloadAsPng">{{baseInfo.address}}</span>
                            <input v-model="baseInfo.address" placeholder="籍贯" v-if="!isDownloadAsPng" />
                        </div>
                        <div class="infosItem">
                            <span class="itemTitle">经验</span>
                            <span class="finText" v-if="isDownloadAsPng">{{baseInfo.work}}</span>
                            <input v-model="baseInfo.work" placeholder="经验" v-if="!isDownloadAsPng" />
                        </div>
                        <div class="infosItem">
                            <span class="itemTitle">性别</span>
                            <span class="finText" v-if="isDownloadAsPng">{{baseInfo.gender}}</span>
                            <input v-model="baseInfo.gender" placeholder="性别" v-if="!isDownloadAsPng" />
                        </div>
                        <div class="infosItem">
                            <span class="itemTitle">生日</span>
                            <span class="finText" v-if="isDownloadAsPng">{{baseInfo.birthday}}</span>
                            <input v-model="baseInfo.birthday" placeholder="生日" v-if="!isDownloadAsPng" />
                        </div>
                    </div>
                </div>
                <div v-for="(item,index) in boxList" :key="item.id" :class="item.active?'box active':'box'"
                    :style="`min-width:${item.width}vw;min-height:${item.height}vh`" @click="foucs(item)">
                    <div class="itemOptions">
                        <span class="up" @click="sortUp(index)">↑</span>
                        <span class="down" @click="sortDown(index)">↓</span>
                        <span @click="deleteBox(item.id)" class="delete">×</span>
                    </div>
                    <Editor :style="`height: 100%;background:none`" v-model="item.valueHtml"
                        :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated" @onChange='changed' />
                </div>
            </transition-group>
            <div class="options" id="options" v-if="!preview">
                <div class="addBox" @click="setData">保存</div>
                <div class="addBox" @click="previewNow">预览和下载</div>
                <div class="addBox box" @click="addBox()">添加新块</div>
            </div>
            <div class="download " v-if="preview&&!isDownloadAsPng">
                <span class="btn" @click="downloadNow">下载为图片</span>
                <span class="btn" @click="previewOut">退出预览</span>
            </div>
            <div class="previewImg" v-if="ispreviewImg">
                <img :src="previewImg" alt="">
            </div>
            <div class="watermark" v-if="watermark">
                加伊在线
            </div>
        </div>
    </keep-alive>
</template>

<script>
import pasteImage from "paste-image"
import { ref } from 'vue'
import { Editor } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import toast from '../utils/showTip'
import modal from '../utils/modal'
import html2canvas from "html2canvas"
import { Download } from "../utils/base64Download";//文件下载
import avatarDefault from "../assets/img/avatar.png"
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
            avatarDefault: avatarDefault,
            baseInfo: {
                avatar: "",
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
            isPreserved: false, //是否保存
            preview: false, //预览时隐藏按钮
            isDownloadAsPng: false, //截图时隐藏
            previewImg: "", //图片base64或地址
            ispreviewImg: false,//预览图片全屏显示
            watermark: false,//截图时水印
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
                // console.log(item)
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
        document.addEventListener('keypress', this.keypressFn)
    },
    methods: {
        sortUp(index) {
            if (undefined == this.boxList[index - 1]) {
                toast.showToast(2, "已经在第一位")
                return
            }
            this.boxList[index - 1] = this.boxList.splice(index, 1, this.boxList[index - 1])[0]
        },
        sortDown(index) {
            if (undefined == this.boxList[index + 1]) {
                toast.showToast(2, "已经在最后一位")
                return
            }
            this.boxList[index + 1] = this.boxList.splice(index, 1, this.boxList[index + 1])[0]
        },
        downloadNow() {
            let downloadName = "在线简历导出 in 加伊在线.png";//文件名
            let imgData = this.previewImg.slice(22);//base64  这里把base64头去掉
            let downLoad = new Download()
            downLoad.downloadFile(downloadName, imgData);
        },
        DPR() {
            if (window.devicePixelRatio && window.devicePixelRatio > 1) {
                return window.devicePixelRatio;
            }
            return 1;
        },
        parseValue(value) {
            return parseInt(value, 10);
        },
        downloadAsPng() {
            this.watermark = true
            this.isDownloadAsPng = true
            const dom = document.getElementById("app");
            const box = window.getComputedStyle(dom);
            const width = this.parseValue(box.width);
            const height = this.parseValue(box.height);
            const scaleBy = this.DPR();
            const canvas = document.createElement('canvas');
            canvas.width = width * scaleBy;
            canvas.height = height * scaleBy;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            const context = canvas.getContext('2d');
            context.scale(1, 1);
            setTimeout(() => {
                html2canvas(document.body, {
                    canvas,
                }).then(c => {
                    let imgurl = c.toDataURL('image/png')
                    this.previewImg = imgurl
                    this.isDownloadAsPng = false
                    this.ispreviewImg = true
                });
                // html2canvas(document.body).then((canvas) => {
                // });
            }, 10);
        },
        getAvatarFile(e) {
            if (null == e) {
                return
            }
            let files = document.getElementById('avatarFile').files[0];
            if (undefined == files) {
                return
            }
            var reader = new FileReader()
            reader.readAsDataURL(files)
            reader.onload = () => {
                // console.log('file 转 base64结果：' + reader.result)
                this.baseInfo.avatar = reader.result
            }
        },
        // 预览
        previewNow() {
            try {
                toast.closeToast()
            } catch {

            }
            this.preview = true
            for (let item of this.boxList) {
                item.editor.disable()
                item.active = false
            }
            this.downloadAsPng()
        },
        // 退出预览 ，此时删除图片层
        previewOut() {
            this.preview = false
            for (let item of this.boxList) {
                item.editor.enable()
            }
            this.previewImg = ""
            this.ispreviewImg = false
            this.watermark = false
        },
        setData() {
            this.setStorage()
        },
        setStorage() {
            for (let item of this.boxList) {
                item.html = item.editor.getHtml()
                // console.log(item.html)
                //取出内容单独储存
            }
            try {
                localStorage.setItem('userData', JSON.stringify(this.$data));
                toast.showToast(1, "保存成功")
                this.isPreserved = true
            } catch (err) {
                toast.showToast(3, "未更改")
                // console.log(err)
            }
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
                    // console.log("缓存中的：", item.html)
                    this.addBox(item.html)
                }
            }
            return localStorages
        },
        changed() {
            if (this.checkIsOverFlow()) {
                toast.showToast(3, "注意 ， 内容超出纸张大小")
                return
            }
            this.isPreserved = false
            // console.log(this.getStorage())
        },
        foucs(item) {
            for (let item of this.boxList) {
                item.active = false
            }
            item.active = true
        },
        // 初始化编辑器
        handleCreated(editor) {
            this.boxList[this.boxList.length - 1].editor = editor
            // console.log(this.boxList)
        },
        checkIsOverFlow() {  //检查元素是否超出屏幕或已经接近屏幕
            let options = document.getElementById("options")
            if (options.offsetLeft + options.clientWidth > document.body.clientWidth) {
                return true
            }
            let poL = options.offsetLeft / document.body.clientWidth
            let poT = options.offsetTop / document.body.clientHeight
            if (poL > 0.8 || (poL > 0.74 && poT > 0.80)) {
                return true
            }
            return false
        },
        addBox(valueHtml) {
            setTimeout(() => {
                if (this.checkIsOverFlow()) {
                    toast.showToast(3, "不可再添加更多")
                    // alert("不可再添加更多")
                    return
                }
                this.boxList.push({
                    id: this.boxList.length == 0 ? 0 : this.boxList[this.boxList.length - 1].id + 1,
                    width: 15,
                    height: 10,
                    valueHtml: valueHtml ? ref(valueHtml) : ref("")
                })
                this.$forceUpdate()
                // console.log(valueHtml)
            }, 10)
        },
        deleteBox(id) {
            if (null == id) {
                return
            }
            if (this.boxList[id].editor.getText() == "") {
                this.boxList = this.boxList.filter((item) => {
                    return item.id != id
                })
            } else
                modal.showModal(2, "确定删除此块？", (confirm) => {
                    toast.showToast(5, "正在删除")
                    if (confirm) {
                        this.boxList = this.boxList.filter((item) => {
                            return item.id != id
                        })
                    }
                })
        }
    }
};
</script>

<style scoped lang="less">
.watermark {
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
    z-index: 999999;
    padding: 10px;
    color: #d1daf1;
}

.previewImg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    z-index: 99;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.download {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;

    .btn {
        margin: 0 10px;
        background: #fff;
        box-shadow: 0 0 15px #d1daf1;
    }

    .btn:hover {
        background: #0051ff;
    }
}

.keepTip {
    position: fixed;
    top: 5px;
    left: 5px;
    background: #f7931e;
    opacity: 0.8;
    padding: 10px;
    border-radius: 100px;
    z-index: 999;
    user-select: none;
    cursor: pointer;

    span {
        color: #fff;
        padding: 0 5px;
    }
}

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



    .itemOptions {
        position: absolute;
        top: 0;
        right: 50%;
        transform: translateX(50%) translateY(-40%);
        display: flex;
        align-items: center;
        justify-content: center;
        display: none;

        span {
            color: #fff;
            height: 23px;
            width: 23px;
            border-radius: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            margin: 2px;
        }

        .delete {
            border: 1px solid #f00;
            color: #f00;
            background: #fff;
        }

        .delete:hover {
            background: #f00;
            color: #fff;
        }

        .up,
        .down {
            border: 1px solid #0051ff;
            font-size: 12px;
            color: #0051ff;
            background: #fff;
        }

        .up:hover,
        .down:hover {
            background: #0051ff;
            color: #fff;
        }
    }

    .move {
        position: absolute;
        top: 0;
        left: 0;
        transform: translateX(-40%) translateY(-40%);
        background: #0051ff;
        color: #fff;
        height: 22px;
        width: 22px;
        border-radius: 100px;
        display: none;
        align-items: center;
        justify-content: center;
        cursor: move;
        user-select: none;
    }

    input {
        height: 100%;
        width: 100%;
    }
}

.box:hover .move {
    display: flex;
    z-index: 9;
}

.box:hover .itemOptions {
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

            input,
            .finText {
                border: none;
                background: #dfe9ff;
                padding: 5px;
                padding-left: 10px;
                border-radius: 100px;
                color: #374e83;
                font-size: 14px;
                min-width: 150px;
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
