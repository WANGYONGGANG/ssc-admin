<template>
            <screen-table
                class="layout-main-conent"
                row-key="id"
                :columns="columns"
                :data-source="list"
                :loading="loading"
                :pagination="{
                    ...pagination,
                    onChange: (page) => {
                        getList(page);
                    }
                }"
            >
                <template #header>
                    <a-row>
                        <a-col :span="8">
                            <!-- <a-button type="primary" @click="() => setCreateFormVisible(true)">新增</a-button> -->
                        </a-col>
                        <a-col :span="16" class="text-align-right">
                            <a-input-search placeholder="请输入名称" style="width:270px"/>
                            <a-button style="margin-left: 8px" @click="() => searchDrawerVisible = true">高级搜索</a-button>
                        </a-col>
                    </a-row>

                </template>


                <template #imgsrc="{ record  }">
                    <img style="max-width: 100%;max-height: 100%;" :src="record.imgsrc"/>
                </template>
                <template #status="{ record }">
                    <a-tag v-if="record.status == '1'" color="green">已登记</a-tag>
                    <a-tag v-else color="cyan">未登记</a-tag>
                </template>
                <template #action="{ record }">
                    <a-button type="link" @click="() => detailUpdateData(record.id)" :loading="detailUpdateLoading.includes(record.id)">转移</a-button>
                    <a-button type="link" @click="() => deleteTableData(record.id)" :loading="deleteLoading.includes(record.id)">删除</a-button>
                </template>

            </screen-table>

            <create-form 
                :visible="createFormVisible" 
                :onCancel="() => setCreateFormVisible(false)" 
                :onSubmitLoading="createSubmitLoading" 
                :onSubmit="createSubmit"
            />

            <update-form
                v-if="updateFormVisible===true"
                :visible="updateFormVisible"
                :values="updateData"
                :onCancel="() => updataFormCancel()"
                :onSubmitLoading="updateSubmitLoading"
                :onSubmit="updateSubmit"
            />

            <search-drawer
                :visible="searchDrawerVisible" 
                :onClose="() => searchDrawerClose()"
                :onSubmit="searchDrawerSubmit"
            />


        
</template>
<script lang="ts">
import { computed, ComputedRef, defineComponent, onMounted, Ref, ref } from "vue";
import { useStore } from "vuex";
import { message, Modal } from "ant-design-vue";
import { Props } from 'ant-design-vue/lib/form/useForm';
import ScreenTable from '@/components/ScreenTable/index.vue';
import CreateForm from './components/CreateForm.vue';
import UpdateForm from './components/UpdateForm.vue';
import SearchDrawer from './components/SearchDrawer.vue';
import { StateType as ListStateType } from "./store";
import { PaginationConfig, TableListItem } from './data.d';

interface ListcardImgPageSetupData {
    columns: any;
    list: ComputedRef<TableListItem[]>;
    pagination: ComputedRef<PaginationConfig>;
    loading: Ref<boolean>;
    getList:  (current: number) => Promise<void>;
    createFormVisible: Ref<boolean>;
    setCreateFormVisible:  (val: boolean) => void;
    createSubmitLoading: Ref<boolean>;
    createSubmit: (values: Omit<TableListItem, 'id'>, resetFields: (newValues?: Props | undefined) => void) => Promise<void>;
    detailUpdateLoading: Ref<number[]>;
    detailUpdateData: (id: number) => Promise<void>;
    updateData: ComputedRef<Partial<TableListItem>>;
    updateFormVisible: Ref<boolean>;
    updataFormCancel:  () => void;
    updateSubmitLoading: Ref<boolean>;
    updateSubmit:  (values: TableListItem, resetFields: (newValues?: Props | undefined) => void) => Promise<void>;
    deleteLoading: Ref<number[]>;
    deleteTableData:  (id: number) => void;
    searchDrawerVisible: Ref<boolean>;
    searchDrawerClose: () => void;
    searchDrawerSubmit: (values: Omit<TableListItem, 'id'>) => Promise<void>;
}

