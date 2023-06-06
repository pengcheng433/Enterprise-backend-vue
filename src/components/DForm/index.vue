<template>
  <el-form :model="formRef" :rules="rules" ref="form" :label-width="labelWidth">
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
          <el-input
            :disabled="item?.disabled || false"
            v-model="formData[item.prop]"
            :placeholder="item.placeholder"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { reactive } from 'vue'

export default {
  props : {
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
  },
  setup( props ) {
    const getColSpan = item => {
      return item.span ? Math.min( 24, item.span ) : 24
    }
    const formData = reactive( props.form )
    return {
      formData,
      getColSpan
    }
  }
}
</script>

<style scoped>
/* Add your custom styles here */
</style>
