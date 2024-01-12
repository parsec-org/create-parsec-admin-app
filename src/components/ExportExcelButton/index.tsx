import React, { useCallback } from 'react';
import type { ButtonProps } from 'antd';
import { Button } from 'antd';
import { saveAs } from 'file-saver';
import dayjs from 'dayjs';
import { useRequest } from 'ahooks';
import type { ProColumns } from '@ant-design/pro-components';

export declare type ExcelColumns<D = any, ValueType = 'text'> = ProColumns<
  D,
  ValueType
> & { cellWidth?: number };

export interface ExportExcelButtonProps<D, P> extends ButtonProps {
  /**
   * 导出文件的名称
   */
  fileName?: string;

  /**
   * tabList的列
   */
  columns: ExcelColumns<D>[];
  /**
   * 过滤数据
   */
  listFilter?: (data: D) => boolean;
  /**
   * 是否倒序
   */
  reverseOrder?: boolean;
  dataApi: (params: P) => Promise<D>;
  params?: P;
}

export default <D extends unknown, P extends unknown>(
  props: ExportExcelButtonProps<D, P>,
) => {
  const { fileName, children, columns, dataApi, params, ...otherProps } = props;

  const { loading, runAsync } = useRequest<D, P[]>(dataApi, {
    refreshDeps: ['params'],
    manual: true,
  });

  const handleExportData = useCallback(async () => {
    // @ts-ignore
    const { list } = await runAsync(params);
    // @ts-ignore
    const { default: ExportJsonExcel } = await import('js-export-excel');
    const sheetFilter = columns.map(({ dataIndex }) => dataIndex);
    const file = new ExportJsonExcel({
      saveAsBlob: true,
      fileName:
        fileName ||
        `${dayjs().format('YYYY-MM-DD HH时mm分ss秒')} 总共${
          list.length || 0
        }条`,
      datas: [
        {
          // eslint-disable-next-line array-callback-return
          sheetData: (list || []).map((cell: D) => {
            columns?.forEach(
              ({ dataIndex, render }: ExcelColumns<D>, index) => {
                // @ts-ignore
                return (cell[dataIndex] = render
                  ? render(cell[dataIndex], cell, index, undefined, {
                      type: undefined,
                    })
                  : cell[dataIndex]);
              },
            );
            return cell;
          }),
          // sheetName: "sheet",
          sheetFilter,
          sheetHeader: columns.map(({ title }) => title), // 表头
          columnWidths: columns.map(({ cellWidth }) => cellWidth || 10),
        },
      ],
    }).saveExcel();

    //生成文件
    saveAs(file);
  }, [params]);

  return (
    <Button loading={loading} {...otherProps} onClick={handleExportData}>
      {children}
    </Button>
  );
};
