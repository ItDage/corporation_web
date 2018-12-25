<template>
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
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      orderForm: {},
      addRules: {
        fromContact: [{ required: true, message: "请输入联系人姓名", trigger: 'blur'}],
        fromPhone: [{required: true, message: "请输入", trigger: 'blur'}]
      }
    }
  },
  methods: {
    initForm() {
      this.orderForm = {
        fromContact: '',
        fromPhone: ''
      }
      if (this.$refs.orderForm) {
        this.$refs.orderForm.resetFields()
      }
    },
    cancelModal() {
      // 关闭弹窗，触发父组件修改visible值
      this.$emit('update:visible', false);
    }
  }
}
</script>
