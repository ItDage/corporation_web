<template>
  <div class="app-container">
    <el-form ref="registerForm" :model="registerForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item :label="$t('i18nView.username')" prop="username">
        <el-input v-model="registerForm.username" :placeholder="$t('tip.username')"/>
      </el-form-item>
      <el-form-item :label="$t('i18nView.gender')" prop="gender">
        <el-select v-model="registerForm.gender" :placeholder="$t('tip.gender')">
          <el-option label="男" value="1"/>
          <el-option label="女" value="0"/>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('i18nView.phone')" prop="phone">
        <el-input v-model="registerForm.phone" :placeholder="$t('tip.phone')"/>
      </el-form-item>
      <el-form-item :label="$t('i18nView.identification')" prop="identification">
        <el-input v-model="registerForm.identification" :placeholder="$t('tip.identification')"/>
      </el-form-item>
      <el-form-item :label="$t('i18nView.birth')">
        <el-col :span="7">
          <el-date-picker v-model="registerForm.birth" :placeholder="$t('tip.birth')" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="date" style="width: 94%;"/>
        </el-col>
        <el-col :span="2" class="line"/>
        <el-col :span="11"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('registerForm')">{{ $t('i18nView.submit') }}</el-button>
        <el-button @click="resetForm('registerForm')">{{ $t('i18nView.reset') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { update } from '@/api/userMethod'
import local from '@/views/i18n-demo/local'
const viewName = 'i18nView'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm2.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        username: '',
        gender: '',
        birth: '',
        email: '',
        validCode: '',
        password: '',
        checkPass: '',
        commonType: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        commonType: [
          { required: true, message: '请选择类型', trigger: 'change' }
        ],
        validCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '长度 4 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' },
          { min: 6, message: '长度 6 个字符', trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    lang: {
      get() {
        return this.$store.state.app.language
      },
      set(lang) {
        this.$i18n.locale = lang
        this.$store.dispatch('setLanguage', lang)
      }
    }
  },
  created() {
    if (!this.$i18n.getLocaleMessage('en')[viewName]) {
      this.$i18n.mergeLocaleMessage('en', local.en)
      this.$i18n.mergeLocaleMessage('zh', local.zh)
      this.$i18n.mergeLocaleMessage('es', local.es)
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          return new Promise((resolve, reject) => {
            update(this.ruleForm2).then(response => {
              if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
                reject('获取文件列表失败!')
              }
              if (response.data.code === 200) {
                this.$notify({
                  title: '成功',
                  message: response.data.message,
                  type: 'success'
                })
              } else {
                this.$message.error(response.data.message)
              }
            }).catch(error => {
              reject(error)
            })
          })
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
