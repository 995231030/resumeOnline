<template>
    <div class="background">
        <canvas id="myCanvas"></canvas>
        <div class="loginBox">
            <div class="title">
                登录
            </div>
            <div class="infoBox">
                <div>
                    <input type="text" name="" id="" placeholder="邮箱 ( Bicix通行证 )" v-model="account"
                        @blur="checkValue(0)" @input="checkValue(0)" :class="isNullAccount?'null':''">
                </div>
                <div>
                    <input type="password" name="" id="" placeholder="密码" v-model="password" @blur="checkValue(1)"
                        @input="checkValue(1)" :class="isNullPassword?'null':''">
                </div>
                <div>
                    <input type="text" name="" id="" v-if="isShowVcode" placeholder="验证码">
                    <div v-if="isShowVcode" style="display: flex;justify-content: flex-end;cursor: pointer;"
                        @click="reSentVcode">
                        {{countDown}}
                    </div>
                </div>
                <div style="display: inline-flex;align-items: center;justify-content: center;">
                    <input type="checkbox" name="" id="" :checked="isRememberPassword">
                    <span style="cursor: pointer;user-select: none;" @click="rememberPassword">记住密码</span>
                </div>
                <div>
                    <span class="btn loginNow" @click="login">登录 /
                        <span style="font-size: 12px;color: #316ae6;">注册</span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import toast from 'showtips'
