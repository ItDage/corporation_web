<template>
  <div style="padding: 10px 10px">
    <el-row>
      <span v-for="o in 4" :key="o">
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>卡片名称</span>
              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{ data }}
            </div>
          </el-card>
        </el-col>
      </span>
    </el-row>
    <el-row style="background-color: #ffffff">
      <el-col :span="24">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180"/>
          <el-table-column
            prop="name"
            label="姓名"
            width="180"/>
          <el-table-column
            prop="address"
            label="地址"/>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { loadMyCorporationCard } from '@/api/checkup'
export default {
  name: 'Mycorporation',
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      data: null
    }
  },
  created() {
    this.loadMyCorporationCard()
  },
  methods: {
    loadMyCorporationCard() {
      return new Promise((resolve, reject) => {
        loadMyCorporationCard().then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('获取社团列表失败!')
          }
          if (response.data.code === 200) {
            console.log(JSON.stringify(response.data.data))
            this.data = response.data.tableData
            // console.log(JSON.stringify(this.tableData))
          } else {
            this.$message.error(response.data.message)
          }
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
</script>
<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
