<template>
    <a-modal
      :destroy-on-close="true"
      :mask-closable="false"
      title="新增"
      :visible="visible"
      :onCancel="onCancel"
    >
        <template #footer>
            <a-button key="back" @click="() => onCancel()">取消</a-button>
            <a-button key="submit" type="primary" :loading="onSubmitLoading" @click="onFinish">提交</a-button>
        </template>
        
        <a-form :labelCol="{ span: 4 }" :wrapper-col="{span:20}">
             <a-form-item label="手机号" v-bind="validateInfos.name">
                <a-input v-model:value="modelRef.mobile" placeholder="请输入手机号" />
            </a-form-item>
        </a-form>


    </a-modal>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive } from "vue";
import { useI18n } from "vue-i18n";

import { Props, validateInfos } from 'ant-design-vue/lib/form/useForm';
import { message, Form } from 'ant-design-vue';
const useForm = Form.useForm;

import TypeSelect from './TypeSelect.vue';
import { TableListItem } from "../data.d";

interface CreateFormSetupData {
    modelRef: Omit<TableListItem, 'id'>;
    validateInfos: validateInfos;
    onFinish: () => Promise<void>;
}

export default defineComponent({
    name: 'CreateForm',
    props: {
        visible: {
            type: Boolean,
            required: true
        },
        onCancel: {
            type: Function,
            required: true
        },
        onSubmitLoading: {
            type: Boolean,
            required: true
        },
        onSubmit: {
            type: Function as PropType<(values: Omit<TableListItem, 'id'>, resetFields: (newValues?: Props | undefined) => void) => void>,
            required: true
        }
    },
    components: {
        TypeSelect
    },
    setup(props): CreateFormSetupData {

        const { t } = useI18n();

        // 表单值
        const modelRef = reactive<Omit<TableListItem, 'id'>>({
            mobile: '',
        });
        // 表单验证
        const rulesRef = reactive({
            mobile: [
                {
                    required: true,
                    validator: async (rule: any, value: string) => {
                        if (value === '' || !value) {
                            throw new Error('请输入手机号');
                        } else if (value.length > 11) {
                            throw new Error('长度不能大于11个字符');
                        }
                    }
                },
            ],     
        });
        // 获取表单内容
        const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef);
        // 提交
        const onFinish = async () => {           
            try {
                const fieldsValue = await validate<Omit<TableListItem, 'id'>>();
                props.onSubmit(fieldsValue, resetFields);
            } catch (error) {
                // console.log('error', error);
                message.warning(t('app.global.form.validatefields.catch'));
            }
        };
        
        return {
            modelRef,
            validateInfos,
            onFinish
        }

    }
})
</script>