export default defineComponent({
    name: 'ListcardImgPage',
    components: {
        ScreenTable,
        CreateForm,
        UpdateForm,
        SearchDrawer
    },
    setup(): ListcardImgPageSetupData {

        const store = useStore<{ ListcardImg: ListStateType}>();


        // 列表数据
        const list = computed<TableListItem[]>(() => store.state.ListcardImg.tableData.list);

        // 列表分页
        const pagination = computed<PaginationConfig>(() => store.state.ListcardImg.tableData.pagination);

        // 列表字段
        const columns =[
            {
                title: '序号',
                dataIndex: 'index',
                width: 80,
                customRender: ({text, index}: { text: any; index: number}) => (pagination.value.current - 1) * pagination.value.pageSize + index + 1,
            },
            {
                title: '整图',
                dataIndex: 'imgsrc',
                slots: { customRender: 'imgsrc' },
            },
            {
                title: '作品名称',
                dataIndex: 'name',
            },
         {
                title: '版次',
                dataIndex: 'desc',
            },
            {
                title: '版号',
                dataIndex: 'num',
            },
            {
                title: '状态',
                dataIndex: 'status',
                slots: { customRender: 'status' },
            },
            {
                title: '操作',
                key: 'action',
                width: 200,
                slots: { customRender: 'action' },
            },
        ];

        // 获取数据
        const loading = ref<boolean>(true);
        const getList = async (current: number): Promise<void> => {
            loading.value = true;
            await store.dispatch('ListcardImg/queryTableData', {
                per: pagination.value.pageSize,
                page: current,
            });
            loading.value = false;
        }


        // 新增弹框 - visible
        const createFormVisible = ref<boolean>(false);
        const setCreateFormVisible = (val: boolean) => {
            createFormVisible.value = val;
        };
        // 新增弹框 - 提交 loading
        const createSubmitLoading = ref<boolean>(false);
        // 新增弹框 - 提交
        const createSubmit = async (values: Omit<TableListItem, 'id'>, resetFields: (newValues?: Props | undefined) => void) => {
            createSubmitLoading.value = true;
            const res: boolean = await store.dispatch('ListcardImg/createTableData',values);
            if(res === true) {
                resetFields();
                setCreateFormVisible(false);
                message.success('新增成功！');
                getList(1);
            }
            createSubmitLoading.value = false;
        }


        // 编辑弹框 - visible
        const updateFormVisible = ref<boolean>(false);
        const setUpdateFormVisible = (val: boolean) => {
            updateFormVisible.value = val;
        }
        const updataFormCancel = () => {
            setUpdateFormVisible(false);
            store.commit('ListcardImg/setUpdateData',{});
        }
        // 编辑弹框 - 提交 loading
        const updateSubmitLoading = ref<boolean>(false);
        // 编辑弹框 - 提交
        const updateSubmit = async (values: TableListItem, resetFields: (newValues?: Props | undefined) => void) => {
            updateSubmitLoading.value = true;
            const res: boolean = await store.dispatch('ListcardImg/updateTableData',values);
            if(res === true) {
                updataFormCancel();                
                message.success('编辑成功！');
                getList(pagination.value.current);
            }
            updateSubmitLoading.value = false;
        }

        // 编辑弹框 data
        const updateData = computed<Partial<TableListItem>>(() => store.state.ListcardImg.updateData);
        const detailUpdateLoading = ref<number[]>([]);
        const detailUpdateData = async (id: number) => {
            detailUpdateLoading.value = [id];
            const res: boolean = await store.dispatch('ListcardImg/queryUpdateData',id);
            if(res===true) {
                setUpdateFormVisible(true);
            }
            detailUpdateLoading.value = [];
        }

        // 删除 loading
        const deleteLoading = ref<number[]>([]);
        // 删除
        const deleteTableData = (id: number) => {

            Modal.confirm({
                title: '删除',
                content: '确定删除吗？',
                okText: '确认',
                cancelText: '取消',
                onOk: async () => {
                    deleteLoading.value = [id];
                    const res: boolean = await store.dispatch('ListcardImg/deleteTableData',id);
                    if (res === true) {
                        message.success('删除成功！');
                        getList(pagination.value.current);
                    }
                   deleteLoading.value = [];
                }
            });

        }

        // 搜索
        const searchDrawerVisible = ref<boolean>(false);
        const searchDrawerClose = () => {
            searchDrawerVisible.value = false;
        }
        const searchDrawerSubmit = async (values: Omit<TableListItem, 'id'>) => {
            console.log('search', values);
            message.success('进行了搜索！');
            searchDrawerClose();
        }



        onMounted(()=> {
           getList(1);
        })

        return {
            columns,
            list,
            pagination,
            loading,
            getList,
            createFormVisible,
            setCreateFormVisible,
            createSubmitLoading,
            createSubmit,
            detailUpdateLoading,
            detailUpdateData,
            updateData,
            updateFormVisible,
            updataFormCancel,
            updateSubmitLoading,
            updateSubmit,
            deleteLoading,
            deleteTableData,
            searchDrawerVisible,
            searchDrawerClose,
            searchDrawerSubmit
        }

    }
    
})
</script>