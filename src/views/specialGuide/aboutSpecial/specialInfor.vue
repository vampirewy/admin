<template>
  <div class="infor">
    <el-row>
      <el-col :span="12">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="专题名称" prop="name" class="show">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入专题名称"
              @blur="inputName(ruleForm.name)"
            ></el-input>
          </el-form-item>
          <el-form-item label="开始时间" required>
            <el-col :span="11">
              <el-form-item prop="startTime">
                <el-date-picker
                  type="datetime"
                  placeholder="选择日期"
                  v-model="ruleForm.startTime"
                  style="width: 100%;"
                  default-time="16:00:00"
                  @change="startTime(ruleForm.startTime)"
                  value-format="yyyy-MM-dd HH:mm:ss"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="结束时间" required>
            <el-col :span="11">
              <el-form-item prop="endTime">
                <el-date-picker
                  type="datetime"
                  placeholder="选择日期"
                  v-model="ruleForm.endTime"
                  style="width: 100%;"
                  default-time="16:00:00"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  @change="endTime(ruleForm.endTime)"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="投放商圈" prop="type" class="show">
            <el-checkbox-group v-model="ruleForm.type" @change="chooseArea(ruleForm.type)">
              <el-checkbox
                v-for="(item,index) in areaLists"
                :label="item.traName"
                :key="index"
                name="type"
                @change="chooseArea1(item,index)"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="专题详情" prop="details" class="show">
            <!-- <el-checkbox-group v-model="ruleForm.details"> -->
            <div class="top">
              <el-checkbox
                v-model="ruleForm.isImg"
                label="图片"
                name="details"
                @change="chooseImg(ruleForm.isImg)"
              ></el-checkbox>
              <el-upload
                class="upload-demo"
                :action="upImgUrl"
                :headers="headers"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-success="successImg"
                :limit="1"
                :file-list="ruleForm.fileList"
                name="file"
              >
                <el-button type="primary" size="mini">上传图片</el-button>
                <span slot="tip" class="el-upload__tip">只能上传1张图片</span>
              </el-upload>
            </div>
            <div class="bototm">
              <el-checkbox
                v-model="ruleForm.isNotice"
                label="公告"
                name="details"
                @change="chooseNotice(ruleForm.isNotice)"
              ></el-checkbox>
              <el-input
                maxlength="50"
                placeholder="自定义公告"
                style="width:50%;"
                v-model="ruleForm.noticeText"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="可叠加活动" prop="redPack" class="show">
            <el-checkbox-group v-model="ruleForm.redPack">
              <el-checkbox label="红包" name="redPack" @change="chooseRedPack(ruleForm.redPack)"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="选择活动" class="show">
            <el-select
              v-model="ruleForm.value"
              placeholder="请选择"
              @blur="chooseActivity(ruleForm.value)"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="满减规则"
            prop="reduceRule"
            class="show"
            v-if="ruleForm.value===1||ruleForm.value===0"
          >
            <div class="input" v-if="ruleForm.value===0">
              <span>每满</span>
              <el-input
                class="input_num"
                @blur="reduceCount()"
                v-model="ruleForm.reduceRule.gradientAmount"
              ></el-input>
              <span>减</span>
              <el-input
                class="input_num"
                v-model="ruleForm.reduceRule.reduceAmount"
                @blur="reduceCount1()"
              ></el-input>元
              <span
                style="color:red;"
                v-if="reduceDivision&&reduceDivision>=5"
              >返点率{{reduceDivision}}%,已超标准</span>
              <span v-if="reduceDivision&&reduceDivision<5">返点率{{reduceDivision}}%</span>
            </div>
            <div class="input1" v-if="ruleForm.value===1">
              <div class="content m_b_10">
                <span>每满</span>
                <el-input
                  class="input_num"
                  v-model="ruleForm.gradientRule1.gradientAmount"
                  @blur="gradientCount()"
                ></el-input>
                <span>减</span>
                <el-input
                  class="input_num"
                  v-model="ruleForm.gradientRule1.reduceAmount"
                  @blur="gradientCount1()"
                ></el-input>元
                <span
                  style="color:red;"
                  v-if="gradientDivision1&&gradientDivision1>=5"
                >返点率{{gradientDivision1}}%,已超标准</span>
                <span v-if="gradientDivision1&&gradientDivision1<5">返点率{{gradientDivision1}}%</span>
              </div>
              <div class="content m_b_10">
                <span>每满</span>
                <el-input
                  class="input_num"
                  v-model="ruleForm.gradientRule2.gradientAmount"
                  @blur="gradientCount2()"
                ></el-input>
                <span>减</span>
                <el-input
                  class="input_num"
                  v-model="ruleForm.gradientRule2.reduceAmount"
                  @blur="gradientCount3()"
                ></el-input>元
                <span
                  style="color:red;"
                  v-if="gradientDivision2&&gradientDivision2>=5"
                >返点率{{gradientDivision2}}%,已超标准</span>
                <span v-if="gradientDivision2&&gradientDivision2<5">返点率{{gradientDivision2}}%</span>
              </div>
              <div class="content m_b_10">
                <span>每满</span>
                <el-input
                  class="input_num"
                  v-model="ruleForm.gradientRule3.gradientAmount"
                  @blur="gradientCount4()"
                ></el-input>
                <span>减</span>
                <el-input
                  class="input_num"
                  v-model="ruleForm.gradientRule3.reduceAmount"
                  @blur="gradientCount5()"
                ></el-input>元
                <span
                  style="color:red;"
                  v-if="gradientDivision3&&gradientDivision3>=5"
                >返点率{{gradientDivision3}}%,已超标准</span>
                <span v-if="gradientDivision3&&gradientDivision3<5">返点率{{gradientDivision3}}%</span>
              </div>
              <div class="content m_b_10">
                <span>每满</span>
                <el-input
                  class="input_num"
                  v-model="ruleForm.gradientRule4.gradientAmount"
                  @blur="gradientCount6()"
                ></el-input>
                <span>减</span>
                <el-input
                  class="input_num"
                  v-model="ruleForm.gradientRule4.reduceAmount"
                  @blur="gradientCount7()"
                ></el-input>元
                <span
                  style="color:red;"
                  v-if="gradientDivision4&&gradientDivision4>=5"
                >返点率{{gradientDivision4}}%,已超标准</span>
                <span v-if="gradientDivision4&&gradientDivision4<5">返点率{{gradientDivision4}}%</span>
              </div>
              <div class="content m_b_10">
                <span>每满</span>
                <el-input
                  class="input_num"
                  v-model="ruleForm.gradientRule5.gradientAmount"
                  @blur="gradientCount8()"
                ></el-input>
                <span>减</span>
                <el-input
                  class="input_num"
                  v-model="ruleForm.gradientRule5.reduceAmount"
                  @blur="gradientCount9()"
                ></el-input>元
                <span
                  style="color:red;"
                  v-if="gradientDivision5&&gradientDivision5>=5"
                >返点率{{gradientDivision5}}%,已超标准</span>
                <span v-if="gradientDivision5&&gradientDivision5<5">返点率{{gradientDivision5}}%</span>
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">保存并下一步</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Message } from "element-ui";
import { guideAllArea } from "@/api/headerBar";
import {
  createNoActivity,
  createActivity,
  topicDetails
} from "@/api/specialGuide";
import { parse } from "path";
import { create } from "domain";
export default {
  name: "infor",
  // props: {
  //   activeName: ""
  // },
  data() {
    return {
      reg: /^[+]?\d*$/, //正整数
      // reg: /^\d+(\.\d{1,2})?$/, //只能输入正数，小数点两位
      areaLists: [],
      headers: { sessionId: localStorage.getItem(`sessionId`) }, //图片上传的参数
      upImgUrl: `${process.env.VUE_APP_BASE_URL}support/uploadPic`,
      options: [
        {
          value: -1,
          label: "请选择"
        },
        {
          value: 0,
          label: "每满减"
        },
        {
          value: 1,
          label: "梯度满减"
        }
      ],
      ruleForm: {
        name: "", //专题名称
        startTime: "", //开始时间
        endTime: "", //结束时间
        type: [], //商圈
        isImg: false, //图片勾选项
        isNotice: false, //公告勾选项
        noticeText: "", //公告内容
        details: [], //图片和公告选择项
        value: -1, //选择活动类型
        redPack: false, //默认红包 false
        //满减
        reduceRule: {
          gradientAmount: 0,
          reduceAmount: 0
        },
        //梯度
        gradientRule1: { gradientAmount: 0, reduceAmount: 0 },
        gradientRule2: { gradientAmount: 0, reduceAmount: 0 },
        gradientRule3: { gradientAmount: 0, reduceAmount: 0 },
        gradientRule4: { gradientAmount: 0, reduceAmount: 0 },
        gradientRule5: { gradientAmount: 0, reduceAmount: 0 },
        fileList: [], //放图片
        picUrl: "" //提交服务器的图片
      },
      rules: {
        name: [
          { required: true, message: "请输入专题名称", trigger: "blur" },
          { max: 10, message: "最多10个字", trigger: "blur" }
        ],
        startTime: [
          {
            type: "string",
            required: true,
            message: "请选择开始日期",
            trigger: "change"
          }
        ],
        endTime: [
          {
            type: "string",
            required: true,
            message: "请选择结束时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个投放商圈",
            trigger: "change"
          }
        ]
        // redPack:[
        //   {required:true,trigger:"change"}
        // ],
        // rule: [{ required: true, message: "请输入金额" }]
      }
    };
  },
  methods: {
    // fromSpecialGuide(topicId) {
    //   topicDetails(topicId).then(
    //     res => {
    //       console.log(`从专题列表跳转过来的数据为`);
    //       console.log(res.data);
    //       if (res.data.statusCode === 2000) {
    //         this.areaLists = res.data.body.traSelectionList;
    //         //点亮el.checked为true的复选框
    //         this.areaLists.forEach(el=>{if(el.checked){this.ruleForm.type.push(el.traName);};}); 
    //         this.ruleForm.name = res.data.body.topicName; //专题名称
    //         this.ruleForm.startTime = res.data.body.startTime; //开始时间
    //         this.ruleForm.endTime = res.data.body.endTime; //结束时间
    //         this.ruleForm.isImg = res.data.body.picDisplay; //是否显示图片
    //         this.ruleForm.isNotice = res.data.body.isNotice; //是否公告
    //         this.ruleForm.noticeText = res.data.body.noticeText; //公告内容
    //         this.ruleForm.redPack = res.data.body.useRedPacket; //是否使用红包
    //         this.ruleForm.value = res.data.body.topicRule==null?-1:res.data.body.topicRule.ruleType==0?0:res.data.body.topicRule.ruleType==1?1:-1;//选择活动赋值的值 -1为没有，1为梯度，0为满减
    //         // if(res.data.ruleType){this.ruleForm.value=1;}else{this.ruleForm.value=0;}; //判断活动后下面显示的金额框对应满减还是梯度
    //         // if(res.data.topicRule&&res.data.ruleType){
    //         //   //梯度
    //         // }else if(res.data.topicRule){
    //         //   //满减
    //         //   this.ruleForm.reduceRule.gradientAmount = res.data.body.topicRule.gradientList[0].gradientAmount;
    //         //   this.ruleForm.reduceRule.reduceAmount = res.data.body.topicRule.gradiendList[0].reduceAmount;
    //         // };
           
    //       };
    //     },
    //     error => {}
    //   );
    // },
    async allAreaName() {
      const res = await guideAllArea();
      if (res.data.statusCode === 2000) {
        this.areaLists = res.data.body;
        console.log(this.areaLists);
      } else {
      }
    },
    inputName(name) {
      console.log(`专题名称为：${name}`);
    },
    startTime(startTime) {
      console.info(`开始时间为${startTime}`);
    },
    endTime(endTime) {
      console.info(`结束时间为${endTime}`);
    },
    //选择商圈,数据已整理好
    chooseArea(area) {
      // console.log(area);
      // let newLists=[];
      // let totalLists=[];
      // for(let i=0;i<area.length;i++){
      //   newLists.push({traName:area[i],checked:true})
      // };
      // console.log(`新数组`);
      // console.log(newLists);
      // totalLists=[...newLists,...this.areaLists];
      // console.log(totalLists);
      // console.log('长度'+this.ruleForm.type.length);
      // if(this.ruleForm.type.length){
      //    area.length &&
      //   area.forEach(name => {
      //     this.areaLists.length &&
      //       this.areaLists.forEach(el1 => {
      //         if (el1.traName === name) {
      //           el1.checked = true;
      //           console.log(`名字`);
      //           console.log(el1.checked);
      //         };
      //       });
      //   });
      // }else{
      //   this.areaLists.forEach(el=>{
      //     el.checked=false;
      //   });
      // };
      // console.warn(`整理好的数据为`);
      // console.log(this.areaLists);
    },
    //选择商圈，数据已整理好
    chooseArea1(item) {
      console.log(item);
      this.areaLists.length &&
        this.areaLists.forEach(el => {
          if (el.traName === item.traName) {
            item.checked = !item.checked;
          }
        });
      console.log(`最新数据`);
      console.log(this.areaLists);
    },
    chooseImg(isImg) {
      console.log(`是否要图片：${isImg}`);
    },
    chooseNotice(isNotice) {
      console.log(`是否要公告:${isNotice}`);
    },
    successImg(res) {
      if (res.statusCode === 2000) {
        this.ruleForm.fileList.push({ name: res.body, url: res.body });
        this.ruleForm.picUrl = res.body;
      } else {
        this.$message({
          message: res.msg
        });
      }
    },
    handlePreview(file) {
      console.warn(file);
    },
    handleRemove(files, fileList) {
      //确认删除后，数组清空,因为只有一个文件
      this.ruleForm.fileList = [];
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    chooseRedPack(isTrue) {
      console.log(`红包为：${isTrue}`);
    },
    chooseActivity(activity) {
      //0为每满减 1为梯度满减
      console.log(`选择的活动为${activity}`);
    },
    //提交
    submitForm(formName) {
      // this.$emit("say", this.activeName);
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
          if (this.ruleForm.value === -1) {
            this.subRequest().then(res => {
              console.log(res.data);
              if (res.data.statusCode === 2000) {
                // sessionStorage.setItem('topicId',res.data.body.topicId);
                this.$message({
                  message: `信息创建成功`,
                  type: `success`
                });
                this.$router.push({
                  name: "goods",
                  params: { topicId: res.data.body.topicId }
                });
                // console.log(`数字${this.activeName}`);
                // this.$emit("say", this.activeName);
              } else {
                this.$message.error({
                  message: res.data.msg
                });
              }
            });
          } else if (this.ruleForm.value === 0) {
            this.subRequest();
          } else {
            this.sortData().then(res => {
              console.log(res);
              let list = [];
              this.areaLists.length &&
                this.areaLists.forEach(el => {
                  list.push({ checked: el.checked, traId: el.traId });
                });
              let params = {
                topicName: this.ruleForm.name,
                startTime: this.ruleForm.startTime,
                endTime: this.ruleForm.endTime,
                traSelectionList: list,
                useRedPacket: this.ruleForm.redPack,
                noticeText: this.ruleForm.noticeText,
                picUrl: this.ruleForm.picUrl,
                noticeTextDisplay: this.ruleForm.isNotice,
                picDisplay: this.ruleForm.isImg,
                topicType: "moneyOff",
                topicRule: {
                  gradientList: res,
                  ruleType: this.ruleForm.value
                }
              };
              if (
                this.gradientDivision1 >= 5 ||
                this.gradientDivision2 >= 5 ||
                this.gradientDivision3 >= 5 ||
                this.gradientDivision4 >= 5 ||
                this.gradientDivision5 >= 5
              ) {
                this.$confirm(
                  "返点率大于5%,可能会导致商品价格过低,请谨慎设置!是否继续?",
                  "优惠金额过高,请确认",
                  {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                  }
                )
                  .then(() => {
                    createActivity(params).then(
                      res => {
                        if (res.data.statusCode === 2000) {
                          // sessionStorage.setItem('topicId',res.data.body.topicId);
                          this.$router.push({
                            name: "goods",
                            params: { topicId: res.data.body.topicId }
                          });
                          this.$message({
                            message: `信息创建成功`,
                            type: `success`
                          });
                          // console.log(`数字${this.activeName}`);
                          // this.$emit("say", this.activeName);
                        } else {
                          this.$message({
                            message: res.data.msg,
                            type: `error`
                          });
                        }
                      },
                      error => {}
                    );
                  })
                  .catch(() => {
                    this.$message({ type: "info", message: "已取消删除" });
                  });
              } else {
                createActivity(params).then(
                  res => {
                    if (res.data.statusCode === 2000) {
                      // sessionStorage.setItem('topicId',res.data.body.topicId);
                      this.$router.push({
                        name: "goods",
                        params: { topicId: res.data.body.topicId }
                      });
                      this.$message({
                        message: `信息创建成功`,
                        type: `success`
                      });
                      // console.log(`数字${this.activeName}`);
                      // this.$emit("say", this.activeName);
                    } else {
                      this.$message({
                        message: res.data.msg,
                        type: `error`
                      });
                    }
                  },
                  error => {}
                );
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async subRequest() {
      console.log(this.ruleForm.value);
      //-1请选择 0 满减 1梯度
      let list = [];
      this.areaLists.length &&
        this.areaLists.forEach(el => {
          list.push({ checked: el.checked, traId: el.traId });
        });
      if (this.ruleForm.value === -1) {
        let params = {
          topicName: this.ruleForm.name, //专题名称
          startTime: this.ruleForm.startTime, //开始时间
          endTime: this.ruleForm.endTime, //结束时间
          traSelectionList: list, //商圈
          useRedPacket: this.ruleForm.redPack, //红包
          noticeText: this.ruleForm.noticeText, //公告内容
          picUrl: this.ruleForm.picUrl, //图片
          noticeTextDisplay: this.ruleForm.isNotice, //是否公告
          picDisplay: this.ruleForm.isImg //是否图片
        };
        return await createNoActivity(params);
      } else if (this.ruleForm.value === 0) {
        if (
          this.ruleForm.reduceRule.gradientAmount &&
          this.ruleForm.reduceRule.reduceAmount
        ) {
          let params = {
            topicName: this.ruleForm.name,
            startTime: this.ruleForm.startTime,
            endTime: this.ruleForm.endTime,
            traSelectionList: list,
            useRedPacket: this.ruleForm.redPack,
            noticeText: this.ruleForm.noticeText,
            picUrl: this.ruleForm.picUrl,
            noticeTextDisplay: this.ruleForm.isNotice,
            picDisplay: this.ruleForm.isImg,
            topicType: "moneyOff",
            topicRule: {
              gradientList: [
                {
                  gradientAmount: this.ruleForm.reduceRule.gradientAmount,
                  reduceAmount: this.ruleForm.reduceRule.reduceAmount
                }
              ],
              ruleType: this.ruleForm.value
            }
          };
          //大于等于5，弹框提醒
          if (this.reduceDivision >= 5) {
            this.$confirm(
              "返点率大于5%,可能会导致商品价格过低,请谨慎设置!是否继续?",
              "优惠金额过高,请确认",
              {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              }
            ).then(() => {
              createActivity(params).then(
                res => {
                  if (res.data.statusCode === 2000) {
                    this.$message({
                      message: `信息创建成功`,
                      type: `success`
                    });
                    this.$router.push({
                      name: "goods",
                      params: { topicId: res.data.body.topicId }
                    });
                    // console.log(`数字${this.activeName}`);
                    // this.$emit("say", this.activeName);
                  } else {
                    this.$message({
                      message: res.data.msg,
                      type: `error`
                    });
                  }
                },
                error => {}
              );
            });
          } else {
            createActivity(params).then(
              res => {
                if (res.data.statusCode === 2000) {
                  this.$router.push({
                    name: "goods",
                    params: { topicId: res.data.body.topicId }
                  });
                  // sessionStorage.setItem('topicId',res.data.body.topicId);
                  this.$message({
                    message: `信息创建成功`,
                    type: `success`
                  });
                  // console.log(`数字${this.activeName}`);
                  // this.$emit("say", this.activeName);
                } else {
                  this.$message({
                    message: res.data.msg,
                    type: `error`
                  });
                }
              },
              error => {}
            );
          }
        } else {
          this.$message({
            message: `请输入满减金额`,
            type: `error`
          });
        }
      } else {
        // return this.sortData();
        //梯度满减
        //最低梯度必须为一项,先判断第一项为空时，直接提示请输入
        // let params = {
        //   topicName: this.ruleForm.name,
        //   startTime: this.ruleForm.startTime,
        //   endTime: this.ruleForm.endTime,
        //   traSelectionList: list,
        //   useRedPacket: this.ruleForm.redPack,
        //   noticeText: this.ruleForm.noticeText,
        //   picUrl: this.ruleForm.picUrl,
        //   noticeTextDisplay: this.ruleForm.isImg,
        //   picDisplay: this.ruleForm.isNotice,
        //   topicType: "moneyOff",
        //   topicRule: {
        //     gradientList: lists,
        //     ruleType: this.ruleForm.value
        //   }
        // };
        // if (this.gradientDivision1 >= 5 ||this.gradientDivision2 >= 5 ||this.gradientDivision3 >= 5 ||this.gradientDivision4 >= 5 ||this.gradientDivision5 >= 5) {
        //   this.$confirm(
        //     "返点率大于5%,可能会导致商品价格过低,请谨慎设置!是否继续?",
        //     "优惠金额过高,请确认",
        //     {
        //       confirmButtonText: "确定",
        //       cancelButtonText: "取消",
        //       type: "warning"
        //     }
        //   )
        //     .then(() => {
        //       createActivity(params).then(
        //         res => {
        //           if (res.data.statusCode === 2000) {
        //             this.$message({
        //               message: `信息创建成功`,
        //               type: `success`
        //             });
        //             console.log(`数字${this.activeName}`);
        //             this.$emit("say", this.activeName);
        //           } else {
        //             this.$message({
        //               message: res.data.msg,
        //               type: `error`
        //             });
        //           }
        //         },
        //         error => {}
        //       );
        //     })
        //     .catch(() => {
        //       this.$message({ type: "info", message: "已取消删除" });
        //     });
        // } else {
        //   createActivity(params).then(
        //       res => {
        //         if (res.data.statusCode === 2000) {
        //           this.$message({
        //             message: `信息创建成功`,
        //             type: `success`
        //           });
        //           console.log(`数字${this.activeName}`);
        //           this.$emit("say", this.activeName);
        //         } else {
        //           this.$message({
        //             message: res.data.msg,
        //             type: `error`
        //           });
        //         }
        //       },
        //       error => {}
        //     );
        // };
      }
    },
    sortData() {
      let level1 = parseFloat(this.ruleForm.gradientRule1.gradientAmount),
        level2 = parseFloat(this.ruleForm.gradientRule2.gradientAmount),
        level3 = parseFloat(this.ruleForm.gradientRule3.gradientAmount),
        level4 = parseFloat(this.ruleForm.gradientRule4.gradientAmount),
        level5 = parseFloat(this.ruleForm.gradientRule5.gradientAmount),
        lists = [];
      let promise = new Promise((resolve, reject) => {
        if (level1 != 0) {
          //5种情况
          if (
            level1 != 0 &&
            level2 == 0 &&
            level3 == 0 &&
            level4 == 0 &&
            level5 == 0
          ) {
            console.info(`这是第一档${level1}`);
            lists.push(this.ruleForm.gradientRule1);
            console.warn(lists);
            // return resolve(lists);
            console.info(`发送请求1`);
          } else if (
            level1 != 0 &&
            level2 != 0 &&
            level3 == 0 &&
            level4 == 0 &&
            level5 == 0
          ) {
            console.info(`这是第二档${level1}${level2}`);
            if (level2 > level1) {
              console.info(`发送请求2`);
              lists.push(
                this.ruleForm.gradientRule1,
                this.ruleForm.gradientRule2
              );
              // lists=[this.ruleForm.gradientRule1,this.ruleForm.gradientRule2];
              console.warn(lists);
            } else {
              console.warn(`报错2`);
            }
          } else if (
            level1 != 0 &&
            level2 != 0 &&
            level3 != 0 &&
            level4 == 0 &&
            level5 == 0
          ) {
            console.info(`这是第三档${level1}${level2}${level3}`);
            if (level3 > level2 && level2 > level1) {
              console.info(`发送请求3`);
              lists.push(
                this.ruleForm.gradientRule1,
                this.ruleForm.gradientRule2,
                this.ruleForm.gradientRule3
              );
              console.warn(lists);
            } else {
              console.warn(`报错3`);
            }
          } else if (
            level1 != 0 &&
            level2 != 0 &&
            level3 != 0 &&
            level4 != 0 &&
            level5 == 0
          ) {
            console.info(`这是第4档${level1}${level2}${level3}${level4}`);
            if (level4 > level3 && level3 > level2 && level2 > level1) {
              lists.push(
                this.ruleForm.gradientRule1,
                this.ruleForm.gradientRule2,
                this.ruleForm.gradientRule3,
                this.ruleForm.gradientRule4
              );
              console.warn(lists);
              console.info(`发送请求4`);
            } else {
              console.warn(`报错4`);
            }
          } else if (
            level1 != 0 &&
            level2 != 0 &&
            level3 != 0 &&
            level4 != 0 &&
            level5 != 0
          ) {
            if (
              level5 > level4 &&
              level4 > level3 &&
              level3 > level2 &&
              level2 > level1
            ) {
              console.info(`发送请求5`);
              lists.push(
                this.ruleForm.gradientRule1,
                this.ruleForm.gradientRule2,
                this.ruleForm.gradientRule3,
                this.ruleForm.gradientRule4,
                this.ruleForm.gradientRule5
              );
              console.warn(lists);
            } else {
              console.warn(`报错5`);
            }
          }
          console.log(`最终数据为`);
          console.warn(lists);
          if (lists && lists.length) {
            return resolve(lists);
          } else {
            this.$message({
              message: `梯度金额只能递增,请重新输入`,
              type: `error`
            });
          }
        } else {
          this.$message({
            message: `请输入金额111`,
            type: `error`
          });
        }
      });
      return promise;
    },
    //每满减满金额
    reduceCount() {
      console.log(`输入的满减金额`);
      console.log(this.ruleForm.reduceRule.gradientAmount);
      if (!this.reg.test(this.ruleForm.reduceRule.gradientAmount)) {
        this.$message({
          message: `只能输入正整数`,
          type: `error`
        });
        this.ruleForm.reduceRule.gradientAmount = 0;
      }
    },
    //每满减优惠金额
    reduceCount1() {
      if (!this.reg.test(this.ruleForm.reduceRule.reduceAmount)) {
        this.$message({
          message: `只能输入正整数`,
          type: `error`
        });
        this.ruleForm.reduceRule.reduceAmount = 0;
      }
    },
    //梯度5级
    gradientCount() {
      if (!this.reg.test(this.ruleForm.gradientRule1.gradientAmount)) {
        this.$message({ message: `只能输入正整数`, type: `error` });
        this.ruleForm.gradientRule1.gradientAmount = 0;
      }
    },
    gradientCount1() {
      if (!this.reg.test(this.ruleForm.gradientRule1.reduceAmount)) {
        this.$message({ message: `只能输入正整数`, type: `error` });
        this.ruleForm.gradientRule1.reduceAmount = 0;
      }
    },
    gradientCount2() {
      if (!this.reg.test(this.ruleForm.gradientRule2.gradientAmount)) {
        this.$message({ message: `只能输入正整数`, type: `error` });
        this.ruleForm.gradientRule2.gradientAmount = 0;
      }
    },
    gradientCount3() {
      if (!this.reg.test(this.ruleForm.gradientRule2.reduceAmount)) {
        this.$message({ message: `只能输入正整数`, type: `error` });
        this.ruleForm.gradientRule2.reduceAmount = 0;
      }
    },
    gradientCount4() {
      if (!this.reg.test(this.ruleForm.gradientRule3.gradientAmount)) {
        this.$message({ message: `只能输入正整数`, type: `error` });
        this.ruleForm.gradientRule3.gradientAmount = 0;
      }
    },
    gradientCount5() {
      if (!this.reg.test(this.ruleForm.gradientRule3.reduceAmount)) {
        this.$message({ message: `只能输入正整数`, type: `error` });
        this.ruleForm.gradientRule3.reduceAmount = 0;
      }
    },
    gradientCount6() {
      if (!this.reg.test(this.ruleForm.gradientRule4.gradientAmount)) {
        this.$message({ message: `只能输入正整数`, type: `error` });
        this.ruleForm.gradientRule4.gradientAmount = 0;
      }
    },
    gradientCount7() {
      if (!this.reg.test(this.ruleForm.gradientRule4.reduceAmount)) {
        this.$message({ message: `只能输入正整数`, type: `error` });
        this.ruleForm.gradientRule4.reduceAmount = 0;
      }
    },
    gradientCount8() {
      if (!this.reg.test(this.ruleForm.gradientRule5.gradientAmount)) {
        this.$message({ message: `只能输入正整数`, type: `error` });
        this.ruleForm.gradientRule5.gradientAmount = 0;
      }
    },
    gradientCount9() {
      if (!this.reg.test(this.ruleForm.gradientRule5.reduceAmount)) {
        this.$message({ message: `只能输入正整数`, type: `error` });
        this.ruleForm.gradientRule5.reduceAmount = 0;
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  computed: {
    reduceDivision() {
      let percentNum = 100;
      return (
        parseFloat(
          this.ruleForm.reduceRule.reduceAmount /
            this.ruleForm.reduceRule.gradientAmount
        ) * percentNum
      ).toFixed(2);
    },
    gradientDivision1() {
      let percentNum = 100;
      return (
        parseFloat(
          this.ruleForm.gradientRule1.reduceAmount /
            this.ruleForm.gradientRule1.gradientAmount
        ) * percentNum
      ).toFixed(2);
    },
    gradientDivision2() {
      let percentNum = 100;
      return (
        parseFloat(
          this.ruleForm.gradientRule2.reduceAmount /
            this.ruleForm.gradientRule2.gradientAmount
        ) * percentNum
      ).toFixed(2);
    },
    gradientDivision3() {
      let percentNum = 100;
      return (
        parseFloat(
          this.ruleForm.gradientRule3.reduceAmount /
            this.ruleForm.gradientRule3.gradientAmount
        ) * percentNum
      ).toFixed(2);
    },
    gradientDivision4() {
      let percentNum = 100;
      return (
        parseFloat(
          this.ruleForm.gradientRule4.reduceAmount /
            this.ruleForm.gradientRule4.gradientAmount
        ) * percentNum
      ).toFixed(2);
    },
    gradientDivision5() {
      let percentNum = 100;
      return (
        parseFloat(
          this.ruleForm.gradientRule5.reduceAmount /
            this.ruleForm.gradientRule5.gradientAmount
        ) * percentNum
      ).toFixed(2);
    }
  },
  /**  从专题列表编辑中跳转而来
   *   @topicId为专题ID
   *   @status为专题状态 未生效可以全部修改 生效中只能修改时间
   */
  created() {
    this.allAreaName();
    //注释为编辑跳转用
    // if (this.$route.params.topicId) {
    //   this.topicId = this.$route.params.topicId;
    //   this.status = this.$route.params.status;
    //   this.fromSpecialGuide(this.topicId);
    // } else {
    //   this.allAreaName();
    // }
    // console.log(this.$route.params);
  }
  // updated() {
  //   this.ruleForm = {};
  // }
};
</script>

<style scoped lang="less">
.infor {
  margin-top: 20px;
}
.show {
  text-align: left;
}
.top {
  display: flex;
}
.input {
  display: flex;
  > span {
    &:last-child {
      margin-left: 10px;
    }
  }
  .input_num {
    margin: 0 5px;
    width: 15%;
  }
}
.input1 {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  .content {
    width: 100%;
    display: flex;
    > span {
      &:last-child {
        margin-left: 10px;
      }
    }
    .input_num {
      margin: 0 5px;
      width: 15%;
    }
  }
}
.m_b_10 {
  margin-bottom: 10px;
}
</style>