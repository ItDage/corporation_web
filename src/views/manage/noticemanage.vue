<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="width: 100%">
      <el-form-item label="标题">
        <el-input v-model="formInline.user" placeholder="标题"/>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="formInline.user" placeholder="作者"/>
      </el-form-item>
      <el-form-item label="发布时间">
        <el-date-picker
          v-model="value2"
          :picker-options="pickerOptions1"
          align="right"
          type="date"
          placeholder="选择日期"/>
      </el-form-item>
      <el-form-item label="文章类型">
        <el-select v-model="formInline.region" placeholder="文章类型">
          <el-option label="公告" value="shanghai"/>
          <el-option label="新闻" value="beijing"/>
          <el-option label="法律法规" value="bei"/>
          <el-option label="其他" value="beijin"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="dialogFormVisible = true">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="标题"/>
      <el-table-column
        prop="author"
        label="作者"/>
      <el-table-column
        label="日期">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="姓名">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
        :filter-method="filterTag"
        prop="tag"
        label="类型"
        filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag === '家' ? 'primary' : 'success'"
            disable-transitions>{{ scope.row.tag }}</el-tag>
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
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogFormVisible" center title="新增文章">
      <el-form ref="form" :model="form" :rules="rules" class="demo-ruleForm">
        <el-form-item :label-width="formLabelWidth" label="标题" prop="title">
          <el-input v-model="form.title" autocomplete="off"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="作者" prop="author">
          <el-input v-model="form.author" autocomplete="off"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择文章类型">
            <el-option label="公告" value="100"/>
            <el-option label="新闻" value="101"/>
            <el-option label="法律法规" value="102"/>
            <el-option label="其他" value="103"/>
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
import store from './store'
export default {
  components: { TinymceDemo },
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        author: 'doctor',
        address: '上海市普陀区金沙江路 1518 弄',
        tag: '家'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        author: 'doctor',
        address: '上海市普陀区金沙江路 1517 弄',
        tag: '公司'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        author: 'doctor',
        address: '上海市普陀区金沙江路 1519 弄',
        tag: '家'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        author: 'doctor',
        address: '上海市普陀区金沙江路 1516 弄',
        tag: '家'
      }],
      formInline: {
        user: '',
        region: ''
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
      }
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    onSubmit() {
      console.log('submit!')
    },
    filterTag(value, row) {
      return row.tag === value
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
            store.dispatch('GetUserInfo').then(res => {
              const data = res.data.data
              this.$message(JSON.stringify(data))
            })
            alert('submit!')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
