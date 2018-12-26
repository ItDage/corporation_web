<template>
  <!-- 新增文章-->
  <el-dialog :visible.sync="visible" :title.sync="title" :article.sync="article" :operator.sync="operator" :before-close="refreshTab" center @open="resetForm('form')">
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
    <TinymceDemo ref="editor" v-model="articleContent" :height="300"/>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" plain @click="submitForm('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import TinymceDemo from '@/components/Tinymce'
import { add } from '@/api/article'
export default {
  components: { TinymceDemo },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'xx'
    },
    article: {
      type: Object,
      default: null
    },
    operator: {
      type: String,
      default: 'add'
    }
  },
  data() {
    return {
      form: {
        id: 0,
        title: '',
        type: '',
        content: '',
        author: '',
        date2: '',
        commonType: 0
      },
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
      formLabelWidth: '120px',
      articleContent: '',
      addArticleVisible: true
    }
  },
  // watch: {
  //   articleContent: {
  //     handler: function(old, nval) {
  //       alert(nval + 'new')
  //       this.article.content = nval
  //     }
  //   }
  // },
  methods: {
    refreshTab() {
      // 关闭弹窗，触发父组件修改visible值
      this.$emit('update:visible', false)
      this.$emit('closeMain', true)
    },
    resetForm(formName) {
      console.log('reset')
      this.$refs[formName].resetFields()
      if (this.operator === 'edit') {
        // this.form = this.article
        // 编辑--1
        this.form.commonType = 1
      } else {
        // 新增--2
        this.form.commonType = 2
        console.log('2')
      }
    },
    submitForm(formName) {
      alert(JSON.stringify(this.form))
      this.$refs[formName].validate((valid) => {
        var content = this.articleContent
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
                  this.$emit('update:visible', false)
                  this.$emit('closeMain', true)
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
    }
  }
}
</script>
