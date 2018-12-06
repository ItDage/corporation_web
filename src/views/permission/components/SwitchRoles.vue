<!--<template>-->
<!--<div>-->
<!--<div style="margin-bottom:15px;">{{ $t('permission.roles') }}： {{ roles }}</div>-->
<!--{{ $t('permission.switchRoles') }}：-->
<!--<el-radio-group v-model="switchRoles">-->
<!--<el-radio-button label="editor"/>-->
<!--<el-radio-button label="admin"/>-->
<!--</el-radio-group>-->
<!--</div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--computed: {-->
<!--roles() {-->
<!--return this.$store.getters.roles-->
<!--},-->
<!--switchRoles: {-->
<!--get() {-->
<!--return this.roles[0]-->
<!--},-->
<!--set(val) {-->
<!--this.$store.dispatch('ChangeRoles', val).then(() => {-->
<!--this.$emit('change')-->
<!--})-->
<!--}-->
<!--}-->
<!--}-->
<!--}-->
<!--</script>-->
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
            :data="data2"
            :props="defaultProps"
            :filter-node-method="filterNode"
            class="filter-tree"
            default-expand-all/>
      </div></el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="block">
          <p>使用 scoped slot</p>
          <el-tree
            :data="data5"
            :expand-on-click-node="false"
            default-expand-all
            node-key="id"
            show-checkbox>
            <span slot-scope = "{ node, data }" class="custom-tree-node">
              <span>{{ node.label }}</span>
              <span>
                <el-button
                  size="mini"
                  type="text"
                  @click="() => append(data)">
                  Append
                </el-button>
                <el-button
                  size="mini"
                  type="text"
                  @click="() => remove(node, data)">
                  Delete
                </el-button>
              </span>
            </span>
          </el-tree>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
let id = 1000
export default {
  data() {
    const data = [{
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
    const data2 = [{
      id: 1,
      label: '一级 1',
      children: [{
        id: 4,
        label: '二级 1-1'
      }, {
        id: 5,
        label: 'test'
      }]
    }]
    return {
      filterText: '',
      data2: JSON.parse(JSON.stringify(data2)),
      data4: JSON.parse(JSON.stringify(data)),
      data5: JSON.parse(JSON.stringify(data))
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  methods: {
    append(data) {
      const newChild = { id: id++, label: 'testtest', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },

    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
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
