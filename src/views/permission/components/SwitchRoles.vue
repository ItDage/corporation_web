<template>
  <div class="custom-tree-container">
    <el-row :gutter="10">
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="block">
          <el-input
            v-model="filterText"
            placeholder="输入关键字进行过滤"/>
          <el-tree
            ref="tree2"
            :data="data"
            :props="defaultProps"
            :filter-node-method="filterNode"
            node-key="id"
            class="filter-tree"
            default-expand-all
            @node-click="getCheckedKeys"
          />
      </div></el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="block">
          <el-input
            v-model="filterText2"
            placeholder="输入关键字进行过滤"/>
          <el-tree
            ref="roleTree"
            :data="data2"
            :props="defaultProps"
            :filter-node-method="filterNode2"
            node-key="id"
            show-checkbox
            class="filter-tree"
            default-expand-all
          />
      </div></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    const data2 = [{
      id: 1,
      label: '一级 1',
      children: [{
        id: 4,
        label: '二级 1-1',
        children: [{
          id: 9,
          label: '三级 1-1-1'
        }, {
          id: 10,
          label: '三级 1-1-2'
        }]
      }]
    }, {
      id: 2,
      label: '一级 2',
      children: [{
        id: 5,
        label: '二级 2-1'
      }, {
        id: 6,
        label: '二级 2-2'
      }]
    }, {
      id: 3,
      label: '一级 3',
      children: [{
        id: 7,
        label: '二级 3-1'
      }, {
        id: 8,
        label: '二级 3-2'
      }]
    }]
    const data = [{ }]
    return {
      filterText: '',
      filterText2: '',
      data: JSON.parse(JSON.stringify(data)),
      data2: JSON.parse(JSON.stringify(data2)),
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    },
    filterText2(val) {
      this.$refs.roleTree.filter(val)
    }
  },
  mounted() {
    // 加载数据
    this.loadData()
    // 加载角色数据
    this.loadRoleData()
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    filterNode2(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    getCheckedKeys(data) {
      console.log(data.id)
      this.setCheckedNodes()
    },
    setCheckedNodes() {
      this.$refs.roleTree.setCheckedNodes(
        [{
          id: 9,
          label: '三级 1-1-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      )
    },
    loadData() {
      this.$store.dispatch('getUsers').then(res => { // 拉取user
        const data = res.data.data // 获取用户数据
        this.data = data
      }).catch((err) => {
        console.log(err)
      })
    },
    loadRoleData() {
      this.$store.dispatch('getAllRole').then(res => { // 拉取user
        const data = res.data.data // 获取用户数据
        console.log('roles' + data)
        this.data2 = data
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
