import React, { Fragment, isValidElement } from 'react';
import { Divider, Menu } from 'antd';
import MoreDropdown from '../MoreDropdown';
import { LinkButton } from '@/components';

/**
 * 列表操作项，超过3个会隐藏多余的
 * @param children
 * @param max
 */
export default ({
  children,
  max = 3,
}: {
  /**
   * children建议放多个LinkButton
   */
  children: React.ReactNode[] | React.ReactNode;
  /**
   * 最多显示几个操作
   */
  max?: number;
}) => {
  // eslint-disable-next-line no-param-reassign
  children = (children instanceof Array ? children : [children]).filter(
    (item) => item,
  );
  if (children instanceof Array) {
    return (
      <>
        {children.map((child, index) => {
          if (!(children instanceof Array)) return null;
          const num = children.length > max ? max - 1 : max;
          return (
            index < num && (
              <Fragment key={index}>
                {child}
                {children.length !== index + 1 && <Divider type={'vertical'} />}
              </Fragment>
            )
          );
        })}
        {children.length > max && (
          <MoreDropdown
            overlay={
              <Menu
                items={[...children]
                  .splice(max - 1, children.length)
                  .map((child, index) => {
                    let props;
                    if (isValidElement(child)) {
                      props = child.props;
                    }
                    return {
                      key: index,
                      label: <LinkButton {...props} />,
                    };
                  })}
              />
            }
          />
        )}
      </>
    );
  }
  return <></>;
};
