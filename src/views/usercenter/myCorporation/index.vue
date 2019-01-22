<template>
  <div style="padding: 10px 10px">
    <el-row>
      <span v-for="o in data" :key="o.createDate">
        <el-col :span="12">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <span style="text-align: center">{{ o.corporation }}</span>
            </div>
            <div class="text item">
              <p>社团简介: {{ o.corporationDesc }}</p>
              <p>管理员: {{ o.admin }}</p>
              <p>加入时间: {{ o.createDate }}</p>
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
            type="index"
            align="center"
            width="65"/>
          <el-table-column
            :label="$t('i18nView.activityName')"
            prop="name"
            width="150px"/>
          <el-table-column
            :label="$t('i18nView.activityDate')"
            prop="activityDate"/>
          <el-table-column
            :label="$t('i18nView.activityAddress')"
            prop="address"
            align="center"/>
          <el-table-column
            :label="$t('i18nView.content')"
            prop="content"
            align="center"/>
          <el-table-column
            :label="$t('i18nView.contact')"
            prop="contact"
            align="center"/>
          <el-table-column
            :label="$t('i18nView.needs')"
            prop="needs"
            align="center"/>
          <el-table-column
            :label="$t('i18nView.description')"
            prop="description"
            align="center"/>
          <el-table-column
            :label="$t('i18nView.createDate')"
            prop="createDate"
            align="center"/>
          <el-table-column :label="$t('i18nView.operate')" align="center">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="handleAddActivity(scope.row)">{{ $t('i18nView.addActivity') }}</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="handleAddActivity(scope.row)">{{ scope.row.commonType }}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            :current-page="currentPage"
            :page-sizes="[5]"
            :total="totalSize"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { loadMyCorporationCard } from '@/api/checkup'
import { addActivity } from '@/api/activity'
export default {
  name: 'Mycorporation',
  data() {
    return {
      tableData: [],
      data: null,
      totalSize: 0,
      pageSize: 5,
      currentPage: 1
    }
  },
  created() {
    this.loadMyCorporationCard()
  },
  methods: {
    loadMyCorporationCard() {
      const param = {
        'currentPage': this.currentPage,
        'pageSize': this.pageSize
      }
      return new Promise((resolve, reject) => {
        loadMyCorporationCard(JSON.stringify(param)).then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('获取社团列表失败!')
          }
          if (response.data.code === 200) {
            this.data = response.data.corporationList
            this.tableData = response.data.tableData
            console.log(JSON.stringify(this.tableData))
            this.totalSize = response.data.total
          } else {
            this.$message.error(response.data.message)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.loadMyCorporationCard()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.loadMyCorporationCard()
    },
    handleAddActivity(row) {
      const param = {
        'id': row.id
      }
      return new Promise((resolve, reject) => {
        addActivity(JSON.stringify(param)).then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('加入活动失败!')
          }
          if (response.data.code === 200) {
            this.$message({
              type: 'success',
              message: response.data.message
            })
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
