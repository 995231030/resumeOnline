<template>
    <swiper :slides-per-view="1" :space-between="50" @swiper="onSwiper" @slideChange="onSlideChange"
        direction="vertical" :height="pageHeight">
        <swiper-slide class="slideBox">
            <div class="welcome">
                <div class="video">
                    <video src="../assets/video/sea.mp4" autoplay loop></video>
                </div>
                <div class="mask"></div>
                <!-- <div class="text">welcome</div> -->
                <div class="btn next" @click="next">更上一层楼</div>
            </div>
        </swiper-slide>
        <swiper-slide class="slideBox">
            <div class="resume_png">
                resume_png
            </div>
        </swiper-slide>
        <swiper-slide class="slideBox">
            <div class="resume_online">
                resume_online
            </div>
        </swiper-slide>
    </swiper>
    <div class="login">
        <iconAnimate icon="larry-gengduo" @click="toLogin"></iconAnimate>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import iconAnimate from './iconAnimate.vue';
import 'swiper/css';
export default {
    components: {
        Swiper,
        SwiperSlide,
        iconAnimate
    },
    data() {
        return {
            pageHeight: document.documentElement.clientHeight,
            swiper:null
        };
    },
    created() {
    },
    mounted() {
        this.getSwiper()
    },
    setup() {
        const router = useRouter()
        const toLogin = (() => {
            router.push({
                name: 'loginRegister'
            })
        })
        const onSwiper = (swiper) => {
            console.log(swiper);
        };
        const onSlideChange = () => {
            console.log('slide change');
        };
        return {
            toLogin,
            onSwiper,
            onSlideChange,
        }
    },
    methods: {
        getSwiper(){
            this.swiper =  document.querySelector('.swiper').swiper;
        },
        next(){
            // const swiper = document.querySelector('.swiper').swiper;
            // Now you can use all slider methods like
            this.swiper.slideNext();
        }
    }
};
</script>

<style scoped lang="less">
.welcome {
    .btn {
        position: absolute;
        bottom: 10%;
        border: 1px solid #0051ff;
        color: #0051ff;
        border-radius: 20px;
        padding: 10px 35px;
        left: 50%;
        transform: translateX(-50%);
    }

    .btn:hover {
        background: #0051ff;
        color: #fff;
    }

    .text {
        position: absolute;
        color: #fff;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
        font-size: 18px;
    }

    .video {
        position: absolute;
        top: -50%;
        overflow: hidden;
        z-index: -1;

    }

    .mask {
        width: 130%;
        height: 15vh;
        background: #705340;
        position: absolute;
        top: 59%;
        left: -15%;
        filter: blur(27px);
    }

}



.slideBox {
    width: 100%;
    user-select: none;
}

.login {
    position: absolute;
    top: 20px;
    right: 20px;
    border: 1px solid #0051ff;
    padding: 5px;
    border-radius: 8px;
    border-radius: 50%;
    z-index: 9;
}
</style>
