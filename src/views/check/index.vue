<template>
  <div>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="说明" name="1">
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </el-collapse-item>
    </el-collapse>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="学校" prop="school">
        <el-input v-model="ruleForm.school"/>
      </el-form-item>
      <el-form-item label="身份证号" prop="identification">
        <el-input v-model="ruleForm.identification"/>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="ruleForm.phone"/>
      </el-form-item>
      <el-form-item label="备注" prop="description">
        <el-input v-model="ruleForm.description" type="textarea"/>
      </el-form-item>
      <el-form-item label="审查文件">
        <el-upload
          :data="dataObj"
          :before-upload="beforeUpload"
          :on-success="uploadSuccess"
          :on-remove="del"
          :multiple="true"
          action="//upload.qiniu.com"
          drag>
          <i class="el-icon-upload"/>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import uploadFile from '@/views/manage/template/uploadFile'
import { delFile, getToken, upload } from '@/api/qiniu'
import { add } from '@/api/checkup'

var validPhone = (rule, value, callback) => {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
  if (!value) {
    callback(new Error('请输入电话号码'))
  } else if (!reg.test(value)) {
    callback(new Error('请输入正确的11位手机号码'))
  } else {
    callback()
  }
};
export default {
  components: { uploadFile },
  data() {
    return {
      ruleForm: {
        school: '',
        identification: '',
        phone: '',
        description: ''
      },
      dataObj: { token: '', key: '' },
      activeNames: ['1'],
      type: '2003',
      rules: {
        school: [
          { required: true, message: '请输入申请学校名称', trigger: 'blur' }
        ],
        identification: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { min: 18, max: 18, message: '长度在 18 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, trigger: 'blur', validator: validPhone }
        ],
        description: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          return new Promise((resolve, reject) => {
            add(this.ruleForm).then(response => {
              if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
                reject('申请失败!')
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
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleChange(val) {
      console.log(val)
    },
    beforeUpload(file) {
      const _self = this
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          return new Promise((resolve, reject) => {
            getToken().then(response => {
              const key = response.data.data.qiniu_key + file.name
              const token = response.data.data.qiniu_token
              _self._data.dataObj.token = token
              _self._data.dataObj.key = key
              resolve(true)
            }).catch(err => {
              console.log(err)
              reject(false)
            })
          })
        }
      })
    },
    uploadSuccess(response, file, fileList) {
      const id = response.key
      const name = file.name
      const secondType = this.ruleForm.school
      return new Promise((resolve, reject) => {
        upload(id, name, this.type, secondType).then(response => {
          const code = response.data.code
          if (code === 200) {
            this.$notify({
              title: response.data.message,
              message: name + response.data.message,
              type: 'success'
            })
          } else {
            this.$notify.error({
              title: response.data.message,
              message: name + response.data.message
            })
          }
          resolve(true)
        }).catch(err => {
          console.log(err)
          reject(false)
        })
      })
    },
    del(file, fileList) {
      const param = {
        'id': file.response.key
      }
      return new Promise((resolve, reject) => {
        delFile(param).then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('删除文件失败!')
          }
          if (response.data.code === 200) {
            this.$notify({
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
    }
  }
}
</script>
