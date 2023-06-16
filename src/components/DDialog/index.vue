<template>
  <el-dialog v-model="dialogVisible" :title="title" :width="width" :before-close="handleClose" :destroy-on-close="destroyOnClose">
    <slot></slot>
    <!-- <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
        <el-button type="primary" @click="handleClose"> Confirm </el-button>
      </span>
    </template> -->
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, defineProps, watch } from 'vue'

const props = defineProps( {
  visible : {
    type : Boolean,
    default : false
  },
  title : {
    type : String,
    default : 'Tips'
  },
  width : {
    type : String,
    default : '30%'
  },
  destroyOnClose : {
    type : Boolean,
    default : false
  }

} )

const dialogVisible = ref( props.visible )
const emit = defineEmits( ['update:visible', 'close'] )
watch(
  () => props.visible,
  newVal => {
    dialogVisible.value = newVal
  }
)

const handleClose = () => {
  dialogVisible.value = false
  emit( 'update:visible', false )
  emit( 'close' )
}
</script>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
