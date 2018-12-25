<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="width: 100%">
      <el-form-item label="标题">
        <el-input v-model="formInline.title" placeholder="标题"/>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="formInline.author" placeholder="作者"/>
      </el-form-item>
      <el-form-item label="发布时间">
        <el-date-picker
          v-model="formInline.publishDate"
          :picker-options="pickerOptions1"
          align="right"
          type="date"
          placeholder="选择日期"/>
      </el-form-item>
      <el-form-item label="文章类型">
        <el-select v-model="formInline.type" filterable placeholder="文章类型" clearable>
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
        <el-button type="success" @click="showForm">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="index"/>
      <el-table-column
        prop="title"
        label="标题"/>
      <el-table-column
        prop="content"
        label="内容"/>
      <el-table-column
        prop="author"
        label="作者"/>
      <el-table-column
        label="日期">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span style="margin-left: 10px">{{ scope.row.publishDate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :filters="[{ text: '公告', value: '公告' }, { text: '法律法规', value: '法律法规' }, { text: '新闻', value: '新闻' }, { text: '其他', value: '其他' }]"
        :filter-method="filterTag"
        prop="typeName"
        label="类型"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type="transferTag(scope)"
            disable-transitions>{{ scope.row.typeName }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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

    <!-- 新增文章-->
    <el-dialog :visible.sync="dialogFormVisible" center title="新增文章" @open="resetForm('form')" @close="refreshTab">
      <el-form ref="form" :model="form" :rules="rules" class="demo-ruleForm">
        <el-form-item :label-width="formLabelWidth" label="标题" prop="title">
          <el-input v-model="form.title" autocomplete="off" placeholder="请输入标题"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="作者" prop="author">
          <el-input v-model="form.author" autocomplete="off" placeholder="请输入作者"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择文章类型">
            <el-option label="公告" value="1000"/>
            <el-option label="新闻" value="1001"/>
            <el-option label="法律法规" value="1002"/>
            <el-option label="其他" value="1003"/>
          </el-select>
        </el-form-item>
      </el-form>
      <TinymceDemo ref="tinymceDemo"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" plain @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import TinymceDemo from '../components-demo/tinymce'
import { add, getArticle, delArticle } from '@/api/article'
export default {
  components: { TinymceDemo },
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        'name': '王小虎',
        author: 'doctor',
        address: '上海市普陀区金沙江路 1518 弄',
        tag: '家'
      }],
      options: [{
        value: '1000',
        label: '公告'
      }, {
        value: '1001',
        label: '新闻'
      }, {
        value: '1002',
        label: '法律法规'
      }, {
        value: '1003',
        label: '其他'
      }],
      formInline: {
        title: '',
        author: '',
        type: null,
        publishDate: ''
      },
      form: {
        title: '',
        type: '',
        content: '',
        author: '',
        date2: '',
        delivery: false,
        resource: '',
        desc: ''
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
      dialogFormVisible: false,
      formLabelWidth: '120px',
      currentPage: 1,
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 1, message: '长度在大于1个字符', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '请输入作者', trigger: 'blur' },
          { min: 1, message: '长度在大于1个字符', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择文章类型', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          { min: 1, message: '长度在大于1个字符', trigger: 'blur' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ]
      },
      value2: '',
      totalSize: 400,
      pageSize: 10
    }
  },
  created() {
    this.loadTableData(this.currentPage, this.pageSize)
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, id) {
      const param = {
        'id': id
      }
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return new Promise((resolve, reject) => {
          delArticle(JSON.stringify(param)).then(response => {
            if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
              reject('删除文章失败!')
            }
            if (response.data.code === 200) {
              this.loadTableData(this.currentPage, this.pageSize, this.formInline.title, this.formInline.author, this.formInline.publishDate, this.formInline.type)
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      console.log(index, row)
    },
    onSubmit() {
      this.currentPage = 1
      this.pageSize = 10
      this.loadTableData(this.currentPage, this.pageSize, this.formInline.title, this.formInline.author, this.formInline.publishDate, this.formInline.type)
    },
    filterTag(value, row) {
      return row.typeName === value
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        var content = this.$refs.tinymceDemo.content
        if (valid) {
          if (content == null || content.length === 0) {
            this.$message({
              message: '文章内容不能为空',
              type: 'warning'
            })
            return false
          } else {
            var article = this.form
            article['content'] = content
            return new Promise((resolve, reject) => {
              add(JSON.stringify(article)).then(response => {
                if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
                  reject('新增文章失败!')
                }
                if (response.data.code === 200) {
                  this.$message({
                    message: response.data.message,
                    type: 'success'
                  })
                  this.dialogFormVisible = false
                } else {
                  this.$message.error(response.data.message)
                }
              }).catch(error => {
                reject(error)
              })
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.loadTableData(this.currentPage, val, this.formInline.title, this.formInline.author, this.formInline.publishDate, this.formInline.type)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.loadTableData(val, this.pageSize, this.formInline.title, this.formInline.author, this.formInline.publishDate, this.formInline.type)
    },
    showForm() {
      this.dialogFormVisible = true
    },
    loadTableData(currentPage, size, title, author, publishDate, type) {
      const param = {
        'currentPage': currentPage,
        'pageSize': size,
        'title': title,
        'author': author,
        'publishDate': publishDate,
        'type': type
      }
      return new Promise((resolve, reject) => {
        getArticle(JSON.stringify(param)).then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('获取文章列表失败!')
          }
          if (response.data.code === 200) {
            this.tableData = response.data.tableData
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
        case '公告' :
          color = 'primary'
          break
        case '新闻':
          color = 'success'
          break
        case '法律法规':
          color = 'warning'
          break
        default:
          color = 'danger'
      }
      return color
    }
  }
}
</script>
