<template>
  <div class="app">
    <div class="nav">
    <p >深圳天气</p>
    </div>

    <!-- 选择地区模块 ---------------->
    <div class="above">
      <span class="iconfont icon-dingwei">
        <span>{{ area }}</span>

        <!-- option --------------- -->
        <select
          name="abc"
          v-model="area"
          v-show="isShow"
          @change="changeArea(item.number)"
          v-for="(item, index) in city"
          :key="index"
        >
          <option :value="item.ct">
            <span>{{ item.ct }}</span>
          </option>
        </select>
        <button @click="changeShow()">切换</button>
      </span>
      <span class="time">{{ this.hour + ":" + this.minute + "更新" }}</span>
    </div>

    <!-- -----天气显示------ --------------->

    <div class="weather">
      <div class="weather-left">
        <span>{{ this.list.temperature }}</span> <span id="temperature">℃</span>
      </div>

      <div class="weather-right">
        <p>
          <span class="iconfont icon-feng">
            {{ this.list.winddirection + "风" }}</span
          >
          <span> {{ this.list.windpower + "级" }}</span>
        </p>
        <p>
          <span class="iconfont icon-shidu"> 相对湿度</span>
          <span>{{ this.list.humidity + "%" }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import request from "../network/request";

export default {
  data() {
    return {
      //保存lives
      list: [],
      city: [
        { ct: "南山区", number: 440305 },
        { ct: "罗湖区", number: 440303 },
        { ct: "宝安区", number: 440306 },
        { ct: "龙岗区", number: 440307 },
        { ct: "盐田区", number: 440308 },
        { ct: "龙华区", number: 440309 },
        { ct: "坪山区", number: 440310 },
      ],
      //Option 开关
      isShow: false,
      //默认 地区 区号
      area: "南山区",
      areaCode: "440305",
      //保存HH:MM
      hour: 0,
     minute: 0,
    };
  },

  created() {
    // 首次调用
    this.getWeather(this.areaCode);
  },

  methods: {
    //请求网络方法
    getWeather(city) {
      console.log(city);
      request({
        params: {
          city,
        },
      }).then((res) => {
        //保存res.data.live[0]
        this.list = res.data.lives[0];
        console.log(this.list);
        // 获取HH:MM
        this.hour = new Date(this.list.reporttime).getHours();
        this.minute = new Date(this.list.reporttime).getMinutes();      
      });
    },

    //option显示隐藏
    changeShow() {
      this.isShow = !this.isShow;
    },

    //option change
    changeArea(areaNumber) {
      this.areaCode = areaNumber;
      //选择内容改变时调用
      this.getWeather(this.areaCode);
    },
  },
};
</script>

<style scoped >
button {
  margin-left: 10px;
  border: 1px solid #407ec3;
  border-radius: 30%;
  outline: none;
  font-weight: bold;
  color: #407ec3;
}

.app {
  width: 500px;
  height: 400px;
  background-color: #e9ebec;
  margin: 0 auto;
  font-style: normal;
}

.nav {
  width: 100%;
  height: 70px;
  font-size: 50px;
  line-height: 70px;
  color: #e9ebec;
  background-color: #043567;
  margin-bottom: 20px;
}
.nav p{
  margin-left: 30px;
}

.above {
  width: 100%;
  padding-left: 20px;
}

.time {
  margin-left: 60px;
  color: #7d7d7d;
  font-size: 20px;
}

.weather {
  width: 100%;
  /* border:  3px solid yellow; */
  overflow: hidden;
}
.weather-left {
  float: left;
  /* border: 4px solid red; */
  position: relative;
  width: 160px;
  height: 150px;
  margin: 20px 0 0 50px;
}

.weather-left span {
  font-size: 150px;
  color: #043567;
}
#temperature {
  position: absolute;
  top: 20px;
  right: -50px;
  font-size: 40px;
  color: #043567;
}

.weather-right {
  margin: 110px 50px 0 0;
  /* border: 2px solid rebeccapurple; */
  float: right;
  font-size: 16px;
}

.weather-right span {
  margin-left: 10px;
}

.icon-dingwei {
  font-size: 30px;
}
</style>