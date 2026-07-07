import { LinkButton } from '@/components';
import { Divider } from 'antd';
import React, { Fragment, isValidElement } from 'react';
import MoreDropdown from '../MoreDropdown';

/**
 * 列表操作项，超过3个会隐藏多余的
 * @param children.children children建议放多个LinkButton
 * @param children.max 最多显示几个操作
 */

export default ({
  children,
  max = 3,
}: {
  children: React.ReactNode[] | React.ReactNode;
  max?: number;
}) => {
  children = (Array.isArray(children) ? children : [children]).filter(item => item);
  if (Array.isArray(children)) {
    return (
      <>
        {children.map((child, index) => {
          if (!(Array.isArray(children)))
            return null;
          const num = children.length > max ? max - 1 : max;
          return (
            index < num && (
              <Fragment key={index}>
                {child}
                {children.length !== index + 1 && <Divider type="vertical" />}
              </Fragment>
            )
          );
        })}
        {children.length > max && (
          <MoreDropdown
            menu={{
              items: [...children].splice(max - 1, children.length).map((child, index) => {
                let props: any;
                if (isValidElement(child)) {
                  props = child.props;
                }
                return {
                  key: index,
                  label: <LinkButton {...props} />,
                };
              }),
            }}
          />
        )}
      </>
    );
  }
  return <></>;
};
