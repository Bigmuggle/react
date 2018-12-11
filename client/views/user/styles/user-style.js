import avatar from './login.jpg'

export default () => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: 200,
  },
  menu: {
    width: 200,
  },
  root: {
    width: '100%',
    height: '100%',
  },
  box: {
    backgroundImage: 'url('+avatar+')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    width: '100%',
    height: '400px',
    overflow: 'hidden',
  },
  boxlogin: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '400px',
    height: '500px',
  },
  avatar: {
    position: 'absolute',
    top: '220px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '110px',
    height: '110px',
  },
});