export default {
    data() {
        return {
            isRememberPassword: false,
            colorList: ["#7EC1C0", "#e4d3a8", "#e28147", "#c64d4d", "#90dcce", "#a3d6ad", "#cd4c38", "#0cc8eb", "#e151b7"],
            canvas: null,
            ctx: null,
            isShowVcode: false,
            countDown: 60,
            account: "",
            password: "",
            isNullAccount: false,
            isNullPassword: false
        };
    },
    created() {
    },
    mounted() {
        this.stars()
    },
    methods: {
        checkValue(code) {
            if (code && this.password == "") {
                this.isNullPassword = true
            } else {
                this.isNullPassword = false
            }
            if (!code && this.account == "") {
                this.isNullAccount = true
            } else {
                this.isNullAccount = false
            }
        },
        reSentVcode() {
            if (this.countDown == "重新获取") {
                this.turnToReg()
            }
        },
        turnToReg() {
            this.isShowVcode = true
            this.countDown = 60
            let countDown = setInterval(() => {
                this.countDown--
                if (this.countDown == 0) {
                    this.countDown = "重新获取"
                    clearInterval(countDown)
                }
            }, 1000)
        },
        login() {
            // this.turnToReg()
            if (this.password == "" || this.account == "") {
                toast.showToast(3, "请输入完整信息")
                return
            }
            axios.post("/api/distributor", {
                topic: "userLogin",
                data: {
                    account: this.account,
                    password: this.password
                }
            }).then((res) => {
                console.log(res)
            }).catch(() => {
                toast.showToast(2, "网络或服务器错误")
            })
        },
        rememberPassword() {
            this.isRememberPassword = !this.isRememberPassword
        },
        stars() {
            var canvas = document.getElementById("myCanvas");
            var ctx = canvas.getContext("2d");
            // var showBar = document.querySelector("#show");
            // var showWord = "";
            var devicePixelRatio = window.devicePixelRatio || 1;
            var backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
                ctx.mozBackingStorePixelRatio ||
                ctx.msBackingStorePixelRatio ||
                ctx.oBackingStorePixelRatio ||
                ctx.backingStorePixelRatio || 1;
            var ratio = devicePixelRatio / backingStoreRatio;
            var screenWidth = canvas.width = window.innerWidth * ratio;
            var screenHeight = canvas.height = window.innerHeight * ratio;
            var centerPointX = screenWidth / 2;
            var centerPointY = screenHeight / 2;
            canvas.style.width = canvas.width / ratio + "px";
            canvas.style.height = canvas.height / ratio + "px";
            var lines = [];
            var beta = 0;
            var gamma = 0;
            var mousex = 0;
            var mousey = 0;
            var betaArr = [];
            var gammaArr = [];
            // var alpha = 0;
            //----------------------------
            //监听陀螺仪
            if (window.DeviceOrientationEvent) {
                window.addEventListener('deviceorientation', (e) => {
                    // alpha = e.alpha;
                    beta = e.beta;
                    gamma = e.gamma;
                });
            }
            //----------------
            // 监听鼠标位置
            function mousePosition(ev) {
                if (ev.pageX || ev.pageY) {
                    return {
                        x: ev.pageX,
                        y: ev.pageY
                    };
                }
                return {
                    x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
                    y: ev.clientY + document.body.scrollTop - document.body.clientTop
                };
            }

            function mouseMove(e) {
                e = e || window.event;
                var mousePos = mousePosition(e);
                mousex = mousePos.x;
                mousey = mousePos.y;
            }
            document.onmousemove = mouseMove;
            var startLines = /** @class */ (function () {
                function startLines() {
                    this.positionx = -200;
                    this.positiony = 0;
                    this.r = Math.floor(Math.random() * (Math.sqrt(screenHeight * screenHeight + screenWidth * screenWidth) - 400)) + 400;
                    this.startRadio = -(Math.random() * Math.PI / 8 + Math.PI / 8);
                    this.endRadio = 0;
                    this.red = Math.floor(Math.random() * 155) + 100;
                    this.green = Math.floor(Math.random() * 155) + 100;
                    this.blue = Math.floor(Math.random() * 155) + 100;
                    //opacity:number=Math.floor(Math.random()*10)/10;
                    this.opacity = 1;
                    this.lineWidth = Math.floor(Math.random() * 6) + 2;
                    this.speed = (Math.random() * Math.PI + Math.PI) / this.r;
                }
                startLines.prototype.drawStart = function () {
                    var color = "rgba(" + this.red + "," + this.green + "," + this.blue + "," + this.opacity + ")";
                    ctx.beginPath();
                    ctx.lineWidth = this.lineWidth;
                    ctx.arc(this.positionx, this.positiony, this.r, this.startRadio, this.endRadio);
                    ctx.strokeStyle = color;
                    ctx.stroke();
                };
                startLines.prototype.animate = function () {
                    if (gamma || beta) {
                        this.positionx = -beta * 2;
                        this.positiony = -gamma * 2;
                    } else if (mousex || mousey) {
                        this.positionx = (centerPointX - mousex) * 0.2;
                        this.positiony = (centerPointY - mousey) * 0.2;
                    }
                    this.startRadio += this.speed;
                    this.endRadio += this.speed;
                    this.drawStart();
                };
                return startLines;
            }());

            function recovery(arr, index) {
                var tempArr = [];
                for (var i = 0; i < arr.length; i++) {
                    if (i != index) {
                        tempArr.push(arr[i]);
                    }
                }
                return tempArr;
            }
            setInterval(function () {
                var starLine = new startLines();
                lines.push(starLine);
                starLine.drawStart();
                for (var i = 0; i < lines.length; i++) {
                    if (lines[i].startRadio > Math.PI * 3 / 4) {
                        lines = recovery(lines, i);
                    }
                }
                if (lines.length > 60) {
                    lines.shift();
                }
            }, 200);
            setInterval(function () {
                betaArr.push(beta);
                gammaArr.push(gamma);
                if (betaArr.length > 30) {
                    betaArr.shift();
                    gammaArr.shift();
                }
                ctx.clearRect(0, 0, screenWidth, screenHeight);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(0, screenHeight);
                ctx.lineTo(screenWidth, screenHeight);
                ctx.lineTo(screenWidth, 0);
                ctx.fillStyle = "#222222";
                ctx.closePath();
                ctx.fill();
                for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
                    var item = lines_1[_i];
                    item.animate();
                }
            }, 1000 / 60);
        }
    }
};
</script>

<style scoped lang="less">
.null {
    border: 1px solid red !important;
}

.background {
    background: rgb(12, 12, 12);
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}

.loginBox {
    background: #fff;
    position: absolute;
    top: 50%;
    right: 10%;
    transform: translateY(-50%);
    padding: 20px;
    border-radius: 10px;
    border: 1px solid #666;

    div {
        padding: 5px 0;
    }

    .infoBox {
        input {
            border: 1px solid #111;
            border-radius: 5px;
            padding: 12px 8px;
        }
    }

    .loginNow {
        display: block;
        text-align: center;
        padding: 10px 20px;
        border-radius: 5px;
        background: #c7d8ff;
        font-size: 16px;
        color: #316ae6;
        border: none;
    }

    .loginNow:hover {
        background: #4c7eeb;
        color: #fff;

        span {
            color: #fff !important;
        }
    }
}
</style>
