<template>
  <el-form :model="formData" :rules="rules" ref="form" :label-width="labelWidth">
    <el-row :gutter="rowGutter">
      <el-col
        v-for="item in formItems"
        :span="getColSpan(item)"
        :xs="getColSpan(item)"
        :sm="getColSpan(item)"
        :md="getColSpan(item)"
        :lg="getColSpan(item)"
        :key="item.prop"
      >
        <el-form-item :prop="item.prop" :label="item.label" :rules="item.rules" :required="item.required">
          <template v-if="item.is === 'radio'">
            <el-radio-group v-model="formData[item.prop]" :size="item.option?.size || 'default'">
              <el-radio
                v-for="option in item.option?.list"
                :key="option.value"
                :label="option.value"
                :disabled="option?.disabled || false"
                :border="item.option?.border || false"
              >
                {{ option.label }}
              </el-radio>
            </el-radio-group>
          </template>
          <template v-else-if="item.is === 'tree'">
            <el-tree
              :data="item.option.data"
              :props="item.option.props || { children: 'children', label: 'label' }"
              :show-checkbox="item.option.showCheckbox || true"
              :node-key="item.option.nodeKey || 'id'"
              :default-checked-keys="formData[item.prop]"
              @check="(obj1, obj2) => updateFormData(obj1, obj2, item.prop)"
            ></el-tree>
          </template>

          <template v-else>
            <el-input
              :disabled="item?.disabled || false"
              v-model="formData[item.prop]"
              :placeholder="item.placeholder"
              :type="item.type || 'inpuit'"
              v-bind:show-password="item.showPassword || false"
            ></el-input>
          </template>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup>
import { reactive, ref } from 'vue'

const getColSpan = item => {
  return item.span ? Math.min( 24, item.span ) : 24
}
const form = ref( null )
defineExpose( { form } )
const props = defineProps( {
  formItems : {
    type : Array,
    required : true
  },
  form : {
    type : Object,
    required : true
  },
  rules : {
    type : Object,
    default : () => ( {} )
  },
  labelWidth : {
    type : String,
    default : '100px'
  },
  rowGutter : {
    type : Number,
    default : 20
  }
} )

const formData = reactive( props.form )
const updateFormData = ( obj1, obj2, prop ) => {
  formData[prop] = obj2.checkedKeys
}
</script>

<style scoped>
/* Add your custom styles here */
</style>
