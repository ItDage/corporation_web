<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" style="width: 100%">
        <el-form-item label="申请人">
          <el-input v-model="formInline.creater" placeholder="申请人"/>
        </el-form-item>
        <el-form-item label="证件号码">
          <el-input v-model="formInline.uploadUser" placeholder="身份证号码"/>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="formInline.phone" placeholder="手机号"/>
        </el-form-item>
        <el-form-item label="上传时间">
          <el-date-picker
            v-model="formInline.uploadDate"
            :picker-options="pickerOptions1"
            align="right"
            type="date"
            placeholder="选择日期"/>
        </el-form-item>
        <el-form-item label="是否通过">
          <el-select v-model="formInline.type" filterable placeholder="是否通过" clearable>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="showForm('addArticle')">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="index"
        align="center"
        width="65"/>
      <el-table-column
        prop="school"
        label="学校"
        width="150px"/>
      <el-table-column
        prop="user.username"
        label="申请人"
        width="65"/>
      <el-table-column
        prop="creater"
        label="邮箱"
        width="120"/>
      <el-table-column
        prop="identification"
        label="身份证号"
        align="center"
        width="160"/>
      <el-table-column
        prop="phone"
        label="手机号"
        align="center"
        width="120"/>
      <el-table-column
        label="申请时间"
        align="center"
        width="120">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span style="margin-left: 10px">{{ scope.row.createDate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="ispass"
        label="是否通过"
        align="center"
        width="120"/>
      <el-table-column
        prop="fileEntityList.name"
        label="审核文件列表"
        align="center"
        width="100"/>
      <el-table-column
        prop="description"
        label="备注"
        align="center"
        width="100"/>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">下载</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[10, 20]"
        :total="totalSize"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
    <!--<addArticle v-if="addArticleVisible" ref="addArticle" :visible.sync="addArticleVisible" :title.sync="title" :operator.sync="opr" :article.sync="article" @closeMain="parentFn" />-->
    <!--<uploadFile v-if="uploadFileVisible" ref="uploadFile" :visible.sync="uploadFileVisible" :show-input.sync="showInput" @closeMain="parentFn" />-->
  </div>
</template>

<script>

// import addArticle from '../addArticle'
// import uploadFile from './uploadFile'
import { getAll } from '@/api/checkup'
export default {
  // components: { addArticle, uploadFile },
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        author: 'doctor',
        address: '上海市普陀区金沙江路 1518 弄',
        tag: '家'
      }],
      options: [{
        value: '00',
        label: '未通过'
      }, {
        value: '01',
        label: '已通过'
      }],
      formInline: {
        school: '',
        creater: '',
        phone: '',
        identification: '',
        ispass: ''
      },
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      addArticleVisible: false,
      uploadFileVisible: false,
      dialogFormVisible: false,
      currentPage: 1,
      totalSize: 0,
      pageSize: 10,
      title: '新增文章',
      opr: 'add',
      showInput: true,
      article: {
        id: 1,
        title: null,
        author: null,
        content: null,
        type: 1000
      }
    }
  },
  created() {
    this.loadTableData(this.currentPage, this.pageSize)
  },
  methods: {
    handleEdit(index, row) {
    },
    handleDelete(index, id) {
    },
    onSubmit() {
      this.currentPage = 1
      this.pageSize = 10
      this.loadTableData(this.currentPage, this.pageSize, this.formInline.name, this.formInline.uploadUser, this.formInline.uploadDate, this.formInline.type)
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.loadTableData(this.currentPage, val, this.formInline.title, this.formInline.author, this.formInline.publishDate, this.formInline.type)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.loadTableData(val, this.pageSize, this.formInline.title, this.formInline.author, this.formInline.publishDate, this.formInline.type)
    },
    showForm(refForm) {
      this.addArticleVisible = true
      this.opr = 'add'
    },
    uploadFileForm() {
      this.uploadFileVisible = true
      this.opr = 'add'
    },
    loadTableData(currentPage, size, creater, identification, phone, create_date, ispass) {
      const param = {
        'currentPage': currentPage,
        'pageSize': size,
        'creater': creater,
        'identification': identification,
        'phone': phone,
        'createDate': create_date,
        'ispass': ispass
      }
      return new Promise((resolve, reject) => {
        getAll(param).then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('获取文件列表失败!')
          }
          if (response.data.code === 200) {
            console.log(response.data)
            this.tableData = response.data.tableData
            // alert(JSON.stringify(this.tableData))
            this.totalSize = response.data.total
          } else {
            this.$message.error(response.data.message)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    refreshTab() {
      this.loadTableData(this.currentPage, this.pageSize, this.formInline.title, this.formInline.author, this.formInline.publishDate, this.formInline.type)
    },
    transferTag(scope) {
      var color = ''
      switch (scope.row.typeName) {
        case '认证模板' :
          color = 'primary'
          break
        case '必填模板':
          color = 'success'
          break
        case '其他模板':
          color = 'warning'
          break
        default:
          color = 'danger'
      }
      return color
    },
    parentFn(data) {
      console.log(data + 'ssss')
      if (data) {
        this.refreshTab()
      }
    }
  }
}
</script>
