/* eslint-disable no-unused-vars */
<template>
  <!--楼层-->
  <div class="floor">
    <div class="py-container">
      <div class="title clearfix">
        <h3 class="fl">{{ list.name }}</h3>
        <div class="fr">
          <ul class="nav-tabs clearfix">
            <li
              class="active"
              v-for="(nav, index) in list.navList"
              :key="index"
            >
              <a href="#tab1" data-toggle="tab">{{ nav.text }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-pane">
          <div class="floor-1">
            <div class="blockgary">
              <ul class="jd-list">
                <li v-for="(keyword, index) in list.keywords" :key="index">
                  {{ keyword }}
                </li>
              </ul>
              <img :src="list.imgUrl" />
            </div>
            <div class="floorBanner">
              <!-- 轮播图的地方 -->
              <Carousel :list="list.carouselList" />
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="list.recommendList[0]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="list.recommendList[1]" />
              </div>
            </div>
            <div class="split center">
              <img :src="list.bigImg" />
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="list.recommendList[2]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="list.recommendList[3]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Swiper from "swiper";
export default {
  name: "",
  props: ["list"],
  // mounted() {
  // eslint-disable-next-line no-unused-vars
  // var mySwiper = new Swiper(
  //   //为什么Home组件的轮播图需要写在watch+$nextTick而这里可以直接写在mounted里面?
  //   //因为此处的list是由父组件传来的, 并且父组件已经处理好了异步数据, 然后传递给子组件使用
  //   this.$refs.cur,
  //   {
  //     loop: true,
  //     //如果需要分页器
  //     pagination: {
  //       el: ".swiper-pagination",
  //       clickable: true,
  //     },
  //     //如果需要前进后退按钮
  //     navigation: {
  //       nextEl: ".swiper-button-next",
  //       prevEl: ".swiper-button-prev",
  //     },
  //   }
  // );
  // },
  // watch: {
  //   //立即监听, 不管你数据有没有变化,上来立即监听一次
  //   //为什么watch监听不到list:因为这个数据从来没有发生变化(数据是父亲给的, 父亲给的时候就是一个对象, 对象里面该有的数据都是有的)
  //   immediate: true,
  //   list: {
  //     handler() {
  //       console.log("我在监听floor组件中的数据");
  //       //只能监听到数据已经有了, 但是v-for动态渲染结构我们还是没有办法确定的, 因此还是要用nextTick
  //       //为了共用轮播图的组件, 在这里使用watch+immediate:true来实现
  //       this.$nextTick(() => {
  //         // eslint-disable-next-line no-unused-vars
  //         var mySwiper = new Swiper(this.$refs.cur, {
  //           loop: true,
  //           //如果需要分页器
  //           pagination: {
  //             el: ".swiper-pagination",
  //             clickable: true,
  //           },
  //           //如果需要前进后退按钮
  //           navigation: {
  //             nextEl: ".swiper-button-next",
  //             prevEl: ".swiper-button-prev",
  //           },
  //         });
  //       });
  //     },
  //   },
  // },
};
</script>

<style scoped lang="less">
.floor {
  margin-top: 15px;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .title {
      .fl {
        float: left;
        color: #c81623;
        font-size: 20px;
        line-height: 30px;
        margin: 9px 0;
        font-weight: 700;
      }

      .fr {
        float: right;

        .nav-tabs {
          margin: 10px 0 0;
          display: inline-block;

          li {
            float: left;
            line-height: 18px;

            a {
              padding-top: 1px;
              font-weight: 400;
              background-color: #fff;

              &::after {
                content: "|";
                padding: 0 10px;
              }
            }

            &:nth-child(7) {
              a {
                &::after {
                  content: "";
                }
              }
            }

            &.active {
              a {
                color: #e1251b;
              }
            }
          }
        }
      }
    }

    .tab-content {
      border-top: 2px solid #c81623;
      border-bottom: 1px solid #e4e4e4;

      .tab-pane {
        .floor-1 {
          height: 360px;
          display: flex;

          .blockgary {
            width: 210px;
            height: 100%;
            background: #f7f7f7;

            .jd-list {
              padding: 15px 0;
              overflow: hidden;

              li {
                list-style-type: none;
                float: left;
                width: 40%;
                margin: 0 10px;
                border-bottom: 1px solid #e4e4e4;
                text-align: center;
                line-height: 26px;
              }
            }

            img {
              width: 100%;
            }
          }

          .floorBanner {
            width: 330px;
            height: 100%;
          }

          .split {
            width: 220px;
            height: 100%;
            position: relative;

            .floor-x-line {
              position: absolute;
              background: #e4e4e4;
              width: 220px;
              height: 1px;
              top: 180px;
            }

            .floor-conver-pit {
              width: 100%;
              height: 50%;

              img {
                width: 100%;
                height: 100%;
                transition: all 400ms;

                &:hover {
                  opacity: 0.8;
                }
              }
            }
          }

          .center {
            border: 1px solid #e4e4e4;
          }
        }
      }
    }
  }
}
</style>
