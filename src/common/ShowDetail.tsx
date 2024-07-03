import { ProDescriptions, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { ProColumns } from '@ant-design/pro-table';
import { Drawer } from 'antd';
import React from 'react';

interface ShowProps<T> {
  dynamicColumns?: ProColumns<T>[];
  showDetail?: boolean;
  currentRow?: any;
  close?: () => void;
  width?: number | string;
}

export const ShowDeatil: React.FC<ShowProps<any>> = ({
  dynamicColumns,
  showDetail,
  currentRow,
  close,
  width,
}) => {
  return (
    <div>
      <Drawer width={width ?? 600} open={showDetail} onClose={close} closable={false}>
        {currentRow?.id && (
          <ProDescriptions<any>
            column={2}
            title={currentRow?.id}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={dynamicColumns as ProDescriptionsItemProps<any>[]}
          />
        )}
      </Drawer>
    </div>
  );
};
