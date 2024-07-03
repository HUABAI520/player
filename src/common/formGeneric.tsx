import { useNavigate } from '@/.umi-production/exports';

import StepForm from '@/common/StepForm';

import { BookName, ChAEn } from '@/common/CommodityType';
import { ShowDeatil } from '@/common/ShowDetail';
import { PlusOutlined } from '@ant-design/icons';
import { ActionType, ProFormSelect, ProTable } from '@ant-design/pro-components';
import { LightFilter } from '@ant-design/pro-form/lib';
import { FooterToolbar } from '@ant-design/pro-layout';
import { ProColumns } from '@ant-design/pro-table';
import { Button, message, notification } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

interface TestProps<T, R> {
  dynamicColumns: ProColumns<T>[];
  //搜索函数
  search: (params: any) => Promise<R>;
  //增删查改的四个函数
  deleteById?: (params: any) => Promise<boolean>;
  updateById?: (params: any) => Promise<boolean>;
  addCommodity?: (param: any) => Promise<boolean>;
  updateBarCode?: (param: any) => Promise<boolean>;
  // dynamicComponent: React.ReactElement;
  dynamicComponent?: React.ReactElement<{
    onResultChange: (result: any) => void;
    onAllChange: (all: any) => void;
  }>; // 更新 dynamicComponent 类型声明
  easyComponent?: React.ReactElement;
  //标题，类型定义为ChAEn
  testTitle: ChAEn;
  reLoad?: boolean;
}

const FormGeneric: React.FC<TestProps<any, any>> = ({
  dynamicColumns,
  search,
  deleteById,
  updateById,
  testTitle,
  addCommodity,
  dynamicComponent,
  easyComponent,
  updateBarCode,
  reLoad,
}) => {
  // 新增
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRowsState, setSelectedRows] = useState<any[]>([]);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [showUpload, setShowUpload] = useState<boolean>(false);
  const [deleteDate, setDeleteDate] = useState<boolean>(false);
  const [defined, setDefined] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<any>();
  const [selectValue, setSelectValue] = useState<string>('all');
  // 采购订单状态选择
  const [selectStatus, setSelectStatus] = useState<number>();
  const [showAnalysis, setShowAnalysis] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // 根据父组件的reLoad属性，重新加载数据
  useEffect(() => {
    if (reLoad === true) {
      actionRef.current?.reload?.(); // 重新加载数据
    }
  }, [reLoad]);
  /**
   * 监听选择的过滤的改变
   */
  useEffect(() => {
    actionRef.current?.reloadAndRest?.(); // 重新加载数据
  }, [selectValue, selectStatus]);

  const navigate = useNavigate();
  const handleAddRow = () => {
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };
  type NotificationType = 'success' | 'info' | 'warning' | 'error';
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (
    type: NotificationType,
    message: string,
    description: string,
  ) => {
    api[type]({
      message: message,
      description: description,
    });
  };

  //  表单实例
  const saveChangesToBackend = async (modifiedData: any) => {
    //@ts-ignore
    const res = await updateById(modifiedData.value);
    // const res = await updateUserUsingPOST(modifiedData.value);
    if (res) {
      message.success('更新成功！');
    } else {
      message.error('更新失败！');
    }
  };

  // 双击行的回调函数 // 暂定只有采购订单使用
  const handleDoubleClick = (record: any) => {
    setShowDetail(true);
    // 因为后端的失误带着套餐的id为packageId 处理一下
    setCurrentRow(record);
  };

  const reload = () => {
    actionRef.current?.reload?.(); // 重新加载数据
    // actionRef.current?.reset?.(); // 重置表单
  };

  return (
    <div>
      {contextHolder}
      <ProTable<any>
        columns={dynamicColumns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
          console.log('----------' + params, filter);
          // todo 可以编写 遍历一个 sort: Record<string, SortOrder> 类型的对象。后端支持多个排序对象
          const sortOrder = sort['createTime']?.toString() || sort['operationTime']?.toString();
          const sortField = sortOrder ? 'createTime' || 'operationTime' : undefined;
          if (selectStatus !== undefined) {
            // 为入库订单的状态 筛选服务 todo 后续应该放在父组件中
            params.isReturn = selectStatus;
          }
          let searchRequest: any = {
            ...params,
            sortOrder: sortOrder,
            sortField: sortField,
          };
          const res = await search(searchRequest);
          return {
            data: res.records,
            total: res.total,
            page: params.current,
            success: true,
          };
        }}
        editable={{
          type: 'multiple',
          onSave: async (key, row, isNew) => {
            // 在这里处理保存操作
            const modifiedData = {
              value: row,
              isNew: isNew,
            };
            await saveChangesToBackend(modifiedData);
          },
          // onDelete: async (key, row) => {
          //   // 在这里处理删除操作
          //   const res = await handleDelete(row.id);
          //   if (res) {
          //     openNotificationWithIcon('success');
          //   } else {
          //     openNotificationWithIcon('error');
          //   }
          // },
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          onChange(value) {
            console.log('value: ', value);
          },
        }}
        // rowKey="id"
        rowKey={'id'}
        onRow={(record) => ({
          onDoubleClick: () => {
            handleDoubleClick(record);
          },
        })}
        search={{
          labelWidth: 'auto',
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          defaultPageSize: 10,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle={testTitle.Chinese + '管理'}
        scroll={{ x: 'max-content', y: 600 }} // 设置横向与纵向滚动条
        toolbar={{
          filter:
            testTitle.English === BookName.BookBorrow?.English ? (
              <LightFilter
                onValuesChange={(value) => {
                  console.log(value);
                  setSelectStatus(value.status);
                }}
              >
                <ProFormSelect
                  name="status"
                  label="归还状态"
                  options={[
                    {
                      label: '未归还',
                      value: 0,
                    },
                    {
                      label: '已归还',
                      value: 1,
                    },
                  ]}
                />
              </LightFilter>
            ) : null,
        }}
        toolBarRender={() => {
          // 只有当addCommodity、dynamicComponent和easyComponent都有值时，显示Button todo 后续优化，有些可能没有easyComponent
          if (addCommodity && dynamicComponent && easyComponent) {
            //判断是否有导入按钮
            return [
              <Button
                key="button"
                icon={<PlusOutlined />}
                onClick={() => {
                  handleAddRow();
                }}
                type="primary"
              >
                新建{testTitle.Chinese}
              </Button>,
            ];
          }
          // 如果条件不满足，返回一个空数组，使Button不显示
          return [];
        }}
        // rowSelection 只在 deleteById 存在时显示
        rowSelection={
          deleteById
            ? {
                onChange: (_, selectedRows) => {
                  setSelectedRows(selectedRows);
                },
              }
            : undefined
        }
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
            </div>
          }
        ></FooterToolbar>
      )}
      {/* 只有当addCommodity、dynamicComponent和easyComponent都有值时，显示StepForm添加按钮
      todo 这个子组件再判断easyComponent不存在则隐藏直接添加（只为商品直接添加服务） dynamicComponent和addCommodity必须同时存在（为所有的添加服务）*/}
      {addCommodity && dynamicComponent && easyComponent && (
        <StepForm
          open={modalVisible}
          onCancel={handleModalCancel}
          onReload={reload}
          stepTitle={testTitle}
          addCommodity={addCommodity}
          dynamicComponent={dynamicComponent}
          easyComponent={easyComponent}
        />
      )}
      <ShowDeatil
        dynamicColumns={dynamicColumns}
        showDetail={showDetail}
        currentRow={currentRow}
        close={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
      />
    </div>
  );
};
export default FormGeneric;
