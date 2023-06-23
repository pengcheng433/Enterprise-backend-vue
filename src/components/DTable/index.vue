<template>
  <div class="data_table">
    <el-table
      v-loading="loading"
      element-loading-background="rgba(122, 122, 122, 0.8)"
      ref="tableRef"
      v-bind="$attrs"
      :row-key="rowKey"
      :data="tableData"
      border
      :row-class-name="rowClassName"
      @row-click="rowClickFun"
      @selection-change="handleSelectionChange"
      @select="handleSelect"
    >
      <el-table-column
        v-for="colItem of filteredTableTitle"
        v-bind="colItem"
        :key="colItem.prop"
        :prop="colItem.prop"
        :label-class-name="colItem.labelClassName"
        :fixed="colItem.fixed"
        :label="colItem.label"
        :formatter="(...res) => handleFormatter(colItem, ...res)(...res)"
        :type="colItem.type"
      />
    </el-table>

    <br />

    <div v-if="simplePagination && searchParams.total" class="pagination small-pagination">
      <el-pagination
        background
        small
        :current-page="searchParams.currentPage"
        layout="prev, pager, next"
        :total="searchParams.total"
        :page-size="searchParams.pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <div v-else-if="searchParams.total" class="pagination">
      <el-pagination
        background
        small
        :current-page="searchParams.currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="searchParams.pageSize"
        layout="total, sizes, prev, pager, next"
        :total="searchParams.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="jsx">
import { ref, defineProps, computed } from 'vue'
const tableRef = ref( null )
const multipleSelection = ref( [] )

const handleSelectionChange = val => {
  multipleSelection.value = val
}
defineExpose( { multipleSelection, tableRef } )
const rowClickFun = row => {
  // 处理行点击事件
}

const rowClassName = ( { id } ) => {
  return multipleSelection.value.some( item => item[props.rowKey] === id ) ? 'disabled-row' : ''
}

const handleSizeChange = val => {
  // search( val, 'size' )
}

const hintValue = value => {
  return value === '' || value === undefined || value === null ? '-' : value
}

const props = defineProps( {
  tableTitle : {
    type : Array,
    required : true,
    default : () => []
  },
  tableData : {
    type : Array,
    required : true,
    default : () => []
  },
  initHeight : {
    type : Boolean,
    default : false
  },
  simplePagination : {
    type : Boolean,
    default : false
  },
  loading : {
    type : Boolean,
    default : false
  },
  searchParams : {
    type : Object,
    default : () => {
      return {
        total : 0
      }
    }
  },
  rowKey : {
    type : String,
    default : ''
  },
  selection : {
    type : Array,
    default : () => []
  }
} )

const filteredTableTitle = computed( () => {
  // 进行筛选处理，并返回过滤后的数组
  return props.tableTitle.filter( colItem => colItem && !colItem.hidden )
} )

const handleFormatter = ( colItem, row, column, cellValue, index ) => {
  // 根据colItem的配置进行格式化处理
  if ( typeof colItem.render === 'object' ) {
    // 处理render为对象的情况
    const ops = { ...colItem.render }
    const prop = ops.prop || colItem.prop
    const compis = ops.is
    delete ops.is
    const { o, k } = initProp( prop, row )
    return () => {
      return (
        <CommComp
          class='form-item-comp'
          {...{ on : ops.on || {}, attrs : ops }}
          v-model={o[k]}
          compis={compis}
        ></CommComp>
      )
    }
  } else if ( typeof colItem.render === 'function' ) {
    if ( colItem.renderOps ) {
      // 处理render为函数且返回配置对象的情况
      const ops = colItem.render( row, column, cellValue, index )
      const prop = ops.prop || colItem.prop
      const compis = ops.is
      delete ops.is
      const { o, k } = initProp( prop, row )
      return () => {
        return (
          <CommComp
            class='form-item-comp'
            {...{ on : ops.on || {}, attrs : ops }}
            v-model={o[k]}
            compis={compis}
          ></CommComp>
        )
      }
    } else {
      // 处理普通函数的情况
      return colItem.render
    }
  } else {
    // 处理其他情况，直接返回值
    const { o, k } = initProp( colItem.prop, row )
    return rows => hintValue( o[k] )
  }
}

function initProp( propPath, sourceObj, baseProp ) {
  if ( !propPath || ( propPath.indexOf( '.' ) <= 0 && !baseProp ) ) return { prop : propPath, o : sourceObj, k : propPath }
  if ( baseProp ) propPath = baseProp + '.' + propPath
  const propArr = propPath.split( '.' )
  let tempObj = sourceObj
  let tempKey = ''

  propArr.forEach( ( k, i ) => {
    tempKey = k
    if ( i !== propArr.length - 1 ) {
      if ( !tempObj[k] ) {
        // Vue.set( tempObj, k, {} )
      }
      tempObj = tempObj[k]
    }
  } )

  return {
    prop : propPath,
    o : tempObj,
    k : tempKey
  }
}

// 缺少search函数的实现，请根据您的需求自行实现
</script>

<style>
.data_table {
  width: 100%;
}
.table-op span {
  font-size: 12px;
  margin-right: 6px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
</style>
