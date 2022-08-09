<template>
    <div class="background">
        <canvas id="myCanvas"></canvas>
        <div class="loginBox">
            <div class="title">
                登录
            </div>
            <div class="infoBox">
                <div><input type="text" name="" id="" placeholder="账号(邮箱)"> </div>
                <div><input type="text" name="" id="" placeholder="密码"> <span></span></div>
                <div style="display: inline-flex;align-items: center;justify-content: center;"><input type="checkbox"
                        name="" id="" :checked="isRememberPassword"><span style="cursor: pointer;user-select: none;"
                        @click="rememberPassword">记住密码</span></div>
                <div><span class="btn loginNow">登录</span></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isRememberPassword: false,
            colorList: ["#7EC1C0", "#e4d3a8", "#e28147", "#c64d4d", "#90dcce", "#a3d6ad", "#cd4c38", "#0cc8eb", "#e151b7"]
        };
    },
    created() {
    },
    mounted() {
        this.initCanvas()
    },
    methods: {
        rememberPassword() {
            this.isRememberPassword = !this.isRememberPassword
        },
        initCanvas() {
            var canvas = document.getElementById('myCanvas');//引用canvas元素
            var ctx = canvas.getContext('2d');//获取2D环境
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;//使canvas画布的大小为整个屏幕的大小
            this.initStars(ctx, canvas)
            setInterval(this.drawUpdate(ctx, canvas), 100)
        },
        initStars(ctx, canvas) {
            for (let i = 0; i < 200; i++) {
                ctx.beginPath();//开始绘制
                let x = (Math.random() * (canvas.width - 5)) + 5
                let y = (Math.random() * (canvas.height - 5)) + 5
                let color = this.colorList[parseInt((Math.random() * (this.colorList.length - 0)) + 0)]
                ctx.arc(x, y, 2, 0, 2 * Math.PI);
                ctx.fillStyle = color;
                ctx.strokeStyle = color;
                ctx.fill()
                ctx.stroke();
                ctx.closePath();
            }
        },
        drawUpdate(ctx, canvas) {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            this.initStars(ctx, canvas)
        }
    }
};
</script>

<style scoped lang="less">
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
            padding: 8px 5px;
        }
    }

    .loginNow {
        display: block;
        text-align: center;
        background: #111;
        padding: 10px 20px;
        border-radius: 5px;
        color: #eee;
    }
}
</style>
