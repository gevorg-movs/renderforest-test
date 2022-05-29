import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    width: '100%',
    flex: '1',
    margin: '24px 0',
  },
  submitButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '16px 0',
  },
});

export default useStyles;
