import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '1 1',
    minWidth: '100%',
    minHeight: '100vh',
  },
  loginFormContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '480px',
    minHeight: '320px',
    boxShadow: '5px 5px 15px 5px rgba(0,0,0,0.3)',
    padding: '50px',
    borderRadius: '25px',
  },
});

export default useStyles;
