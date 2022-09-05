<template>
  <swiper :slides-per-view="1" :space-between="50" @swiper="onSwiper" @slideChange="onSlideChange" direction="vertical"
    :height="pageHeight">
    <swiper-slide class="slideBox">
      <div class="welcome">
        <div class="video">
          <video src="../assets/video/sea.mp4" autoplay loop muted></video>
          <div class="mask"></div>
        </div>
        <div class="text">欲穷千里目</div>
        <div class="btn next" @click="next">更上一层楼</div>
      </div>
    </swiper-slide>
    <swiper-slide class="slideBox">
      <div class="resume_png">
        <div id="lottie_1">
          <div class="btn">现在开始</div>
        </div>
        <div class="text">
          制作单页简历
        </div>
      </div>
    </swiper-slide>
    <swiper-slide class="slideBox">
      <div class="resume_online">
        <div id="lottie_2">
          <div class="btn">现在开始</div>
        </div>
        <div class="text">
          制作在线简历
          <span style="font-size: 12px;color: #b9b9b9;">( 需要登录 )</span>
        </div>
      </div>
    </swiper-slide>
    <swiper-slide class="slideBox">
      <div class="bottom">
        <div class="video">
          <video src="../assets/video/sea.mp4" autoplay loop muted></video>
          <div class="mask"></div>
        </div>
        <div class="text">山重水复疑无路，柳暗花明又一村</div>
        <div class="footer"></div>
      </div>
    </swiper-slide>
  </swiper>
  <div class="login btn">
    <!-- <iconAnimate innerText="登录" @click="toLogin"></iconAnimate> -->
    <iconAnimate icon="larry-mainLogo" title="登录" @click="toLogin"></iconAnimate>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import iconAnimate from './iconAnimate.vue';
import 'swiper/css';
import lottie from 'lottie-web';
import lottieData from '../assets/单页简历.json'
import lottieData1 from '../assets/在线简历.json'

export default {
  components: {
    Swiper,
    SwiperSlide,
    iconAnimate
  },
  data() {
    return {
      pageHeight: document.documentElement.clientHeight,
      swiper: null,
      animation: null,
      animation1: null
    };
  },
  created() {
  },
  mounted() {
    this.getSwiper()
    this.animationLottie()
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
    getSwiper() {
      this.swiper = document.querySelector('.swiper').swiper;
    },
    next() {
      // const swiper = document.querySelector('.swiper').swiper;
      // Now you can use all slider methods like
      this.swiper.slideNext();
    },
    animationLottie() {
      this.animation = lottie.loadAnimation({
        container: document.getElementById("lottie_1"),
        renderer: 'canvas',
        loop: true,
        autoplay: false,
        animationData: lottieData,
        // assetsPath: CDN_URL
      })
      this.animation1 = lottie.loadAnimation({
        container: document.getElementById("lottie_2"),
        renderer: 'canvas',
        loop: true,
        autoplay: false,
        animationData: lottieData1,
        // assetsPath: CDN_URL
      })
      this.animation.play();
      this.animation1.play();
    }

  }
};
</script>

<style scoped lang="less">
.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 20vh;
  width: 100vw;
  background: #333;
}

.resume_png {
  .btn {
    position: absolute;
    bottom: 0%;
    right: 5%;
  }

  @media screen and (min-width : 768px) {
    .btn {
      position: absolute;
      bottom: 50%;
      right: -15%;
    }
  }

  display: flex;
  align-items: center;
  justify-content: center;

  .text {
    font-size: 36px;
    color: #0051ff;
    font-family: "幼圆";
    position: absolute;
    top: 0;
    left: 0;
    padding: 60px;
  }
}

.resume_online {
  .btn {
    position: absolute;
    bottom: 0%;
    right: 5%;
  }

  @media screen and (min-width : 768px) {
    .btn {
      position: absolute;
      bottom: 50%;
      right: -15%;
    }
  }

  display: flex;
  align-items: center;
  justify-content: center;

  .text {
    font-size: 36px;
    color: #0051ff;
    font-family: "幼圆";
    position: absolute;
    top: 0;
    left: 0;
    padding: 60px;
  }
}

#lottie_1 {
  height: 70vh;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}

#lottie_2 {
  height: 70vh;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}



.welcome,
.bottom {

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
    top: 40%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    font-size: 38px;
    font-family: "幼圆";
    white-space: nowrap;
    text-shadow: 0 0 5px #000;
  }

  .video {
    position: absolute;
    top: -50%;
    overflow: hidden;
    z-index: -1;
    animation: flowOver 15s forwards linear;
  }

  @keyframes flowOver {
    0% {
      top: -50%;
    }

    100% {
      top: -10%;
    }
  }

  .mask {
    width: 130%;
    height: 15vh;
    background: #ffffff;
    position: absolute;
    // top: 63%;
    bottom: -6%;
    left: -15%;
    filter: blur(24px);
  }
}

.slideBox {
  width: 100%;
  user-select: none;
  overflow: hidden;
}

.login {
  position: absolute;
  top: 20px;
  right: 20px;
  border: 1px solid #0051ff;
  padding: 5px;
  border-radius: 8px;
  border-radius: 100px;
  z-index: 9;
}
</style>
