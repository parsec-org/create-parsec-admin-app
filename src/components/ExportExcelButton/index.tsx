import type { ProColumns } from '@ant-design/pro-components';
import { useRequest } from 'ahooks';
import type { ButtonProps } from 'antd';
import { Button } from 'antd';
import dayjs from 'dayjs';
import { saveAs } from 'file-saver';
import { useCallback } from 'react';

export declare type ExcelColumns<D = any, ValueType = 'text'> = ProColumns<D, ValueType> & {
  cellWidth?: number;
};

export interface ExportExcelButtonProps<D = any, P = any> extends ButtonProps {
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

export default <D extends Record<string, any>, P extends unknown>(props: ExportExcelButtonProps<D, P>) => {
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
        fileName || `${dayjs().format('YYYY-MM-DD HH时mm分ss秒')} 总共${list.length || 0}条`,
      datas: [
        {

          sheetData: (list || []).map((cell: D) => {
            // 泛型参数 D 的索引仅允许读取，落成普通对象视图后才能回写渲染结果
            const row = cell as Record<string, any>;
            columns?.forEach(({ dataIndex, render }: ExcelColumns<D>, index) => {
              // dataIndex 允许 string | number | 数组，导出时统一按字符串键处理
              const key = String(dataIndex);
              row[key] = render
                ? render(row[key], cell, index, undefined, {
                    type: undefined,
                  })
                : row[key];
            });
            return cell;
          }),
          // sheetName: "sheet",
          sheetFilter,
          sheetHeader: columns.map(({ title }) => title), // 表头
          columnWidths: columns.map(({ cellWidth }) => cellWidth || 10),
        },
      ],
    }).saveExcel();

    // 生成文件
    saveAs(file);
  }, [columns, fileName, params, runAsync]);

  return (
    <Button loading={loading} {...otherProps} onClick={handleExportData}>
      {children}
    </Button>
  );
};
