<template>
    <swiper :slides-per-view="1" :space-between="50" @swiper="onSwiper" @slideChange="onSlideChange"
        direction="vertical" :height="pageHeight">
        <swiper-slide class="slideBox">Slide 1</swiper-slide>
        <swiper-slide class="slideBox">Slide 2</swiper-slide>
        <swiper-slide class="slideBox">Slide 3</swiper-slide>
    </swiper>
    <div class="login">
        <iconAnimate  icon="larry-gengduo"></iconAnimate>
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
            pageHeight: document.documentElement.clientHeight
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

    }
};
</script>

<style scoped lang="less">
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
