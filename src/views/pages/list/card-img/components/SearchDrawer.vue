<template>
    <a-drawer
      placement="right"
      :width="360"
      :title="title"
      :closable="false"
      :onClose="onClose"
      :visible="visible"
    >
        
        <a-form layout="vertical"  :wrapper-col="{span:24}">
             <a-form-item label="手机号" v-bind="validateInfos.name">
                <a-input v-model:value="modelRef.mobile" placeholder="请输入手机号" />
            </a-form-item>
        </a-form>

        <div :style="{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e8e8e8',
            padding: '10px 16px',
            textAlign: 'right',
            left: 0,
            background: '#fff',
            borderRadius: '0 0 4px 4px',
        }">
            <div class="text-align-right">
                <a-button style="margin-right: 8px" @click="onClose">
                    取消
                </a-button>
                <a-button type="primary" @click="onSearch">
                    搜索
                </a-button>
            </div>
        </div>

      
    </a-drawer>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive } from "vue";

import { Form } from 'ant-design-vue';
const useForm = Form.useForm;

import TypeSelect from './TypeSelect.vue';
import { TableListItem } from "../data.d";

export default defineComponent({
    name: 'SearchDrawer',
    props: {
        visible: {
            type: Boolean,
            required: true
        },
        title: {
            type: String,
            default: '高级搜索'
        },
        onClose: {
            type: Function,
            required: true
        },
        onSubmit: {
            type: Function as PropType<(values: Omit<TableListItem, 'id'>) => void>,
            required: true
        }
    },
    components: {
        TypeSelect
    },
    setup(props) {

        // 表单值
        const modelRef = reactive<Omit<TableListItem, 'id'>>({
            mobile: '',
        });
        // 表单验证
        const rulesRef = reactive({
            mobile: [], 
        });
        // 获取表单内容
        const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef);

        const onSearch = async () => {
             try {
                const fieldsValue = await validate<Omit<TableListItem, 'id'>>();
                props.onSubmit(fieldsValue);
            } catch (error) {
                // console.log('error', error);
            }
        }

        return {
            modelRef,
            validateInfos,
            resetFields,
            onSearch
        }


    }

})
</script>