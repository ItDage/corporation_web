<template>
  <el-dialog :visible.sync="visible" :corporation.sync="corporation" :email.sync="email" :before-close="refreshTab" :title="$t('i18nView.logOutCorporation') + $t('i18nView.application')">
    <el-form :model="form">
      <el-form-item :label-width="formLabelWidth" :label="$t('i18nView.corporation')">
        <el-input :disabled="true" v-model="form.corporation" autocomplete="off"/>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" :label="$t('i18nView.email')" prop="email">
        <el-col :span="20">
          <el-input :disabled="true" v-model="form.email" :placeholder="$t('tip.email')"/>
        </el-col>
        <el-col :span="4">
          <el-button :disabled="isSend" type="primary" @click.prevent="sendValidCode('form')">{{ $t('i18nView.send') }}</el-button>
        </el-col>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" :label="$t('i18nView.logOutCorporation') + $t('i18nView.reason')">
        <el-input v-model="form.reason" :placeholder="$t('tip.reason')" type="textarea"/>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" :label="$t('i18nView.validCode')" prop="validCode">
        <el-input v-model="form.validCode" :placeholder="$t('tip.validCode')"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { sendValidCode } from '@/api/userMethod'
export default {
  name: 'LogoutCorpApplication',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    corporation: {
      type: String,
      default: null
    },
    email: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      form: {
        corporation: null,
        email: null,
        reason: null,
        validCode: null
      },
      formLabelWidth: '120px',
      isSend: false
    }
  },
  mounted() {
    this.form.corporation = this.corporation
    this.form.email = this.email
  },
  methods: {
    refreshTab() {
    // 关闭弹窗，触发父组件修改visible值
      this.$emit('update:visible', false)
    },
    sendValidCode(formName) {
      this.isSend = true
      return new Promise((resolve, reject) => {
        const param = {
          'email': this.form.email,
          'type': '2'
        }
        sendValidCode(JSON.stringify(param)).then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('发送验证码失败!')
            this.isSend = false
          }
          if (response.data.code === 200) {
            this.$message({
              message: response.data.message,
              type: 'success'
            })
          } else {
            this.$message.error(response.data.message)
          }
          this.isSend = false
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
</script>
