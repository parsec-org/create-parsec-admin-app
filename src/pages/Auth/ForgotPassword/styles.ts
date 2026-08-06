import { createStyles } from 'antd-style';
import React from 'react';

/**
 * Auth/ForgotPassword 页面样式
 * 从 index.less 迁移至 antd-style createStyles
 */

const useStyles = createStyles(({ token, css }) => ({
  forgotPasswordWarp: css`
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background: url('@/assets/bg.png') center center no-repeat;
    background-size: cover;

    .header {
      width: 325px;
      margin: 145px auto 0;

      .title-warp {
        display: flex;
        align-items: center;
        justify-content: flex-start;

        .logo {
          width: 44px;
          height: 44px;
          object-fit: cover;
        }

        .title {
          margin-left: 20px;
          font-weight: 600;
          font-size: 33px;
          line-height: 44px;
        }
      }

      .subtitle {
        color: rgb(0 0 0 / 45%);
        font-size: 14px;
        margin-block-start: 12px;
        margin-block-end: 40px;
        margin-inline-start: 64px;
      }
    }

    .form-warp {
      width: 350px;
      margin: 0 auto;
    }

    .action-warp {
      display: block;
      width: 350px;
      margin: 45px auto;
      text-align: right;

      .ant-space-item {
        display: inline-block;
      }
    }
  `,
}));

/** logo 图片 */
export const logoImage: React.CSSProperties = {
  marginBlockEnd: 12,
  marginInlineStart: 26,
};

/** 隐藏按钮 */
export const hiddenOkButton: React.CSSProperties = { display: 'none' };

/** 验证码图片 */
export const captchaImage: React.CSSProperties = { cursor: 'pointer' };

/** 底部间距 */
export const formBottomSpacer: React.CSSProperties = { marginBlockEnd: 24 };

export default useStyles;
