<template>
    <a-select v-model:value="modelValue" allowClear>
      <a-select-option value="" disabled>请选择</a-select-option>
      <a-select-option value="1">已登记</a-select-option>
      <a-select-option value="0">未登记</a-select-option>
    </a-select>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";

interface TypeSelectSetupData {
    modelValue: string;
}

export default defineComponent({
    name: 'TypeSelect',
    props: {
        value: {
            type: String,
            default: ''
        },
    },
    setup(props, { emit }): TypeSelectSetupData {

        // 数据值
        const modelValue = computed<string>({
            get: () => props.value,
            set: val => {                
                emit('update:value', val || '');
            }
        });

        return {
            modelValue: modelValue as unknown as string
        }



    }
})
</script>