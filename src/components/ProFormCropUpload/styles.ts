import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ token }) => ({
  container: {
    position: 'relative',
  },
  preview: {
    position: 'relative',
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    marginBottom: '24px',
    padding: 0,
    border: `1px solid ${token.colorBorderDisabled}`,
    borderRadius: token.borderRadius,
    overflow: 'hidden',

    img: {
      maxWidth: '100%',
      maxHeight: '100%',
    },
  },
  cropperContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    borderRadius: token.borderRadius,
  },
  cropperMedia: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginInline: '0 auto',
    marginBottom: token.margin,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginInline: '0 auto',
    marginBottom: token.margin,
    button: {
      '&:disabled': {
        cursor: 'not-allowed',
      },
      '+ div': {
        '&:only-of-type': {
          flex: 1,
          margin: ' 0 12px',
        },
      },
    },
  },
  controlsBtn: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },
}));
