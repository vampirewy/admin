<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div class="guide_setting">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="120px"
            class="demo-ruleForm"
          >
            <el-form-item label="导购模版" prop="resource" class="show">
              <el-radio-group v-model="ruleForm.resource" @change="demo(ruleForm.resource)">
                <el-radio v-for="(item,index) in resourceLists" :label="item.name" :key="index"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <demoOne v-if="showResourceOne" :areaLists="areaLists"></demoOne>
          <demoTwo v-if="showResourceTwo" :areaLists="areaLists"></demoTwo>
          <demoThree v-if="showResourceThree" :areaLists="areaLists"></demoThree>
          <demoFour v-if="showResourceFour" :areaLists="areaLists"></demoFour>
          <demoFive v-if="showResourceFive" :areaLists="areaLists"></demoFive>
        
        </div>
      </el-col>
      <el-col :span="12">
        <img src="../../img/demo1.png" alt v-if="showResourceOne">
        <img src="../../img/demo2.png" alt v-if="showResourceTwo">
        <img src="../../img/demo3.png" alt v-if="showResourceThree">
        <img src="../../img/demo4.png" alt v-if="showResourceFour">
        <img src="../../img/demo5.png" alt v-if="showResourceFive">
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Message } from "element-ui";
import demoOne from "@/views/shoppingGuide/demo1/demoOne.vue";
import demoTwo from "@/views/shoppingGuide/demo2/demoTwo.vue";
import demoThree from "@/views/shoppingGuide/demo3/demoThree.vue";
import demoFour from "@/views/shoppingGuide/demo4/demoFour.vue";
import demoFive from "@/views/shoppingGuide/demo5/demoFive.vue";
import { guideAllArea } from "@/api/headerBar";
// import { create } from "@/api/shoppingGuide";
export default {
  name: "addShopping",
  components: {
    demoOne,
    demoTwo,
    demoThree,
    demoFour,
    demoFive
  },
  data() {
    return {
      showResourceOne: true, //模版1
      showResourceTwo: false, //模版2
      showResourceThree: false, //模版3
      showResourceFour: false, //模版4
      showResourceFive: false, //模版5
      showResourceSix: false, //模版6
      areaLists: [],
      ruleForm: {
        resource: "模版1" //默认模版
      },
      resourceLists: [
        { name: "模版1" },
        { name: "模版2" },
        { name: "模版3" },
        { name: "模版4" },
        { name: "模版5" }
      ],
      rules: {
        resource: [
          { required: true, message: "请选择使用模版", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    //获取所有商圈
    async allAreaName() {
      await guideAllArea().then(
        res => {
          console.log(res.data);
          if (res.data.statusCode === 2000) {
            this.areaLists = res.data.body;
          }
          console.log(this.areaLists);
        },
        error => {
          console.log(error);
        }
      );
    },
    //选择模版
    demo(resource) {
      console.log(resource);
      if (resource === "模版1") {
        this.showResourceOne = true;
        this.showResourceTwo = false;
        this.showResourceThree = false;
        this.showResourceFour = false;
        this.showResourceFive = false;
      } else if (resource === "模版2") {
        this.showResourceTwo = true;
        this.showResourceOne = false;
        this.showResourceThree = false;
        this.showResourceFour = false;
        this.showResourceFive = false;
        this.ruleForm.goods = "";
        this.inputGoodsNum = "";
        this.ruleForm.submitImg = "";
      } else if (resource === "模版3") {
        this.showResourceThree = true;
        this.showResourceOne = false;
        this.showResourceTwo = false;
        this.showResourceFour = false;
        this.showResourceFive = false;
        this.ruleForm.goods = "";
        this.inputGoodsNum = "";
        this.ruleForm.submitImg = "";
      } else if (resource === "模版4") {
        this.showResourceFour = true;
        this.showResourceOne = false;
        this.showResourceTwo = false;
        this.showResourceThree = false;
        this.showResourceFive = false;
        this.ruleForm.goods = "";
        this.inputGoodsNum = "";
        this.ruleForm.submitImg = "";
      } else {
        this.showResourceFive = true;
        this.showResourceOne = false;
        this.showResourceTwo = false;
        this.showResourceThree = false;
        this.showResourceFour = false;
        this.ruleForm.goods = "";
        this.inputGoodsNum = "";
        this.ruleForm.submitImg = "";
      }
    }
  },
  created() {
    this.allAreaName();
  }
};
</script>

<style scoped lang="less">
.guide_setting {
  margin-top: 20px;
}
.show {
  text-align: left;
}
.text_align {
  text-align: left;
}
</style>