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
			},
		}"
	>
		<template #header>
			<a-form :labelCol="{ span: 3, offset: 0 }" :wrapper-col="{ span: 21 }">
				<a-row :gutter="16" justify="end">
					<a-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
						<a-form-item label="名称：" v-bind="searchValidateInfos.name">
							<a-input
								placeholder="请输入"
								v-model:value="searchModelRef.name"
							/>
						</a-form-item>
					</a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
						<a-form-item label="版次：" v-bind="searchValidateInfos.desc">
							<a-input
								placeholder="请输入"
								v-model:value="searchModelRef.desc"
							/>
						</a-form-item>
					</a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
						<a-form-item label="版号：" v-bind="searchValidateInfos.num">
							<a-input
								placeholder="请输入"
								v-model:value="searchModelRef.num"
							/>
						</a-form-item>
					</a-col>
					<a-col v-if="searchOpen" :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
						<a-form-item label="手机号：" v-bind="searchValidateInfos.mobile">
							<a-input
								placeholder="请输入"
								v-model:value="searchModelRef.mobile"
							/>
						</a-form-item>
					</a-col>
					<a-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
						<div class="text-align-right" style="padding-bottom: 24px">
							<a-button type="primary" @click="searchFormSubmit">查询</a-button>
							<a-button style="margin-left: 8px" @click="searchResetFields"
								>重置</a-button
							>
							<a-button
								type="link"
								style="margin-left: 8px"
								@click="setSearchOpen"
							>
								<template v-if="searchOpen"> 收起 <UpOutlined /> </template>
								<template v-else> 展开 <DownOutlined /> </template>
							</a-button>
						</div>
					</a-col>
				</a-row>
			</a-form>
		</template>

		<template #imgsrc="{ record }">
			<img style="max-width: 100px; max-height: 100px" :src="record.imgsrc" />
		</template>
		<template #status="{ record }">
			<a-tag v-if="record.status == '1'" color="green">已登记</a-tag>
			<a-tag v-else color="cyan">未登记</a-tag>
		</template>
		<template #action="{ record }">
			<a-button
				type="link"
				@click="() => detailUpdateData(record.id)"
				:loading="detailUpdateLoading.includes(record.id)"
				>转移</a-button
			>
			<a-button
				type="link"
				@click="() => deleteTableData(record.id)"
				:loading="deleteLoading.includes(record.id)"
				>删除</a-button
			>
		</template>
	</screen-table>

</template>
<script lang="ts">
import { computed, ComputedRef, defineComponent, onMounted, reactive, Ref, ref } from "vue";
import { UpOutlined,DownOutlined } from '@ant-design/icons-vue';
import TypeSelect from './components/TypeSelect.vue';
import { Props, validateInfos } from 'ant-design-vue/lib/form/useForm';
import { useStore } from "vuex";
import { message, Modal, Form } from "ant-design-vue";
const useForm = Form.useForm;

import ScreenTable from "@/components/ScreenTable/index.vue";
import { StateType as ListStateType } from "./store";
import { PaginationConfig, TableListItem } from "./data.d";

interface ListcardImgPageSetupData {
	columns: any;
	list: ComputedRef<TableListItem[]>;
	pagination: ComputedRef<PaginationConfig>;
	loading: Ref<boolean>;
	getList: (current: number) => Promise<void>;
	detailUpdateLoading: Ref<number[]>;
	detailUpdateData: (id: number) => Promise<void>;
	deleteLoading: Ref<number[]>;
	deleteTableData: (id: number) => void;
    searchOpen: Ref<boolean>;
    setSearchOpen: () => void;
    searchModelRef: Omit<TableListItem, 'id'>;
    searchValidateInfos: validateInfos;
    searchResetFields: (newValues?: Props) => void;
    searchFormSubmit: () => Promise<void>;
}

export default defineComponent({
	name: "ListcardImgPage",
	components: {
		ScreenTable,
        UpOutlined,
        DownOutlined,
        TypeSelect
	},
	setup(): ListcardImgPageSetupData {
		const store = useStore<{ ListcardImg: ListStateType }>();

		// 列表数据
		const list = computed<TableListItem[]>(
			() => store.state.ListcardImg.tableData.list
		);

		// 列表分页
		const pagination = computed<PaginationConfig>(
			() => store.state.ListcardImg.tableData.pagination
		);

		// 列表字段
		const columns = [
			{
				title: "序号",
				dataIndex: "index",
				width: 80,
				customRender: ({ text, index }: { text: any; index: number }) =>
					(pagination.value.current - 1) * pagination.value.pageSize +
					index +
					1,
			},
			{
				title: "整图",
				dataIndex: "imgsrc",
				slots: { customRender: "imgsrc" },
			},
			{
				title: "作品名称",
				dataIndex: "name",
			},
			{
				title: "版次",
				dataIndex: "desc",
			},
			{
				title: "版号",
				dataIndex: "num",
			},
			{
				title: "状态",
				dataIndex: "status",
				slots: { customRender: "status" },
			},
			{
				title: "操作",
				key: "action",
				width: 200,
				slots: { customRender: "action" },
			},
		];

		// 获取数据
		const loading = ref<boolean>(true);
		const getList = async (current: number): Promise<void> => {
			loading.value = true;
			await store.dispatch("ListcardImg/queryTableData", {
				per: pagination.value.pageSize,
				page: current,
			});
			loading.value = false;
		};

		
		const detailUpdateLoading = ref<number[]>([]);
		const detailUpdateData = async (id: number) => {
			detailUpdateLoading.value = [id];
			const res: boolean = await store.dispatch(
				"ListcardImg/queryUpdateData",
				id
			);
			if (res === true) {
				//setUpdateFormVisible(true);
			}
			detailUpdateLoading.value = [];
		};

		// 删除 loading
		const deleteLoading = ref<number[]>([]);
		// 删除
		const deleteTableData = (id: number) => {
			Modal.confirm({
				title: "删除",
				content: "确定删除吗？",
				okText: "确认",
				cancelText: "取消",
				onOk: async () => {
					deleteLoading.value = [id];
					const res: boolean = await store.dispatch(
						"ListcardImg/deleteTableData",
						id
					);
					if (res === true) {
						message.success("删除成功！");
						getList(pagination.value.current);
					}
					deleteLoading.value = [];
				},
			});
		};

        // 搜索
        const searchOpen = ref<boolean>(false);
        const setSearchOpen = (): void => {
            searchOpen.value = !searchOpen.value;
        }
        // 表单值
        const searchModelRef = reactive<Omit<TableListItem, 'id'>>({
            name:'',
            desc:'',
            num:'',
            status: '',
            mobile:''
        });
        // 表单验证
        const searchRulesRef = reactive({
            imgsrc: [],
            name: [],
            desc: [], 
            num: [],
            mobile: [],
            status: []         
        });
        // 获取表单内容
        const { resetFields, validate, validateInfos } = useForm(searchModelRef, searchRulesRef);
        // 搜索
        const searchFormSubmit = async () => {
            try {
                const fieldsValue = await validate<Omit<TableListItem, 'id'>>();
                console.log('search', fieldsValue);
                message.warning('进行了搜索!');
            } catch (error: any) {
                message.warning(error);
            }
        }

		onMounted(() => {
			getList(1);
		});

		return {
			columns,
			list,
			pagination,
			loading,
			getList,
			detailUpdateLoading,
			detailUpdateData,
			deleteLoading,
			deleteTableData,
            searchOpen,
            setSearchOpen,
            searchModelRef,
            searchValidateInfos: validateInfos,
            searchResetFields: resetFields,
            searchFormSubmit
		};
	},
});
</script>
