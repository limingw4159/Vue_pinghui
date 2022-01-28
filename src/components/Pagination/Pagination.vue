/* eslint-disable vue/no-use-v-if-with-v-for */
<template>
  <div class="pagination">
    <!-- disabled进行一个判断从而使得它时而能点时而不能点 -->
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="startNumAndEndNum.start > 1"
      @click="$emit('getPageNo', pageNo - 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="startNumAndEndNum.start > 2">...</button>
    <!-- 中间部分v-for遍历 -->
    <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
    <button
      v-for="(page, index) in startNumAndEndNum.newEnd"
      :key="index"
      v-if="page >= startNumAndEndNum.start"
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>
    <button v-if="startNumAndEndNum.newEnd < totalPage - 1">...</button>
    <button
      v-if="startNumAndEndNum.newEnd < totalPage"
      @click="$emit('getPageNo', pageNo)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button
      @click="$emit('getPageNo', pageNo + 1)"
      :disabled="pageNo == totalPage"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共{{ total }}条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],

  //计算属性,
  computed: {
    //总共多少页
    totalPage() {
      //向上取整
      return Math.ceil(this.total / this.pageSize);
    },

    //先定义两个变量存储起始数字和结束数字[连续的页码的数字:至少是5]
    startNumAndEndNum() {
      const { continues, pageNo, totalPage } = this;
      let start = 0;
      let end = 0;

      //连续页码数字5[就是至少五页],如果出现不正常的现象[就是不够5页]
      if (continues > totalPage) {
        start = 1;
        end = totalPage;
      } else {
        //正常现象[连续页码5, 但是你的总页数一定是大于5]
        //起始数字
        start = pageNo - parseInt(continues / 2);
        //结束数字
        end = pageNo + parseInt(continues / 2);
        if (start < 1) {
          start = 1;
          end = continues;
        }
        //把出现不正常的现象[end大于总页码]纠正
        if (end > continues) {
          end = totalPage;
          start = totalPage - continues + 1;
        }
      }
      let newEnd = parseInt(end);
      return { start, newEnd };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active {
  background: skyblue;
}
</style>
